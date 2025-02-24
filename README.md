# TaskFlow

TaskFlow is a simple task management web application built with **FastAPI**, **JavaScript**, and **SQLite**. It allows users to create, move, and delete tasks across different columns in a Trello-like interface. This project is **not a finished product** but rather a learning experience in backend and frontend development, and it has some known limitations.

## ⚡ Features
- **Drag & Drop Tasks**: Move tasks between "To Do", "In Progress", and "Done" columns.
- **Persistent Storage**: Saves tasks in an SQLite database.
- **FastAPI Backend**: Handles task management with a REST API.
- **Local Hosting**: Runs entirely on your machine without requiring an external server.
- **Cross-Platform**: Works on **Windows**, **Mac**, and **Linux**.
- **Easy to Set Up**: A single script (`start_taskflow.py`) handles launching the project.

---

## 🚀 Installation
### **1️⃣ Clone the Repository**
If you have **Git installed**, run the following command in your terminal or command prompt:
```sh
git clone https://github.com/<your-username>/TaskFlow.git
cd TaskFlow
```
If you don’t have Git, you can **download the ZIP file** from GitHub and extract it.

### **2️⃣ Set Up the Virtual Environment & Install Dependencies**
#### **Windows**
```sh
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
#### **Mac/Linux**
```sh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
This ensures all required Python packages (FastAPI, Uvicorn, SQLAlchemy) are installed.

### **3️⃣ Start the Application**
#### **Option 1: Use the Python Script (All Platforms)**
Run the following command:
```sh
python start_taskflow.py
```
This will:
✅ Start the **FastAPI** server
✅ Open the **TaskFlow Web App** in your browser
✅ Keep your **tasks saved** between sessions

#### **Option 2: Use Platform-Specific Launchers**
For convenience, there are platform-specific launchers:
- **Windows:** Use `start_taskflow.bat`
- **Mac/Linux:** Use `start_taskflow.command`

To use them:
- **Windows:** Double-click `start_taskflow.bat` (ensures `python start_taskflow.py` runs properly).
- **Mac/Linux:** Double-click `start_taskflow.command` (ensure it's executable by running `chmod +x start_taskflow.command`).

These launchers automatically start TaskFlow without needing to type commands manually.

---

## 🛠️ How TaskFlow Works
### **📌 The Structure**
- `frontend/` → Contains **HTML, CSS, and JavaScript** for the UI
- `backend/` → FastAPI **Python server** handling API requests
- `database/` → Stores `taskflow.db`, the **SQLite database**
- `start_taskflow.py` → **Launches the app automatically**
- `start_taskflow.command` → **Mac/Linux script for easy launching**
- `start_taskflow.bat` → **Windows script for easy launching**

### **📌 How Data is Stored**
- When you add a task, it gets saved in **`database/taskflow.db`**.
- Moving a task updates its **column** in the database.
- Deleting a task **removes it permanently**.

---

## ❌ Known Issues & Limitations
### **🚧 Why This is Not a Finished Product**
This project was created as a **learning experience**, and it has **some flaws**:

1️⃣ **No Multi-User Support** → Only works on one local machine.
2️⃣ **No Authentication** → Anyone can access tasks (if hosted online, which it isn't).
3️⃣ **No Cloud Syncing** → Data is stored **locally in SQLite**.
4️⃣ **Bugs in Drag & Drop** → Some edge cases might cause **task duplication or misplacement**.
5️⃣ **Mac-Specific Automation** → The script checks if **Google Chrome** is open (not cross-browser compatible).

### **🚀 Future Improvements**
✅ **Host on a Real Server** (Deploy with FastAPI & PostgreSQL)
✅ **Add User Accounts** (Login & Authentication)
✅ **Improve UI** (Make it mobile-friendly)
✅ **Fix Drag & Drop Issues** (Handle edge cases properly)

---

## 📜 License
This project is open-source under the **MIT License**.

---

## ❓ Need Help?
Feel free to **open an issue** on GitHub or reach out if you have questions or ideas for improvement!

💡 This project is **not perfect**, but it’s an **experiment** in learning backend, frontend, and full-stack development! 🚀
