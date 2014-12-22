var scrollUnlocked = true;
var keys = {};

var debounced = $.debounce( 1200, true, showLock );

function checkKeys(e,down) {
  down = typeof down === 'boolean' ? down : false;
  if(down)  
  {
    keys[e.which] = true;
     if(keys.hasOwnProperty("32") && keys.hasOwnProperty("75") && keys.hasOwnProperty("76"))
        return true;
    else
      return false; 
  }
    else 
    {
        delete keys[e.which];
        return false;
  
    }

    return false;
  
   
}

function setLock(u){
  u = typeof u === 'boolean' ?  u : false;

  if(u)
  {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false); 
        $('#buttonLock').empty().append('<i class="fa fa-fw fa-lock"> </i>'); 
        scrollUnlocked = false;
  }
  else
  {
         $.fn.fullpage.setAllowScrolling(true);
         $.fn.fullpage.setKeyboardScrolling(true);  
         $('#buttonLock').empty().append('<i class="fa fa-fw fa-unlock"> </i>');
         scrollUnlocked = true;
   }

}
function unlock(){
  setLock(false);
}
function lock(){
  setLock(true);
}

function showLock(){
 
 if(scrollUnlocked === false){

    $.gritter.add({
                    
                    text: '<i class="fa fa-fw fa-lock"> </i>',
                    time: 1000,
                    position: 'bottom-right'
                });
  }
}


$(window).load(function() {


 

    $('#footer').fadeTo(200,0.05);

 $('#fullpage').fullpage({
 	verticalCentered: false,
 	continuousVertical: true,
    easing: 'easeInSine',
 	afterRender: function(){

 		$('#dateDiv').bigtext();
        $('#dateDiv2').bigtext();
        $('#now').bigtext();
        $('#next').bigtext();
		
        myTimer3();
		var myTimeInterval=setInterval(function(){myTimer()},1000);
        var myTimeInterval2=setInterval(function(){myTimer2()},131);

         if(localStorage.getItem("googleCalendarId") === null){
            localStorage.setItem("googleCalendarId", googleCalendarId);
        } else {
            googleCalendarId = localStorage.getItem("googleCalendarId");
        }

         if(localStorage.getItem("startLocked") === null){
            localStorage.setItem("startLocked", startLocked);
        } else {
            startLocked = JSON.parse(localStorage.getItem("startLocked"));
        }

        //console.log(startLocked);
        
        loadTumbo();

        if(startLocked)
        {
            document.getElementById('startLocked').checked = true;
            lock();
        }
        else
        {
            document.getElementById('startLocked').checked = false;
        }
 		
        
 		var myTimeInterval=setInterval(function(){myTimer()},1000);
		var myTimeInterval2=setInterval(function(){myTimer2()},131);
        
 		  $('#gcal-address').val(googleCalendarId);
        
        $('#gcal-address-check').click(function(){
            googleCalendarId = $('#gcal-address').val();
            localStorage.setItem("googleCalendarId", googleCalendarId);
            loadTumbo();
        });

        $(document).keydown(function (e) {
           if(!scrollUnlocked) 
            {
              e.preventDefault();
             
             if(checkKeys(e,true)) 
              {
                unlock();
              }
             
            }
        });

        $(document).keyup(function (e) {
           checkKeys(e,false);

           if(!scrollUnlocked)
           {
              debounced();
           }
        });

         $('#gcal-address').keypress(function(){
            $('#gcal-address-check').empty().append('<i class="fa fa-check"> </i>');
         });

        $('#buttonClock').click(function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionClock');
        });
        
        $(document).bind('keydown', 'c', function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionClock');
        });

        $('#buttonCalendar').click(function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionCalendar');
        });

        $(document).bind('keydown', 'n', function(){
         if(scrollUnlocked === true)   $.fn.fullpage.moveTo('sectionCalendar');
        });

        $('#buttonTimer').click(function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionTimer');
        });

        $(document).bind('keydown', 't', function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionTimer');
        });

        $('#buttonInfo').click(function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionInfo');
        });

        $('#buttonSettings').click(function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionInfo', 'slideSettings');
        });

        $(document).bind('keydown', 's', function(){
          if(scrollUnlocked === true)  $.fn.fullpage.moveTo('sectionInfo', 'slideSettings');
        });

        $('#buttonLock').click(function(){
            if(scrollUnlocked === true)
            {
               lock();
            }
            else
            {
            // unlock();
             //  $.throttle(1000, showLock);
              showLock();
             }

        });

        $(document).bind('contextmenu', function (e) {
            if(scrollUnlocked === true)
            {
             var dummy = 0;
            }
            else
            {
              e.preventDefault();
              showLock();
            }
          });

        $(document).bind('keydown', 'l', function(){
            if(scrollUnlocked === true)
            {
                 lock();
            }
          

        });

        $('#footer').mouseenter(function(){
            $(this).fadeTo(500,1.0);
        })
        .mouseleave(function(){
            $(this).fadeTo(500,0.05);
        });

        $('#startLocked').change(function(){
             localStorage.setItem("startLocked", $(this).is(":checked"));
             console.log($(this).is(":checked"));
        });

        $.extend($.gritter.options, { 
        position: 'bottom-right'});

 	},
    afterResize: function(){
        showTumbo(null);
    }
 });
});