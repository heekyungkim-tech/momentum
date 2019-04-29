const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWTING_ON = "showing";

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWTING_ON);
  form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
  greeting.classList.remove(SHOWTING_ON);
  greeting.classList.add(SHOWTING_ON);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName(); // when user dost not exists
  }else {
    paintGreeting(currentUser); // when the user exists
  }
}

function init(){
  loadName()
}

init();
