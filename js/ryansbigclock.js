$(window).load(function() {

 

 $('#fullpage').fullpage({
 	verticalCentered: false,
 	continuousVertical: true,
 	afterRender: function(){

 		var dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

		var dayNames2 = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
		var monthNames2 = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

	 var d = new Date();
    document.getElementById("dayOfWeek").innerHTML = (  dayNames[d.getDay()] );
    document.getElementById("monthOfYear").innerHTML = (  monthNames[d.getMonth()] );
    document.getElementById("dayOfMonth").innerHTML = (  d.getDate() );
    document.getElementById("year").innerHTML = (  d.getFullYear() );

    document.getElementById("dayOfWeek2").innerHTML = (  dayNames2[d.getDay()] );
    document.getElementById("monthOfYear2").innerHTML = ( monthNames2[d.getMonth()] ) + 
    													' ' +
    													( d.getDate() ) + 
    													', ' + 
    													(  d.getFullYear() );

 		$('#dateDiv').bigtext();
 		$('#now').bigtext();
		$('#next').bigtext();
		
		loadTumbo();
 		
 		var myTimeInterval=setInterval(function(){myTimer()},1000);
		var myTimeInterval=setInterval(function(){myTimer2()},131);
 		

 	},
    afterResize: function(){
        showTumbo(null);
    }
 });
});