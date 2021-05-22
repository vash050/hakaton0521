const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    type: '😎',
    body:
      'Всем привет, как учеба?',
    title: 'Степан',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    type: '💃',
    body:
      'Привет, вроде неплохо, как сам?',
    title:
      'Ольга',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    type: '😎',
    body:
      'Есть задачка: Сделай функцию, которая принимает массив любых целых чисел, которая возвращает истинну, если все элементы четные, если бы хотя бы один элемент не четный, то false.',
    title: 'Степан',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    type: '💃',
    body:
      'Отлично, давай попробую написать.',
    title:
      'Ольга',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastDefaultTheme = localStorage.getItem('theme') || 'default';

  setTheme(lastDefaultTheme);
  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const {
    title: inputTitle,
    body: inputBody,
    themeTask: inputTheme,
  } = form.elements;
  const themeSelect = document.getElementById('themeSelect');

  renderOfTasks(objOfTasks);



  // Events
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('mouseup', onDeleteHandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);

  //Functions
  function renderOfTasks(tasksList) {
    if(!tasksList) return alert('Передайте список задач');
    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({_id, title, body, type}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.classList.add('ml-1');
    span.style.fontStyle = 'italic';

    const h6 = document.createElement('h6');
    h6.textContent = type;
    h6.classList.add('mr-1');
    h6.classList.add('mb-0');
    h6.style.fontWeight = 'bold';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '☠️ kill';
    deleteButton.classList.add(
      'btn',
      'btn-danger',
      'ml-auto',
      'delete-btn',
    );

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add(
      'mt-2',
      'w-100',
    );

    li.appendChild(h6);
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(article);
    return li;
  }

  function onFormSubmitHandler(evt) {
    evt.preventDefault();
    if (!inputTitle.value || !inputBody.value) {
      return;
    }
    const task = createNewTask(inputTitle.value, inputBody.value);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      complited: false,
      _id: `task-${Math.random()}`,
    };
    objOfTasks[newTask._id] = newTask; // добавление объекта в объект задач

    return { ...newTask };
  }

  function deleteTask(id) {
    const isConfirm = id ? confirm(`Удалить задачу: ${objOfTasks[id].title} ???`) : false;
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskForHtml(isDelete, element) {
    if (!isDelete) return;
      element.remove();
      element = null;
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskForHtml(confirmed, parent);
    }
  }

  function onThemeSelectHandler() {
    const selectedTheme = themeSelect.value;
    const isConfirm = confirm(`Изменить тему: ${selectedTheme.toUpperCase()}`);
    if(!isConfirm) {
      themeSelect.value = lastDefaultTheme;
      return;
    }

    setTheme(selectedTheme);
    lastDefaultTheme = selectedTheme;
    localStorage.setItem('theme', selectedTheme);
  }

  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    })
  }
})(tasks);
