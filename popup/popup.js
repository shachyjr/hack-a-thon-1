
let start = document.getElementById("submit-start");
// let timeElapsed = 0;
// let time = Date.now();

// controlls timers
start.addEventListener("click", function(){
  // timeElapsed = Date.now() - time;
  // let timeDiv = document.getElementById("time-spent");
  localStorage.clear();
  // timeDiv.innerText = getTime(timeElapsed);
  chrome.tabs.query({}, function(tabs) {
    console.log(tabs);
    tabs.forEach((tabInd) => {
      let tabURL = tabInd.url;
      let tabID = tabInd.id;
      let tabTitle = tabInd.title;
      let tabObj = {
        id: tabID,
        url: tabURL,
        title: tabTitle,
        startTime: Date.now(),
        timeElapsed: 0,
        closed: false,
        category: ""
      }
      localStorage[tabObj.id] = JSON.stringify(tabObj);
    });
  });
})

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

// add listener for when tab is closed
chrome.tabs.onRemoved.addListener(function(id) {
  let currTime = Date.now();
  if (localStorage[id]) {
    let parsedObj = JSON.parse(localStorage[id]);
    let startTime = parsedObj.startTime;
    parsedObj.timeElapsed = currTime - startTime;
    parsedObj.closed = true;
    localStorage[id] = JSON.stringify(parsedObj);
  }
  
});

// localStorage.clear(); - on click summary
// divide time elaped by 1000 before calling getTime();








