const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', gettask);
    form.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', clearTasks);
    taskList.addEventListener('click', deleteTask);
    filter.addEventListener('keyup', filterTask);
}

function gettask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.style.cursor = 'pointer';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.style.cursor = 'pointer';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromStorage();
}
function clearTasksFromStorage(){
    localStorage.clear(); 
}
function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem.textContent);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index){
        
        if (taskItem.textContent === task) {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(
        function (task) {

            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';

            } else {
                task.style.display = 'none';
            }
        }
    );

}