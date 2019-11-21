// select video element
var vid = document.getElementById('player');
var time = $('#time');
var scroll = $('#scroll');
var windowheight = $(window).height()-20;

//set-hieght
var winheight = document.getElementById('set-height');

var scrollpos = window.pageYOffset/400;
var targetscrollpos = scrollpos;
var accel = 0;

// ---- Values you can tweak: ----
var accelamount = 0.01; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
var bounceamount = 0.91; //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce

// pause video on load
vid.pause();
 
window.onscroll = function(){
    //Set the video position that we want to end up at:
    targetscrollpos = window.pageYOffset/400;
  
    //move the red dot to a position across the side of the screen
    //that indicates how far we've scrolled.
    scroll.css('top', 10+(window.pageYOffset/(vid.duration * windowheight/1.8)*windowheight));
};


setInterval(function(){  
        
      //Accelerate towards the target:
      accel += (targetscrollpos - scrollpos)*accelamount;
      
      //clamp the acceleration so that it doesnt go too fast
      if (accel > 1) accel = 1;
      if (accel < -1) accel = -1;
  
      //move the video scroll position according to the acceleration and how much bouncing you selected:
      scrollpos = (scrollpos + accel) * (bounceamount) + (targetscrollpos * (1-bounceamount));
  
      //move the blue dot to a position across the side of the screen
      //that indicates where the current video scroll pos is.  
      time.css('top', 10+(scrollpos/(vid.duration * windowheight/1.8)*400*windowheight));
  
      //update video playback
      vid.currentTime = scrollpos;
      vid.pause();
      //alert(vid.duration);
      winheight.style.height = vid.duration * windowheight/1.8 + "px";
    
}, 40);
