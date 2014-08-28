bigclock
========

Mr. Ryan's Big Clock

I (Ryan Meyers) created this application for my second grade class at The Good Shepherd Nativity School in New Orleans, Louisiana.  Basically, I just needed a giant clock because we didn't have one on the wall.  Then, I thought it would be cool if it implemented our schedule so that students (and teachers) could see what was coming up next.

I'm just barely a competent developer, so please be gentle with support requests/complaints.

To use your own calendar, copy the Calendar ID into the settings page and click the little check button.  As of right now, the calendar must be set to public.  I'll work on the OAuth stuff at some point.

I'm probably going to do a nearly complete re-write using Node.js as a backend and thus pulling a bunch of the figuring away from the client.  Mostly, I just want to learn Node.js and this seems like as good a way to do it as any.

Here's some stuff that's currently on my radar (but who knows if I'll ever get around to doing all of it):
* On-screen (blinky) alarms and audio alarms for when events begin/end.
* Optional display of all-day events
* Google authentication, thus allowing non-public calendars
* Simple classroom tools like a timer, stopwatch, random student chooser (possibly brought in from a list in the description or something... we'll see)
* Standalone desktop apps using node-webkit.
* Cleaning out superfluous code (and fixing the way I've hacked up BigText and fullPage)

Code is Copyright © 2014, Ryan Meyers (except where otherwise acknowledged) and is distributed under the GPL v3 license, which is included in the package available for forking on GitHub at https://github.com/sreyemnayr/bigclock.

Much gratitude is owed to the following fine developers, from whom much code was adapted or borrowed: Jake Handling (gcal-events); Zach Leatherman (BigText); Alvaro Trigo (fullPage); Ben Alman (throttle/debounce).

Additionally, the following technologies have been utilized in creating this application: jQuery, jQueryUI, FontAwesome.
