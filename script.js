// empty array so we can store the data in here
let tasks = [];

function saveTasks() {
  try {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  } catch (err) {
    console.error("Coundn't save tasks:", err);
  }
}

function loadTasks() {
  try {
    const saved = localStorage.getItem("myTasks");
    tasks = saved ? JSON.parse(saved) : [];
  } catch (err) {
    tasks = [];
  }
}

const addlist = document.getElementsByClassName("add")[0];
const deleteAll = document.getElementsByClassName("deleteAll")[0];
const todolist = document.getElementsByClassName("todolist")[0];
const main = document.querySelector("main");

function congrats(afterElement) {
  const congratsBox = document.createElement("div");
  main.prepend(congratsBox);
  congratsBox.className = "congratsBox";
  congratsBox.textContent = "Task Completed..!👌🎉";
  afterElement.after(congratsBox);
  return congratsBox;
}

function createTaskElement(taskData, isNew) {
  const listItem = document.createElement("div");
  listItem.className = "listItem";
  if (taskData.done) {
    listItem.classList.add("done");
  }
  todolist.appendChild(listItem);

  const tickbox = document.createElement("input");
  tickbox.type = "checkbox";
  tickbox.className = "tickbox";
  tickbox.checked = taskData.done;
  listItem.prepend(tickbox);
  tickbox.value = "task-Completed";
  tickbox.hidden = true;

  const listItemInput = document.createElement("input");
  listItemInput.type = "text";
  listItem.appendChild(listItemInput);

  listItemInput.className = "listItemInput";
  listItemInput.style.padding = "2px";
  listItemInput.style.fontSize = "1.2rem";
  listItemInput.placeholder = "Let's start..!";
  listItemInput.value = taskData.text || "";
  listItemInput.readOnly = !isNew;
  if (!isNew) {
    listItemInput.style.backgroundColor = "var(--secondary-color)";
    listItemInput.style.color = "black";
    listItemInput.style.border = "0px";
  }

  const doneButton = document.createElement("button");
  listItem.appendChild(doneButton);
  doneButton.textContent = "Save";
  doneButton.hidden = !isNew;

  const editButton = document.createElement("button");
  editButton.hidden = isNew;
  listItem.appendChild(editButton);
  editButton.className = "editButton";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  listItem.appendChild(deleteButton);
  deleteButton.textContent = "Delete";
  deleteButton.hidden = isNew;

  doneButton.addEventListener("click", () => {
    const text = listItemInput.value.trim();
    if (!text) {
      alert("Please enter a task before saving.");
      return;
    }

    listItemInput.readOnly = true;
    listItemInput.style.backgroundColor = "var(--secondary-color)";
    listItemInput.style.color = "black";
    listItemInput.style.border = "0px";

    doneButton.hidden = true;
    editButton.hidden = false;
    tickbox.hidden = false;
    deleteButton.hidden = false;

    taskData.text = text;
    tasks.push(taskData);
    saveTasks();
  });

  listItemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doneButton.click();
    }
  });

  editButton.addEventListener("click", () => {
    editButton.hidden = true;
    listItemInput.readOnly = false;
    doneButton.hidden = false;

    listItemInput.style.backgroundColor = "white";
    listItemInput.style.border = "1.2px";
  });

  tickbox.addEventListener("click", () => {
    editButton.hidden = true;
    taskData.done = tickbox.checked;
    listItem.classList.toggle("done", tickbox.checked);
    saveTasks();

    if (tickbox.checked) {
      const box = congrats(listItem);
      setTimeout(() => box.remove(), 5000);
    }
  });

  deleteButton.addEventListener("click", () => {
    if (confirm("Delete this task?")) {
      listItem.remove();
      tasks = tasks.filter((t) => t.id !== taskData.id);
      saveTasks();
    }
  });

  return listItem;
}

addlist.addEventListener("click", () => {
  const taskData = { id: crypto.randomUUID(), text: "", done: false };
  createTaskElement(taskData, true); // true = brand-new, still editable
});

function allItemDeleted() {
  const deletedmessage = document.createElement("div");
  deletedmessage.className = "deleteMessage";
  deletedmessage.textContent =
    "All the tasks have been succesfully Deleted..!!";
  main.appendChild(deletedmessage);
  return deletedmessage;
}

deleteAll.addEventListener("click", () => {
  if (todolist.children.length === 0) {
    alert("There is no tasks to Delete..!");
    return;
  } else {
    if (confirm("Are you sure you want to delete All the Tasks..??")) {
      todolist.innerHTML = "";
      tasks = [];
      saveTasks();

      const message = allItemDeleted();
      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }
});

loadTasks();
tasks.forEach((taskData) => (taskData, false));
