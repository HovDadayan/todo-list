const form = document.querySelector("#form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todos");
const activeBtn = document.querySelector("#active-btn");
const allBtn = document.querySelector("#all-btn");
const completedBtn = document.querySelector("#completed-btn");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const counterItemsEl = document.querySelector("#counter").querySelector("span");
const checkAll = document.querySelector("#check-all");

let todos = [];
let activeTodos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value;
  addTodo(todoText);
  input.value = "";
});

const addTodo = (text) => {
  if (text.length !== 0) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");

    const checkboxInput = addCheckboxToItem(todoItem);
    todoItem.appendChild(checkboxInput);

    const todoText = document.createElement("span");
    todoText.classList.add("todo-text");
    todoText.textContent = text;
    todoItem.appendChild(todoText);

    const spanButton = addDeleteBtnToItem(todoItem);
    todoItem.appendChild(spanButton);

    todoList.appendChild(todoItem);

    todos.push(todoItem);

    sortAll();
    counterItemsEl.innerHTML = todos.length;
  }
};

const addCheckboxToItem = (todoRef) => {
  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.classList.add("checkbox-toggle");
  checkboxInput.addEventListener("click", (e) => {
    todoRef.classList.toggle("done");
    // e.target.parentElement.classList.toggle("done")
  });

  return checkboxInput;
};

const addDeleteBtnToItem = (todoRef) => {
  const spanButton = document.createElement("span");
  spanButton.classList.add("close");
  spanButton.textContent = "X";

  spanButton.addEventListener("click", (e) => {
    e.preventDefault();
    todoRef.remove();
  });
  return spanButton;
};

const sortTodos = (e) => {
  activeTodos = Array.from(todos).filter((todoItem) => {
    return e.target.id === "active-btn"
      ? !todoItem.classList.contains("done")
      : todoItem.classList.contains("done");
  });
  todoList.innerHTML = "";
  for (let activeTodo of activeTodos) {
    todoList.appendChild(activeTodo);
  }
  counterItemsEl.innerHTML = activeTodos.length;
};

function sortAll() {
  for (let todo of todos) {
    todoList.appendChild(todo);
  }
  counterItemsEl.innerHTML = todos.length;
}

const clearCompletedTodos = () => {
  todos = Array.from(todos).filter((todoItem) => {
    return !todoItem.classList.contains("done");
  });

  todoList.innerHTML = "";
  for (let todo of todos) {
    todoList.appendChild(todo);
  }
  counterItemsEl.innerHTML = todos.length;
};

function checkAllTodos(e) {
  let checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
  this.checked = !this.checked;
  for (let checkbox of checkboxes) {
    checkbox.checked = this.checked;
  }
  if (this.checked) {
    for (let todo of todos) {
      todo.classList.add("done");
    }
  } else {
    for (let todo of todos) {
      todo.classList.remove("done");
    }
  }
}

activeBtn.addEventListener("click", sortTodos);
allBtn.addEventListener("click", sortAll);
completedBtn.addEventListener("click", sortTodos);
clearCompletedBtn.addEventListener("click", clearCompletedTodos);
checkAll.addEventListener("click", checkAllTodos);
