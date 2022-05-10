//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterBtns = document.querySelectorAll('.filter-btn')
//Events
window.addEventListener('load', () => {
    todoInput.value = ''
})
document.addEventListener('DOMContentLoaded', getLocalTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', completeTodo)
todoList.addEventListener('click', deleteTodo)
todoList.addEventListener('click', editTodo)
//Functions
function addTodo(e) {
    e.preventDefault()
    const prevTodoList = todoList.innerHTML

    if (todoInput.value === '') return

    todoList.innerHTML =
        `  <div class="todo">
                <input type="text" class="todo-item" value="${todoInput.value}" readonly/>
                <div class="control-tasks">
                    <div class="edit-save">
                        <button class="save-btn">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </button>
                        <button class="edit-btn">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <button class="complete-btn">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>` + prevTodoList

    saveLocalTodos(todoInput.value)
    todoInput.value = ''
}

function completeTodo(e) {
    const item = e.target

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement.parentElement
        todo.classList.toggle('completed')
    }
}

function deleteTodo(e) {
    const item = e.target

    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement.parentElement
        const currentTask = todo.querySelector('.todo-item')

        todo.classList.add('slide')
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
        deleteLocalTodos(currentTask.value)
    }
}

function editTodo(e) {
    const item = e.target

    if (item.classList[0] === 'edit-btn') {
        const todo = item.parentElement.parentElement.parentElement
        const currentTask = todo.querySelector('.todo-item')

        currentTask.readOnly = false

        item.classList.add('hidden')
    } else if (item.classList[0] === 'save-btn') {
        const todo = item.parentElement.parentElement.parentElement
        const currentTask = todo.querySelector('.todo-item')
        const editedInput = currentTask.value

        currentTask.remove()
        todo.innerHTML += `<input type="text" class="todo-item" value="${editedInput}" readonly/>`

        const saveButton = todo.querySelector('.edit-btn')
        saveButton.classList.remove('hidden')
    }
}

filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const todos = todoList.querySelectorAll('.todo')
        const btnValue = e.currentTarget.value

        todos.forEach((todo) => {
            switch (btnValue) {
                case 'all':
                    todo.style.display = 'block'
                    break
                case 'completed':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'block'
                    } else {
                        todo.style.display = 'none'
                    }
                    break
                case 'uncompleted':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'block'
                    } else {
                        todo.style.display = 'none'
                    }
                    break
                default:
                    break
            }
        })
    })
})

function saveLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getLocalTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        const prevTodoList = todoList.innerHTML

        todoList.innerHTML =
            `  <div class="todo">
                <input type="text" class="todo-item" value="${todo}" readonly/>
                <div class="control-tasks">
                    <div class="edit-save">
                        <button class="save-btn">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </button>
                        <button class="edit-btn">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <button class="complete-btn">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>` + prevTodoList
    })
}

function deleteLocalTodos(item) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos = todos.filter((todo) => {
        return todo !== item
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}
