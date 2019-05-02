const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
  const btn = event.target;   // target: for knowing which object was clicked
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){ // filter execute functions for every items in the list
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON stringify take any Js objects and return it into string
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;    // add toDo list
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;      // give id for each toDo list
  toDoList.appendChild(li);
  const toDoObj = {        // put toDos in the array
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value ="";
}

function loadToDos(){
  const loadedToDos= localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null ){
    const parsedToDos = JSON.parse(loadedToDos); // parse changes string to object
    parsedToDos.forEach(function(toDo){ //forEach execute the function for each object
      paintToDo(toDo.text);
    })
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
