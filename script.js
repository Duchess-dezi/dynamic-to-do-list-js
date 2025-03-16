document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        // Get the trimmed task text from the input field
        const taskText = taskInput.value.trim();

        // Check if the input is empty
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
        };

        // Append remove button to list item, then append list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = "";
    }

    // Event listener for button click
    addButton.addEventListener("click", addTask);

    // Event listener for 'Enter' key press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
