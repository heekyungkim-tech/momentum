const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const date = new Date(); // update the real-time
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // if hours,minutes,seconds < 10, return to 0 hours,minutes,seconds (add 0 in front of the time unit), otherwise return to hours,minutes,seconds

}
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
