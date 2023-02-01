

let firstcardBody = document.querySelectorAll(".card-body")[0]
let secondcardBody = document.querySelectorAll(".card-body")[1]
let buttonADD = document.querySelector("#todoAddButton")
let inputName = document.querySelector("#todoName")
let todoList = document.querySelector(".list-group")
let clearButton = document.querySelector("#todoClearButton")
let form = document.querySelector("#todoAddForm")
let todos =[]

appEvents()
function appEvents(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",pageLoaded)
    secondcardBody.addEventListener("click",removeTodoİnterFace)
    clearButton.addEventListener("click",AllRemoveButton)

}


function AllRemoveButton(){
  let todoList = document.querySelectorAll(".list-group-item")
  //ekrandan silme
    if(todoList.length>0){
      todoList.forEach(function(todo){
        todo.remove()
      })
      //storage'den silme
      todos =[]
      localStorage.setItem("todos",JSON.stringify(todos))
      showToast("Başarılı bir şekilde silindi")

    }
    else{
      showToast("Lütfen todo yoksa geçerli bir todo giriniz!")
    }
}

function removeTodoİnterFace(event){
  //önyüz silme
  if(event.target.className === "fa-solid fa-xmark"){
    showToast("Todo silindi")
    let seven = event.target.parentElement.parentElement
    seven.remove()
    // storage silme
    removeTodoStorage(seven.textContent)
  }
}

function removeTodoStorage(borrarTodo){
  checkTodoStorage()
  todos.forEach(function(todo,index){
   if( borrarTodo === todo){
    todos.splice(index,1)
   }
  })
  localStorage.setItem("todos",JSON.stringify(todos))
}

function pageLoaded(){
  checkTodoStorage()
  todos.forEach(function(todo){
    addTodoİnterface(todo)
  })
}

function addTodo(event){
     //ARAYÜZ EKLE
  let inputText = inputName.value.trim() 
  if(inputText==null || inputText==""){
    showToast("Lütfen todo yoksa geçerli bir todo giriniz")
  }
  else{
    addTodoİnterface(inputText)
    showToast("TODO EKLENDİ")
  }
   
    event.preventDefault()
   // STORAGE EKLEME
   addTodoStorage(inputText)


}

function addTodoİnterface (newTodo){
     let liDOM =document.createElement("li")
    liDOM.className =("list-group-item d-flex justify-content-between")
    todoList.appendChild(liDOM)
    liDOM.textContent = newTodo
    let a =document.createElement("a") 
    a.className =("delete-item")
    liDOM.appendChild(a) 
    let i = document.createElement("i") 
    i.className = ("fa-solid fa-xmark" )
    a.href=("#")
    a.appendChild(i) 
    
    inputName.value = ""
}

function addTodoStorage(newTodo){
    checkTodoStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
function checkTodoStorage(){
    if(localStorage.getItem("todos")===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

function showToast(message){
    
    let div = document.createElement("div")
    div.className = `toast align-items-center d-flex   toast-body ${message}`
    div.textContent = message
    let button = document.createElement("button")
    button.className =("btn-close me-2 m-auto")
    firstcardBody.appendChild(div)
    div.appendChild(button)

    setTimeout(function(){
      div.remove()
    },2000)
}


