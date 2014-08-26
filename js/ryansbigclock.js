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
        
        loadTumbo();
 		
        
 		var myTimeInterval=setInterval(function(){myTimer()},1000);
		var myTimeInterval2=setInterval(function(){myTimer2()},131);
        
 		

 	},
    afterResize: function(){
        showTumbo(null);
    }
 });
});