
let start = document.getElementById("submit-start")
let timeElapsed = 0;
let time = Date.now();
let stop = document.getElementById("submit-res")

//Clearing 

// controlls timers
start.addEventListener("click", function(){
  timeElapsed = Date.now() - time;
  let timeDiv = document.getElementById("time-spent");
  
  timeDiv.innerText = getTime(timeElapsed);
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

// gets url of current tab and logs it
chrome.tabs.getSelected(null, function(tab){
  console.log(tab.url);
});
// chrome.storage.sync(set)
var tabObjs = [];
// get all tabs in window - 
chrome.tabs.query({}, function(tabs) {
  tabs.forEach((tabInd) => {
    let tabURL = tabInd.url;
    let tabID = tabInd.tabID;
    let time = 0;
    let tabObj = {
      id: tabID,
      url: tabURL,
      time: time
    }
    // tabObjs.push(tabObj);
    chrome.storage.sync.set(tabObj, function() {
      console.log(`data saved!`);
    })
  });
});

var tabObjs;
chrome.storage.sync.get(null, function(items){
  console.log(items);
});

// tabObjs.forEach((tab) => {
//   console.log(tab);
//   // start timer 
//   // add to object keeping track
// });

chrome.tabs.onCreated.addListener(function() {
  //tabObjs[0].time = 37;
});


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



  let review = document.getElementById("submit-review")
  review.addEventListener('click', function() {
    chrome.tabs.create({'url': chrome.extension.getURL('newtab.html'), 'highlighted': 'true'});    
  })








