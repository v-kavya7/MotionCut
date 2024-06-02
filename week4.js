document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  loadTasks();

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = '';
  });

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      deleteTask(e.target.parentElement);
    } else if (e.target.classList.contains('edit')) {
      editTask(e.target.parentElement);
    } else if (e.target.tagName === 'LI') {
      toggleCompleted(e.target);
    }
  });

  function addTask(task) {
    const li = document.createElement('li');
    li.textContent = task;
    createButtons(li);
    taskList.appendChild(li);
    saveTasks();
  }

  function createButtons(li) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    li.appendChild(deleteButton);
  }

  function deleteTask(li) {
    taskList.removeChild(li);
    saveTasks();
  }

  function editTask(li) {
    const newTask = prompt('Edit Task:', li.firstChild.textContent);
    if (newTask) {
      li.firstChild.textContent = newTask;
      saveTasks();
    }
  }

  function toggleCompleted(li) {
    li.classList.toggle('completed');
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains('completed'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) {
        li.classList.add('completed');
      }
      createButtons(li);
      taskList.appendChild(li);
    });
  }
});
