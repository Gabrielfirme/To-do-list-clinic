
//seleção de elementos //
const todoForm = document.querySelector("#todo-clinic-form");
const todoInput = document.querySelector("#todos-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#editar-formulario");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");




//funções
//criar a div por meio do js//
 const saveTodo = (text) => {
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
    todo.appendChild(doneBtn)
//botão para editar tarefa//
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn)
//botão para excluir tarefa//
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn)
//acrescentar o todoList dentro do todo//
    todoList.appendChild(todo);
//para quando escrever dentro do todoInput já limpar automaticamente e deixar o espaço vazio//
    todoInput.value="";

    todoInput.focus();
    
};

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");

};

//eventos

todoForm.addEventListener("click",(e) =>{
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue){
        saveTodo(inputValue)
        //salvar todo o to-do//
    }
});

document.addEventListener("click",(e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div");
//botão para assinalar a tarefa como já executada//
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }
//botão para remover itens //
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
    
    if(targetEl.classList.contains("edit-todo")){
        //esta função vai esconder um formulário e mostrar outro//
        toggleForms()
    }
});

cancelEditBtn.addEventListener("click",(e) =>{
    e.preventDefault();

    toggleForms();

});