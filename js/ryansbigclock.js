$(window).load(function() {

 $('#fullpage').fullpage({
 	verticalCentered: false,
 	continuousVertical: true,
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
 	},
    afterResize: function(){
        showTumbo(null);
    }
 });
});