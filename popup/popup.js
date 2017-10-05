
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
    // console.log(tabs);
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
console.log(chrome.tabs.Tab)

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


function displayData() {
  chrome.tabs.query({},function(tabs) {
    tabs.forEach(function(tab) {
      let tabObj = localStorage[tab.id]
      if(tabObj) {
        let urlDiv = document.createElement('p')
        urlDiv.setAttribute('class', 'url')
        urlDiv.innerHTML = tabObj.url

        let titleDiv = document.createElement('p')
        titleDiv.setAttribute('class', 'title')
        titleDiv.innerHTML = tabObj.title

        let timeDiv = document.createElement('p')
        timeDiv.setAttribute('class', 'time')
        timeDiv.innerHTML = tabObj.timeElapsed

        let stat = document.getElementById('stats')
        stat.appendChild(timeDiv)
        stat.appendChild(titleDiv)
        stat.appendChild(timeDiv)
      }
    })
  })
}
// localStorage.clear(); - on click summary
// divide time elaped by 1000 before calling getTime();



// function getMet(){
//   let meta = document.getElementsByTagName('meta');
//   for(var i = 0; i < meta.length; i += 1) {
//     if(meta[i].getAttribute('name').toLowerCase() == 'description') {
//       return meta[i].getAttribute('content');
//     }
//   }
//   return null;
// }

// let categories ={
//   social: null,
//   lifestyles: null,
//   sport: null,
//   food: null
// }



  // let review = document.getElementById("submit-review")
  // review.addEventListener('click', displayData)








