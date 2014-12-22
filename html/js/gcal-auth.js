 var clientId = '453136700795-r19poqfl5u88nfunuaodaafl00pg2a1l.apps.googleusercontent.com';

      //var googleCalendarApiKey = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';

      var scopes = 'https://www.googleapis.com/auth/calendar.readonly';

      function handleClientLoad() {
        // Step 2: Reference the API key
        gapi.client.setApiKey(googleCalendarApiKey);
        window.setTimeout(checkAuth,1);
      }

      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }

      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        // Step 3: get authorization to use private data
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        // Step 4: Load the Google+ API
        gapi.client.load('calendar', 'v3').then(function() {
          // Step 5: Assemble the API request
          var request = gapi.client.calendar.calendarList.list({
            fields: 'items'
          });
          // Step 6: Execute the API request
          request.then(function(resp) {
            //var heading = document.createElement('h4');
            //var image = document.createElement('img');
           // image.src = resp.image.url;
           // heading.appendChild(image);
           // heading.appendChild(document.createTextNode(resp.result.displayName));

           console.log(resp);

          }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
          });
        });
      }