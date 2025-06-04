import os
import subprocess
import webbrowser
import time
import sys
import platform

# Define paths
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
VENV_DIR = os.path.join(PROJECT_DIR, "venv")
DATABASE_DIR = os.path.join(PROJECT_DIR, "database")

# Determine the correct Python executable inside the virtual environment
PYTHON_EXEC = os.path.join(
    VENV_DIR,
    "Scripts" if platform.system() == "Windows" else "bin",
    "python"
)

# Uvicorn command using the virtual environment's interpreter
FASTAPI_CMD = f"{PYTHON_EXEC} -m uvicorn backend.main:app --reload"
TASKFLOW_URL = "http://127.0.0.1:8000/frontend/index.html"

# Ensure the database directory exists
if not os.path.exists(DATABASE_DIR):
    print("📂 Creating database directory...")
    os.makedirs(DATABASE_DIR)

# Check if the virtual environment exists
if not os.path.exists(VENV_DIR):
    print("📦 Creating virtual environment...")
    subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
    print("✅ Virtual environment created.")

# Ensure dependencies are installed
print("📦 Checking dependencies...")
subprocess.run([
    PYTHON_EXEC,
    "-m",
    "pip",
    "install",
    "--upgrade",
    "pip",
    "fastapi",
    "uvicorn",
    "sqlalchemy",
], check=True)

# Start FastAPI server
print("🚀 Starting TaskFlow...")
server_process = subprocess.Popen(FASTAPI_CMD, shell=True)

# Wait for the server to start
time.sleep(3)

# Open TaskFlow in the browser
print("🌍 Opening TaskFlow in the browser...")
webbrowser.open(TASKFLOW_URL)

# Function to check if the browser tab is still open
def is_browser_open():
    """Check if the TaskFlow tab is still open on macOS.

    On non-macOS platforms this function simply returns ``True`` so the
    application does not exit unexpectedly.
    """

    if platform.system() != "Darwin":
        return True

    try:
        output = subprocess.check_output([
            "osascript",
            "-e",
            'tell application "Google Chrome" to get the URL of tabs of windows'
        ])
        urls = output.decode().split(", ")
        print(f"🔍 Detected open tabs: {urls}")  # Debugging line
        return TASKFLOW_URL in urls
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"⚠️ Browser check failed: {e}")  # Debugging line
        # Keep the program running even if the check fails
        return True

# Monitor if the user closes the page
try:
    while True:
        time.sleep(5)
        if not is_browser_open():
            print("🛑 TaskFlow closed, stopping server...")
            break
except KeyboardInterrupt:
    print("\n🛑 Manual stop detected...")

# Stop the FastAPI server
server_process.terminate()
sys.exit(0)  # Ensure the script exits properly
