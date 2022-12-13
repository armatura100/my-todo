const form = document.getElementById('form');
const formInput = document.getElementById('form-input');
const todoList = document.getElementById('todo-list');

const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach(addTodo);

form.addEventListener('submit', e => {
    e.preventDefault();
    const userInput = formInput.value;
    if (!userInput) return;

    addTodo(userInput);
    form.reset();
    updateLS(userInput);
});

function addTodo(text) {
    const todoEl = document.createElement('li');
    todoEl.classList.add('todo-item');

    todoEl.innerHTML = `
        <span class="todo-item__text">
            ${text}
        </span>
        <div class="todo-item__controls">
            <button class="todo-item__control todo-item__done" type="button">
                <img src="img/tick.svg" alt="tick">
            </button>
            <button class="todo-item__control todo-item__delete" type="button">
                <img src="img/cross.svg" alt="tick">
            </button>
        </div>
    `;

    todoList.appendChild(todoEl);

    // todoEl button listeners
    const btnDone = todoEl.querySelector('.todo-item__done');
    const btnDelete = todoEl.querySelector('.todo-item__delete');

    btnDone.addEventListener('click', () => {
        todoEl.classList.toggle('done');
    });

    btnDelete.addEventListener('click', () => {
        todoEl.classList.add('fall');
        todoEl.addEventListener('transitionend', () => {
            todoEl.remove();
        });
    });
}

function updateLS(task) {
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}