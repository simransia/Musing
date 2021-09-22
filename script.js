const app = () => {
    const video = document.querySelector(".default-video video");
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
     
    //time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-selector button");
    
    //sounds
    const sounds = document.querySelectorAll(".sound-selector button");

    //length of the outline
    const outlineLength=  outline.getTotalLength();

  

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

      //play duration
      var playDuration = 600;

  
     
    // select time
    timeSelect.forEach(option => {
         option.addEventListener( "click", function(){
            playDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(playDuration / 60)}:${Math.floor(playDuration % 60)}`;
         });

    });

    //play & pause event
     play.addEventListener("click" , () => {
       
        playing(song);  

            });

    const playing = song =>{

            if(song.paused){
                song.play();
                video.play(); 
                play.src = "images/pause.png";       
            }else{
                song.pause();
                video.pause();
                play.src = "images/play.png";
                 }
      };

    //animate the circle

    song.ontimeupdate = () => {
         let currentTime = song.currentTime;
         let elapsed = playDuration - currentTime;
         let seconds = Math.floor(elapsed % 60 );
         let minutes = Math.floor(elapsed /60);

         let progress = outlineLength - (currentTime/playDuration) * outlineLength;
         outline.style.strokeDashoffset = progress ;

        // Animate time text
        timeDisplay.textContent = `${minutes}:${seconds}` ;

        if (currentTime >= playDuration){
            song.pause();
            video.pause();
            song.currentTime = 0 ;
            play.src = "images/play.png";
        };
    };

      // select sound
      sounds.forEach( sound => {
        sound.addEventListener("click", function(){
             video.src= this.getAttribute("data-video");
             song.src= this.getAttribute("data-sound");
              playing(song);
          });
      });
  };
app();