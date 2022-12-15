const form = document.getElementById('form');
const formInput = document.getElementById('form-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', doneTodo);

const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach(renderTodo);

function renderTodo(todo) {
    const doneClass = todo.done ? 'todo-item done' : 'todo-item';

    const todoHTML = `
        <li class="${doneClass}" id="${todo.id}">
            <span class="todo-item__text">
                ${todo.text}
            </span>
            <div class="todo-item__controls">
                <button class="todo-item__control todo-item__done" data-action="done" type="button">
                    <img src="img/tick.svg" alt="mark as done">
                </button>
                <button class="todo-item__control todo-item__delete" data-action="delete" type="button">
                    <img src="img/cross.svg" alt="delete">
                </button>
            </div>
        </li>
    `;

    todoList.insertAdjacentHTML('beforeend', todoHTML);
}

function deleteTodo(e) {
    const targetItem = e.target.closest('[data-action="delete"]');
    if (!targetItem) return;

    const todoItem = targetItem.closest('.todo-item');

    // remove the element on the page
    todoItem.classList.add('fall');
    todoItem.addEventListener('transitionend', () => {
        todoItem.remove();
    })

    // remove the element from the local array
    const todoItemId = Number(todoItem.id);
    const foundIndex = todos.findIndex(todo => todo.id === todoItemId);
    todos.splice(foundIndex, 1);

    updateLS();
}

function doneTodo(e) {
    const targetItem = e.target.closest('[data-action="done"]');
    if (!targetItem) return;

    const todoItem = targetItem.closest('.todo-item');
    todoItem.classList.toggle('done');

    // change the value of "done" in the array
    const todoItemId = Number(todoItem.id);
    const todo = todos.find(todo => todo.id === todoItemId);
    todo.done = !todo.done;

    updateLS();
}

function addTodo(e) {
    e.preventDefault();
    const userInput = formInput.value;
    if (!userInput) return;

    const newTodo = {
        text: userInput,
        done: false,
        id: Date.now(),
    };

    todos.push(newTodo);
    renderTodo(newTodo);

    form.reset();
    formInput.focus();

    updateLS();
}

function updateLS() {
    localStorage.setItem('todos', JSON.stringify(todos));
}