// Variável global para armazenar o usuário atual
let currentUser = null;
let currentBranch = null;
const centralLogin = "central"; // Definindo um login central

// Função para mostrar a tela de login e esconder a tela de registro
document.getElementById('show-login-form').addEventListener('click', function() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

// Função para mostrar a tela de registro e esconder a tela de login
document.getElementById('show-register-form').addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
});

// Função para registrar um novo usuário
document.getElementById('register-button').addEventListener('click', function() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const branch = document.getElementById('register-branch').value.trim();
  const isCentral = document.getElementById('register-central').checked;

  if (username && password && (branch || isCentral)) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, branch: isCentral ? centralLogin : branch });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

// Função para fazer login
document.getElementById('login-button').addEventListener('click', function() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const branch = document.getElementById('login-central').checked ? centralLogin : document.getElementById('login-branch').value.trim();

  if (username && password && branch) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password && user.branch === branch);

    if (user) {
      currentUser = username;
      currentBranch = branch;
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('task-container').style.display = 'block';
      document.getElementById('user-name').textContent = `${currentUser} - ${currentBranch}`;
      document.getElementById('logout-button').style.display = 'block';
      loadTasks();
      if (currentBranch === centralLogin) {
        document.getElementById('clear-data-button').style.display = 'block';
      }
    } else {
      alert('Usuário, senha ou filial incorretos.');
    }
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

// Função para fazer logout
document.getElementById('logout-button').addEventListener('click', function() {
  currentUser = null;
  currentBranch = null;
  document.getElementById('task-list').innerHTML = ''; // Limpa a lista de tarefas
  document.getElementById('task-container').style.display = 'none';
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('logout-button').style.display = 'none';
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-branch').value = '';
  document.getElementById('clear-data-button').style.display = 'none';
});

// Função para adicionar tarefas
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = document.getElementById('task-input').value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      createdBy: currentUser,
      createdAt: new Date().toLocaleString(),
      branch: currentBranch,
      completedBy: null,
      completedAt: null
    };
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTask(task);
    document.getElementById('task-input').value = '';
  }
}

function renderTask(task) {
  if (currentBranch !== centralLogin && task.branch !== currentBranch) return; // Filtrar tarefas por filial, exceto para o login central

  const taskList = document.getElementById('task-list');
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  taskItem.innerHTML = `
    <div class="task-header">
      <div class="task-avatar">
        <i class="fas fa-user"></i>
      </div>
      <div>
        <span class="task-user">${task.createdBy}</span>
        <span class="task-date">${task.createdAt}</span>
      </div>
    </div>
    <div class="task-content">
      <p class="task-text">${task.text}</p>
    </div>
    <div class="task-actions">
      <button class="complete">Concluir</button>
      <button class="delete">Deletar</button>
    </div>
  `;

  if (task.completedBy) {
    taskItem.querySelector('.task-text').innerHTML += `<br><small>Concluída por: ${task.completedBy} em: ${task.completedAt}</small>`;
    taskItem.classList.add('done');
  }

  taskItem.querySelector('.complete').addEventListener('click', function() {
    if (!task.completedBy) {
      task.completedBy = currentUser;
      task.completedAt = new Date().toLocaleString();
      taskItem.querySelector('.task-text').innerHTML += `<br><small>Concluída por: ${task.completedBy} em: ${task.completedAt}</small>`;
      taskItem.classList.add('done');
      updateTask(task);
    }
  });

  taskItem.querySelector('.delete').addEventListener('click', function() {
    taskItem.remove();
    deleteTask(task);
  });

  taskList.appendChild(taskItem);
}

function loadTasks() {
  document.getElementById('task-list').innerHTML = ''; // Limpa a lista antes de carregar
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.forEach(task => {
    renderTask(task);
  });
}

function updateTask(updatedTask) {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = taskList.findIndex(task => task.text === updatedTask.text && task.createdBy === updatedTask.createdBy && task.createdAt === updatedTask.createdAt);
  if (taskIndex > -1) {
    taskList[taskIndex] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }
}

function deleteTask(deletedTask) {
  let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList = taskList.filter(task => !(task.text === deletedTask.text && task.createdBy === deletedTask.createdBy && task.createdAt === deletedTask.createdAt));
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Função para contar tarefas concluídas e não concluídas
function countTasks() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const completedTasks = taskList.filter(task => task.completedBy && task.branch === currentBranch).length;
  const pendingTasks = taskList.filter(task => !task.completedBy && task.branch === currentBranch).length;
  return { completedTasks, pendingTasks };
}

// Função para exibir contagem de tarefas para o login central
function displayTaskCounts() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const branches = [...new Set(taskList.map(task => task.branch))];
  branches.forEach(branch => {
    const completedTasks = taskList.filter(task => task.completedBy && task.branch === branch).length;
    const pendingTasks = taskList.filter(task => !task.completedBy && task.branch === branch).length;
    console.log(`Filial: ${branch}, Concluídas: ${completedTasks}, Pendentes: ${pendingTasks}`);
  });
}

// Exemplo de uso do login central
document.getElementById('central-login-button').addEventListener('click', function() {
  displayTaskCounts();
  // Adiciona o botão de limpar dados ao login central
  const clearDataButton = document.createElement('button');
  clearDataButton.textContent = 'Limpar Dados';
  clearDataButton.addEventListener('click', clearData);
  document.body.appendChild(clearDataButton);
});

// Função para limpar dados de usuários e tarefas
function clearData() {
  localStorage.removeItem('users');
  localStorage.removeItem('tasks');
  alert('Dados de usuários e tarefas foram limpos.');
}
