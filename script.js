document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save again to avoid duplication
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(taskItem => taskItem.firstChild.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Trim input value
        taskText = taskText.trim();

        // Check for empty input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Remove task when button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removal
        };

        // Append remove button to list item, then append list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save task to Local Storage only if it's a new task (not during load)
        if (save) {
            saveTasks();
        }

        // Clear input field
        taskInput.value = "";
    }

    // Event listener for button click
    addButton.addEventListener("click", function () {
        addTask(taskInput.value);
    });

    // Event listener for 'Enter' key press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
