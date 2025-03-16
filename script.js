document.addEventListener("DOMContentLoaded", function () {
    loadTasks(); // Load tasks when the page loads

    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is undefined, get it from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check for empty input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Save to Local Storage (if not from loading)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
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
            removeTask(taskText); // Remove from Local Storage
        };

        // Append remove button to list item and add it to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = "";
    }

    // Function to remove task from Local Storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid duplication
    }

    // Event listener for button click
    addButton.addEventListener("click", function () {
        addTask();
    });

    // Event listener for 'Enter' key press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
