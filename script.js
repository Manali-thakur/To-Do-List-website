// empty array so we can store the data in here
let tasks = [];

const addlist = document.getElementsByClassName("add")[0];
const deleteAll = document.getElementsByClassName("deleteAll")[0];
const todolist = document.getElementsByClassName("todolist")[0];
const main = document.querySelector("main");

addlist.addEventListener("click", () => {
  const listItem = document.createElement("div");
  todolist.appendChild(listItem);
  listItem.className = "listItem";

  const listItemInput = document.createElement("input");
  listItemInput.type = "text";
  listItem.appendChild(listItemInput);
  listItemInput.className = "listItemInput";
  listItemInput.style.padding = "2px";
  listItemInput.style.fontSize = "1.2rem";
  listItemInput.placeholder = "Let's start..!";

  const tickbox = document.createElement("input");
  tickbox.type = "radio";
  listItem.prepend(tickbox);
  tickbox.value = "task-Completed";
  tickbox.className = "tickbox";
  tickbox.hidden = true;

  const doneButton = document.createElement("button");
  listItem.appendChild(doneButton);
  doneButton.textContent = "Save";

  doneButton.addEventListener("click", () => {
    listItemInput.readOnly = true;
    listItemInput.style.backgroundColor = "var(--secondary-color)";
    listItemInput.style.color = "black";
    listItemInput.style.border = "0px";

    doneButton.hidden = true;
    editButton.hidden = false;
    tickbox.hidden = false;
    deleteButton.hidden = false;
  });

  const editButton = document.createElement("button");
  editButton.hidden = true;
  listItem.appendChild(editButton);
  editButton.className = "editButton";
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    editButton.hidden = true;
    listItemInput.readOnly = false;
    doneButton.hidden = false;

    listItemInput.style.backgroundColor = "white";
    listItemInput.style.border = "1.2px";
  });

  function congrats() {
    const congratsBox = document.createElement("div");
    main.prepend(congratsBox);
    congratsBox.className = "congratsBox";

    congratsBox.textContent = "Task Completed..!👌🎉";

    return congratsBox;
  }

  tickbox.addEventListener("click", () => {
    editButton.hidden = true;

    const box = congrats();

    setTimeout(() => {
      box.remove();
    }, 5000);
  });

  const deleteButton = document.createElement("button");
  listItem.appendChild(deleteButton);
  deleteButton.textContent = "Delete";

  deleteButton.hidden = true;

  deleteButton.addEventListener("click", () => {
    listItem.remove();
  });
});

function allItemDeleted() {
  const deletedmessage = document.createElement("div");
  deletedmessage.textContent =
    "All the tasks have been succesfully Deleted..!!";
  main.appendChild(deletedmessage);

  deletedmessage.className = "deleteMessage";

  return deletedmessage;
}

deleteAll.addEventListener("click", () => {
  if (todolist.children.length === 0) {
    alert("There is no tasks to Delete..!");
    return;
  } else {
    if (confirm("Are you sure you want to delete All the Tasks..??")) {
      todolist.innerHTML = "";
      const message = allItemDeleted();

      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }
});
