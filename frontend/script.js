document.addEventListener("DOMContentLoaded", async () => {
    const columns = document.querySelectorAll(".column");

    // Load tasks from the API
    async function loadTasks() {
        try {
            const response = await fetch("http://127.0.0.1:8000/tasks");
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

            const tasks = await response.json();
            console.log("✅ Tasks retrieved from API:", tasks);

            // Clear all columns before adding tasks
            columns.forEach(column => {
                column.innerHTML = `<h2>${column.querySelector("h2").innerText}</h2>`;
            });

            // Add tasks to the appropriate columns
            tasks.forEach(task => {
                console.log(`📥 Adding task ${task.id} (${task.text}) to column ${task.column}`);
                const column = document.getElementById(task.column);
                if (!column) {
                    console.error(`❌ Column not found for ${task.text} (ID: ${task.id})`);
                    return;
                }
                addTaskToColumn(column, task.text, task.id);
            });

        } catch (error) {
            console.error("❌ Error loading tasks:", error);
        }
    }

    // Add a new task via API
    async function addTask(taskText) {
        if (!taskText.trim()) {
            console.error("❌ Error: Task text is empty!");
            return;
        }

        console.log(`📤 Sending task: "${taskText}" to the API...`);

        try {
            const response = await fetch("http://127.0.0.1:8000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: taskText, column: "todo" }) // Always add to "To Do"
            });

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            const newTask = await response.json();
            console.log("✅ New task created:", newTask);

            addTaskToColumn(document.getElementById("todo"), newTask.text, newTask.id);
        } catch (error) {
            console.error("❌ Error adding task:", error);
        }
    }

    // Delete a task via API
    async function deleteTask(taskId) {
        try {
            await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, { method: "DELETE" });
            document.getElementById(`task-${taskId}`).remove();
            console.log(`🗑️ Task ${taskId} deleted`);
        } catch (error) {
            console.error(`❌ Error deleting task ${taskId}:`, error);
        }
    }

    // Update a task's column in the database
    async function updateTaskColumn(taskId, newColumn) {
        console.log(`📤 Updating task ${taskId} to column ${newColumn}`);

        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ column: newColumn })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            console.log(`✅ Task ${taskId} moved to ${newColumn}`);
        } catch (error) {
            console.error(`❌ Error updating task ${taskId}:`, error);
        }
    }

    // Add a task to a column
    function addTaskToColumn(column, taskText, taskId) {
        console.log(`✅ Adding task ${taskId} (${taskText}) to column ${column.id}`);

        const task = document.createElement("div");
        task.classList.add("task");
        task.draggable = true;
        task.innerText = taskText;
        task.id = `task-${taskId}`;

        task.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", task.id);
        });

        // Add a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => deleteTask(taskId);
        task.appendChild(deleteBtn);

        column.appendChild(task);
    }

    // Drag & Drop with database update
    columns.forEach(column => {
        column.addEventListener("dragover", event => event.preventDefault());
        column.addEventListener("drop", async event => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("text/plain").replace("task-", "");
            const task = document.getElementById(`task-${taskId}`);

            if (task && column !== task.parentElement) {
                column.appendChild(task);
                await updateTaskColumn(taskId, column.id);
            }
        });
    });

    // Add a new task
    document.getElementById("add-task").addEventListener("click", () => {
        const taskText = prompt("Task name:");
        if (taskText) addTask(taskText);
    });

    // Load tasks on startup
    loadTasks();
});