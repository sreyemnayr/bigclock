var gui = require('nw.gui');
 var win = gui.Window.get();

var tray;
 tray = new gui.Tray({ title: "Mr. Ryan's Big Clock", icon: './html/node-webkit/icon/clock-128.png' });

 tray.on('click', function() {
 	win.minimize();
 });

 win.on('minimize', function() {
      // Hide window
      this.hide();

      // Show window and remove tray when clicked
      tray.on('click', function() {
        win.restore();
  
      });
    });

 win.on('restore', function() {
      // Hide window
      this.show();

      // Show window and remove tray when clicked
      tray.on('click', function() {
        win.minimize();
  
      });
    });



var option = {
  key : "F11",
  active : function() {
   console.log("Global desktop keyboard shortcut: " + this.key + " active."); 
    win.toggleFullscreen();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

// Create a shortcut with |option|.
var shortcut = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcut);

var option = {
  key : "Ctrl+Q",
  active : function() {
   console.log("Global desktop keyboard shortcut: " + this.key + " active."); 
    gui.App.quit();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

// Create a shortcut with |option|.
var shortcutQuit = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcutQuit);