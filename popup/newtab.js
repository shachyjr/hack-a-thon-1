// processes time difference in milliseconds to make it readable for user
function getTime(totalSeconds) {
    let seconds = totalSeconds % 60;
      
    let minutes = Math.floor((totalSeconds / 60) % 60);
    let hours = Math.floor(totalSeconds / 3600);
  
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
  
    if (totalSeconds > 3600 && totalSeconds % 3600 ===0) {
      return hours + 'h'
    }
  
    if (totalSeconds > 3600 && totalSeconds % 3600 !==0 && totalSeconds % 60 ===0) {
      return hours + 'h ' + minutes + 'm '
    }
    if (totalSeconds > 3600 && totalSeconds % 3600 !==0 && totalSeconds % 60 !==0) {
      return hours + 'h ' + minutes + 'm ' + seconds + 's'
    }
  
    if (totalSeconds === 3600) {
      return hours + 'h'
    }
  
    if (totalSeconds < 3600 && totalSeconds > 60 && totalSeconds % 60 !== 0) {
      return minutes + 'm ' + seconds + 's'
    }
  
    if (totalSeconds < 3600 && totalSeconds > 60 && totalSeconds % 60 === 0) {
  
      return minutes + 'm'
    }
  
    if (totalSeconds < 60) {
      return totalSeconds + 's'
    }
    if (totalSeconds === 60) {
      return minutes + 'm'
    }
  }

document.addEventListener("DOMContentLoaded", function(event) {



    for (let i=0; localStorage[i]; i++) {
        //console.log(localStorage[i]);
    let tabObj = JSON.parse(localStorage[i]);
    if(tabObj) {
        let urlDiv = document.createElement('p')
        urlDiv.setAttribute('class', 'url')
        urlDiv.innerHTML = 'hello'

        let titleDiv = document.createElement('p')
        titleDiv.setAttribute('class', 'title')
        titleDiv.innerHTML = tabObj.title

        let timeDiv = document.createElement('p')
        timeDiv.setAttribute('class', 'time')
        timeDiv.innerHTML = getTime(tabObj.timeElapsed/1000);

        let stat = document.getElementById('stats')
        stat.appendChild(timeDiv)
        stat.appendChild(titleDiv)
        stat.appendChild(timeDiv)
    }
    }
  

})

  