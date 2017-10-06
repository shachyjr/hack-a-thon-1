
let start = document.getElementById("submit-start");

let count = 0;
// controlls timers
start.addEventListener("click", function(){

  localStorage.clear();
 
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
      localStorage[count.toString()] = JSON.stringify(tabObj);
      count ++;
    });
    console.log(localStorage);
  });
})



// add listener for when tab is closed
chrome.tabs.onRemoved.addListener(function(id) {
  let currTime = Date.now();
  for (let i=0; localStorage[i]; i++) {
    //console.log(localStorage[ind]);
    let parsedObj = JSON.parse(localStorage[i]);
    if(parsedObj.id === id) {
      console.log(typeof currIndexedObj);
      console.log(typeof id);
      
      let startTime = parsedObj.startTime;
      parsedObj.timeElapsed = currTime - startTime;
      console.log(parsedObj.timeElapsed);
      parsedObj.closed = true;
      localStorage[i] = JSON.stringify(parsedObj);
    }
  }
});











