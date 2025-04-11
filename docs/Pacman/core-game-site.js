//General Scripts for on-page actions


// Click on Menu button
function menuClick() {
		var leftad = document.getElementById("leftad");
		var fsb = document.getElementById("full-screen-button");
		var checkbox = document.getElementById("checkbox1").checked;
		
		if (checkbox) {
			leftad.style.display = "none";			
		}		
		else if (!checkbox && screenfull.isFullscreen) {
			leftad.style.display = "none";			
		}		
		else {
			leftad.style.display = "block";
	  }  
	}
	
// Click on More Games button
function moreClick() {
		var menucontainer = document.getElementById("menu-container");
		var rightcolumn = document.getElementById("right-column");
		
		 if (menucontainer.style.width === "430px") {			  
			menucontainer.style.width = "210px";
			rightcolumn.style.display = "none";
		   }
		 else {
			menucontainer.style.width = "430px";
			rightcolumn.style.display = "block";
	 }		
	}

// Detect click on F key - Toggle Full Screen Mode on/off
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(keypress) {
		if(keypress.key == "f" && screenfull.isEnabled) {
			screenfull.toggle();
		}
		else {}
}

// Function to toggle full screen mode on/off - activated when full screen icon is clicked
	function fullScreenMode() {
		if (screenfull.isEnabled) {	
			  screenfull.toggle();		  
		  } 
		else {
			  alert("Full screen mode is not possible on this device sadly. But 'Add to Home Screen' works nicely.");
			  var fsb = document.getElementById("full-screen-button");
			  var hm = document.getElementById("header-message");
			  var footernav = document.getElementById("footer-navigation");
			  fsb.style.display = "none";
			  hm.style.display = "none";
			  footernav.style.display = "none";
			  
		  }		  
		}
