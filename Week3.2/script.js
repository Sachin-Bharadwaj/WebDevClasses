let ctr=0;

function deleteEl(id) {
    const el = document.getElementById(id);
    el.parentNode.removeChild(el);
}

function AddTodo() {
    const value = document.querySelector("input").value;
    // create a element
    const spanEl = document.createElement("span");
    const buttonEl = document.createElement("button");
    spanEl.innerHTML = value;
    buttonEl.innerHTML = "Delete";
    ////
    const divEl = document.createElement("div");
    divEl.appendChild(spanEl);
    divEl.appendChild(buttonEl)
    ////
    document.querySelector("body").appendChild(divEl);
    ctr = ctr + 1;
}

let todos = [];

function addTodo() {
    todos.push({
        title: document.querySelector("input").value
    })
    render();
}

function deleteTodo(index) {
    todos.splice(index,1);
    render();
}

// Component
function todoComponent(todo, index) {
    const divEl = document.createElement("div")
    const spanEl = document.createElement("span");
    const buttonEl = document.createElement("button");
    spanEl.innerHTML = todo.title;
    buttonEl.innerHTML = "Delete";
    buttonEl.setAttribute("onclick", "deleteTodo("+ index + ")");
    // add span and button to divEl
    divEl.appendChild(spanEl);
    divEl.appendChild(buttonEl);
    return divEl;
}

function render() {
    document.querySelector('#todos').innerHTML="";
    todos.forEach((todo, index) => {
        divEl = todoComponent(todo, index);
        document.querySelector("#todos").appendChild(divEl);
    });
    
}