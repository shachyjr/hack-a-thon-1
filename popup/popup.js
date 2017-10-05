
  let start = document.getElementById("submit-start")
  let timeElapsed = 0;
  let time = Date();

  
  // console.log(time);

  /* have : start time - time
            current time 
            current time - start time = time elapsed (milliseconds)
            milliseconds/1000 = seconds

            hours = 1 hour 2 minutes 3 seconds
            seconds -> 3723
            hours = second > 3600: Math.floor(seconds/3600) hours Math.floor(minutes = (seconds/60)%60) minutes (seconds%60) seconds
            minutes = seconds > 60: Math.floor(seconds/60) mins (seconds % 60) seconds


            
  */





  start.addEventListener("click", function(){
    timeElapsed = Date(Date() - time);
    console.log(timeElapsed);
    let timeDiv = document.getElementById("time-spent");
    timeDiv.innerText = timeElapsed;
  })


