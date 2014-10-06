var scrollUnlocked = true;

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
        
        loadTumbo();
 		
        
 		var myTimeInterval=setInterval(function(){myTimer()},1000);
		var myTimeInterval2=setInterval(function(){myTimer2()},131);
        
 		  $('#gcal-address').val(googleCalendarId);
        
        $('#gcal-address-check').click(function(){
            googleCalendarId = $('#gcal-address').val();
            localStorage.setItem("googleCalendarId", googleCalendarId);
            loadTumbo();
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

        });

        $(document).bind('keydown', 'l', function(){
            if(scrollUnlocked === true)
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
          

        });

        $('#footer').mouseenter(function(){
            $(this).fadeTo(500,1.0);
        })
        .mouseleave(function(){
            $(this).fadeTo(500,0.05);
        });




 	},
    afterResize: function(){
        showTumbo(null);
    }
 });
});