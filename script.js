function updateTime() {
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

updateTime();
setInterval(updateTime, 1000);
