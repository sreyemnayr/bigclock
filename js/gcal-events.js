var dateLowerlimit = "";
var tokenArray = ["start", "init"];
var tokenIndex = 1;
var nextEventStartDate = Date();
var eventArray = [];
var myTimeInterval3 = null;

function getDateLowerLimit() {
    var todayDate;
    

        todayDate = new Date();
        dateLowerlimit = todayDate.getFullYear() + "-" + (todayDate.getMonth() < 10 ? '0' : '') + (todayDate.getMonth() + 1) + "-" + (todayDate.getDate() < 10 ? '0' : '') + todayDate.getDate() + "T" + todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds() + "-05:00"
    
}

function getFormattedDate(dateTime, withZone) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dd = new Date(dateTime);
    timeZone = (dateTime.indexOf("+") != -1) ? "[GMT" + dateTime.substring(dateTime.indexOf("+")) + "]" : "";
    if (withZone) return "<span class='gcal-datetime'>" + dd.getDate() + " " + monthNames[dd.getMonth()] + " " + dd.toLocaleTimeString() + "</span>";
    return dd.getDate() + " " + monthNames[dd.getMonth()] + " " + dd.getHours() + ":" + (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes()
}
if (null == colorBox || colorBox == "" || colorBox == "undefined") var colorBox = ['rgb(242,227,242)', 'rgb(217,231,255)', 'rgb(240,240,240)', 'rgb(232,246,189)', 'rgb(206,235,202)'];

/*$(window).load(function() {
    //var style = '<style>::-webkit-scrollbar {width: 10px;}::-webkit-scrollbar-button {display:none;}::-webkit-scrollbar-track-piece {background: #888}::-webkit-scrollbar-thumb {background: #eee}</style>';
   
    
    $('#gcal').append('<div class="gcal-rpointer">></div>');
    $('.gcal-rpointer').mouseenter(function() {
        $(this).css('background-color', 'rgb(255,207,19)')
    });
    $('.gcal-rpointer').mouseleave(function() {
        $(this).css('background-color', 'transparent')
    });
    $('.gcal-rpointer').click(function() {
        (tokenIndex >= (tokenArray.length - 1)) ? (tokenIndex = (tokenArray.length - 1)) : tokenIndex++;
        loadTumbo()
    });
    $('#gcal').append('<div class="gcal-lpointer">&nbsp;&nbsp;<</div>');
    $('.gcal-lpointer').mouseenter(function() {
        $(this).css('background-color', 'rgb(255,207,19)')
    });
    $('.gcal-lpointer').mouseleave(function() {
        $(this).css('background-color', 'transparent')
    });
    $('.gcal-lpointer').click(function() {
        (tokenIndex <= 0) ? tokenIndex = 0: tokenIndex--;
        loadTumbo()
    });
  
});*/

//var myTumbo=setInterval(function(){loadTumbo()},60000);

function loadTumbo() {
	//$('#gcal').empty();
    var apiPostURL = "https://www.googleapis.com/calendar/v3/calendars/" + googleCalendarId + "/events";
 //   $('#gcal').empty().append('<h3>loading ...</h3>');
    getDateLowerLimit();
    var dataBox = {
        orderBy: "startTime",
        singleEvents: "true",
        timeMin: dateLowerlimit,
        fields: "items,nextPageToken",
        key: googleCalendarApiKey,
        maxResults: maxGcalEvents
    };
    pageToken = tokenArray[tokenIndex];
    if (null == pageToken || pageToken == "undefined" || pageToken == "") {
        $('#gcal').empty().append('<div class="event-header">Error .. Reload page!</div>');
        return
    }
    if (pageToken == "init") {
        callAPI(apiPostURL, dataBox)
    } else {
        dataBox['pageToken'] = pageToken;
        callAPI(apiPostURL, dataBox)
    }
	
    
}

function callAPI(apiPostURL, dataBox) {
    $.ajax({
        url: apiPostURL,
        type: "GET",
        data: dataBox,
        async: true,
        cache: true,
        dataType: "jsonp",
        success: function(data) {
            showTumbo(data)
        },
        error: function(html) {
            alert(html)
        },
        beforeSend: setHeader
    })
}

function showTumbo(data) {
   // $('#gcal-table').empty().append('<tr id="gcal-row"></tr>');
    if(data != null){
        eventArray = data.items;
    }
    var now = new Date();
    if (tokenIndex == (tokenArray.length - 1)) {
        tokenArray.push((null == data.nextPageToken) ? "end" : data.nextPageToken)
    }
    eventHTML = "";
    var c = 0;
    var gotNext = false;
    var sizeOfNowDiv = 0;
    var sizeOfNextDiv = 1;

    var nextThen = false;
    $('#nowDiv').empty();
    $('#nextDiv').empty();

    for (var i = 0; i < eventArray.length; i++) {
        startDate = eventArray[i].start.date || eventArray[i].start.dateTime;
        endDate = eventArray[i].end.date || eventArray[i].end.dateTime;
        summary = eventArray[i].summary;
        description = eventArray[i].description;
        htmlLink = eventArray[i].htmlLink;
        event_location = eventArray[i].location;



/*        eventHTML += '<td><a href="' + htmlLink + '"><div class="event-header">';
        if (null != startDate && startDate != "undefined" && startDate != "") {
            eventHTML += getFormattedDate(startDate, true)
        }
        if (null != event_location && event_location != "undefined" && event_location != "") {
            eventHTML += "<br/>@ " + event_location
        }
        eventHTML += "</div>";
        if (null != summary && summary != "undefined" && summary != "") {
            eventHTML += "<div class='event-body' style='background-color:" + colorBox[c] + "'>" + summary
        }
        if (null != description && description != "undefined" && description != "") {
            eventHTML += "<span class='event-desc'>  &nbsp;&nbsp;[" + description + "] </span>"
        }
        eventHTML += "</div></a>";
        c = (++c > (colorBox.length - 1)) ? 0 : c++;
        eventHTML += '</td>'*/

        thisStartDate = new Date(startDate);
        thisEndDate = new Date(endDate);
    
    if( i == 0   ) { 

    	sSummary = summary.split('&');
    	eventHTML = '';

    	for(var ii = 0; ii < sSummary.length; ii++)
    	{

    		eventHTML += '<p class="nowText">'  + (ii > 0 ? '&amp; ' : '') + sSummary[ii] + '</p>'; 
    	}

    	sizeOfNowDiv += ii;

    	
    	$('#nowDiv').append(eventHTML);
    	
    	
		
		firstEventEndDate = thisEndDate;
			
			if ( (thisStartDate.getTime() - 60000) <= now.getTime() ){
				$('#nowHeader').empty().append('now');
	    	$('#nextHeader').empty().append('next');
			}
			else
			{
				$('#nowHeader').empty().append('next');
	    		$('#nextHeader').empty().append('then');

                nextThen = true;
                nextEventStartDate = thisStartDate;
                sizeOfNowDiv++;
            }
		
		}
	else if((thisStartDate.getTime() < firstEventEndDate.getTime()) && (thisStartDate.getTime() <= now.getTime() ) ){
		   	sSummary = summary.split('&');
	    	eventHTML = '';

	    	for(var ii = 0; ii < sSummary.length; ii++)
	    	{

	    		eventHTML += '<p class="nowText">&amp; ' + sSummary[ii] + '</p>'; 
	    	}

	    	sizeOfNowDiv += ii;

    	$('#nowDiv').append(eventHTML);
		firstEventEndDate = thisEndDate;


	}
    else { 
    	

    		sSummary = summary.split('&');
	    	eventHTML = '';

	    	for(var ii = 0; ii < sSummary.length; ii++)
	    	{

	    		eventHTML += '<p class="nextText">'   + (ii > 0 ? '&amp; ' : '') + sSummary[ii] + '</p>'; 
	    	}

	    	sizeOfNextDiv += ii;
    	
    	if(nextThen){
            $('#nowDiv').append('<p class="timeToNext">&nbsp;&nbsp;&nbsp;&nbsp;in 000 minutes</p>');
            sizeOfNextDiv--;
        }
        else {
            eventHTML += '<p class="timeToNext">&nbsp;&nbsp;&nbsp;&nbsp;in 000 minutes</p>';
            nextEventStartDate = thisStartDate;
             }
    	$('#nextDiv').append(eventHTML);
    	setTimeout( loadTumbo, ( ( ( firstEventEndDate.getTime() >= nextEventStartDate.getTime() ? nextEventStartDate.getTime() : firstEventEndDate.getTime() )  - now.getTime() ) ) );
    	break;
	}
}

var maxNowSize = Math.floor((($(window).height() - $('#timeDateDiv').height() ) * .5) / sizeOfNowDiv );
 $('#nowDiv').bigtext({
        maxfontsize: maxNowSize
    });

var maxNextSize = Math.floor( ( ( $(window).height() - ( $('#timeDateDiv').height() + $('#nextDiv').height() ) )  * .7 ) / sizeOfNextDiv );

console.log(maxNowSize);
console.log(maxNextSize);

   
	$('#nextDiv').bigtext({
		maxfontsize: maxNextSize
	});
    
}

function setHeader(xhr) {
    if (xhr && xhr.overrideMimeType) {
        xhr.overrideMimeType("application/j-son;charset=UTF-8")
    }
}



function myTimer() {
    var d = new Date();
    $('.time').empty().append((d.getHours() > 12 ? (d.getHours() - 12) : (d.getHours() == 0 ? 12 : d.getHours())) + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
   
    $('#timeDiv').bigtext();
  $('#timeDiv2').bigtext({maxfontsize: $(window).height() * .6});
  //  $('#dateDiv2').bigtext({maxfontsize: $(window).height() * .25});
 //     $('#timeDiv2').bigtext();
    $('#dateDiv2').bigtext();


    secondsToNext = ( nextEventStartDate.getTime() - d.getTime() ) / 1000 ;
    if(secondsToNext > 60){
    	timeToNext = '&nbsp;&nbsp;&nbsp;&nbsp;in ' + Math.ceil( secondsToNext / 60 ) + ' minutes';
    }
    else{
    	timeToNext = '&nbsp;&nbsp;&nbsp;&nbsp;in ' + Math.ceil(secondsToNext) + ' seconds';
    }

  $('.timeToNext').empty().append(timeToNext);
 // $('#nextDiv').bigtext();

}

function myTimer2() {
    var d = new Date();
    document.getElementById("mseconds").innerHTML = ( ( d.getSeconds() * 1000 ) + d.getMilliseconds() );
}

function myTimer3() {
    var dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        var dayNames2 = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        var monthNames2 = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

     var d = new Date();
    $('#dayOfWeek').empty().append(dayNames[d.getDay()] );
    $('#monthOfYear').empty().append(monthNames[d.getMonth()] );
    $('#dayOfMonth').empty().append(d.getDate() );
    $('#year').empty().append(d.getFullYear() );

    $('#dayOfWeek2').empty().append(dayNames2[d.getDay()] );
    $('#monthOfYear2').empty().append((monthNames2[d.getMonth()] ) + 
                                                        ' ' +
                                                        ( d.getDate() ) + 
                                                        ', ' + 
                                                        (  d.getFullYear() ));

    var msUntilMidnight = ( ( 24 - d.getHours() ) * 60 * 60 * 1000 ) +
                              ( ( 60 - d.getMinutes() ) * 60 * 1000 ) +
                              ( ( 60 - d.getSeconds() ) * 1000 );

    $('#dateDiv').bigtext();
        $('#dateDiv2').bigtext();

    myTimeInterval3=setTimeout(function(){myTimer3()},msUntilMidnight)
}


