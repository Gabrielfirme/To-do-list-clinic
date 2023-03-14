
//seleção de elementos //
const todoForm = document.querySelector("#todo-clinic-form");
const todoInput = document.querySelector("#todos-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#editar-formulario");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("erase-button");
const filterBtn = document.querySelector("filter-select");

let oldInputvalue;



//funções
//criar a div por meio do js//
 const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
//criar titulo//
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

//botão check(feito)//
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
//botão para editar tarefa//
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
//botão para excluir tarefa//
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    //utilizando dados da local storage//
    if (done) {
        todo.classList.add("done");
    }

    if(save) {
        saveTodoLocalStorage({text, done : 0});
    }

    todoList.appendChild(todo);
    todoInput.value="";

    todoInput.focus();

    
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");

};

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputvalue) {
         todoTitle.innerText = text;

            //utilizando dados da local storage//
            updateTodoLocalStorage(oldInputvalue,text);
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display="flex";

        console.log(todoTitle);

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "todos":
            todos.forEach((todo) => (todo.style.display = "flex"));

            break;


        case "feitos":
            todos.forEach((todo) =>
                todo.classList.contains("feitos")
                    ? (todo.style.display="flex")
                    : (todo.style.display= "none")
            );
            
            break;

        case "pendentes":
            todos.forEach((todo) =>
                !todo.classList.contains("feitos")
                    ? (todo.style.display="flex")
                    : (todo.style.display= "none")
            );

            break;

        default:
            break;
    }
};


//eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
});

todoForm.addEventListener("click",(e) =>{
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue){
        saveTodo(inputValue);
        //salvar todo o to-do//
    }
});

document.addEventListener("click", (e) =>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }
//botão para assinalar a tarefa como já executada//
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");


        updateTodoStatusLocalStorage(todoTitle);
    }
//botão para remover itens //
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();

        removeTodoLocalStorage(todoTitle);
    }
    
    if(targetEl.classList.contains("edit-todo")) {
        //esta função vai esconder um formulário e mostrar outro//
        toggleForms();


        editInput.value = todoTitle;
        oldInputvalue = todoTitle;

    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();

});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {

        updateTodo(editInputValue);

    }
    toggleForms();

});
searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

//local storage 
const getTodosLocalStorage = () => {
    const todos =JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};
const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos",JSON.stringify(todos));
};
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage =  (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos",JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldtext, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) => 
     todo.text === todoOldtext ? (todo.text = todoNewText) : null

    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos;