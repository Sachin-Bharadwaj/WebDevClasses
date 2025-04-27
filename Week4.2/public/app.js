document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    let todos = [];

    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');

        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.className = 'todo-input';
        input.readOnly = !todo.editing;

        if (todo.editing) {
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.className = 'update-btn';
          updateButton.onclick = () => {
            todos[index].text = input.value;
            todos[index].editing = false;
            renderTodos();
          };
          li.appendChild(input);
          li.appendChild(updateButton);
        } else {
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.onclick = () => {
            todos[index].editing = true;
            renderTodos();
          };
          li.appendChild(input);
          li.appendChild(editButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => {
          todos.splice(index, 1);
          renderTodos();
        };
        li.appendChild(deleteButton);

        todoList.appendChild(li);
      });
    }

    addButton.onclick = () => {
      const text = todoInput.value.trim();
      if (text) {
        todos.push({ text, editing: false });
        todoInput.value = '';
        renderTodos();
      }
    };

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addButton.click();
      }
    });

    renderTodos();
  });


  // CRUD Logic
  async function fetchTodos() {
    const response = await fetch(apiBase);
   

  }