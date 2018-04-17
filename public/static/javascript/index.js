var browser = navigator.userAgent.toLowerCase();
var mobile = browser.indexOf("mobile")>-1 ? true : false;
if(mobile) {
	$(".icon").css({"visibility":"visible"});
}
/* --------------------------------------------------------------- */
;(function(){
          function id(v){ return document.getElementById(v); }
          function loadbar() {
            var ovrl = id("overlay"),
                prog = id("progress"),
                stat = id("progstat"),
                img = document.images,
                c = 0,
                tot = img.length;
            if(tot == 0) return doneLoading();

            function imgLoaded(){
              c += 1;
              var perc = ((100/tot*c) << 0) +"%";
              prog.style.width = perc;
              stat.innerHTML = "Loading "+ perc;
              if(c===tot) return doneLoading();
            }
            function doneLoading(){
              ovrl.style.opacity = 0;
              setTimeout(function(){ 
                ovrl.style.display = "none";
              }, 1200);
            }
            for(var i=0; i<tot; i++) {
              var tImg     = new Image();
              tImg.onload  = imgLoaded;
              tImg.onerror = imgLoaded;
              tImg.src     = img[i].src;
            }    
          }
          document.addEventListener('DOMContentLoaded', loadbar, false);
}());
/* --------------------------------------------------------------- */

$( document ).ready(function() {
      // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      //window.location.replace("/dashboard/");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      console.log(user);
      if (!emailVerified) {
        console.log("not verified");
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      console.log("signed out");
    }
  });
  // [END authstatelistener]
/* --------------------------------------------------------------- */
	$("#tech-used .card").hover(function(e) {
		$(this).find(".techPercent").show().html("");
		var bar = new ProgressBar.Circle("#"+$(this).find(".techPercent").attr("id"), {
		  color: '#FFEA82',
		  trailColor: '#eee',
		  trailWidth: 1,
		  duration: 1400,
		  easing: 'bounce',
		  strokeWidth: 6,
		  from: {color: '#FFEA82', a:0},
		  to: {color: '#ED6A5A', a:1},
		  // Set default step function for all animate calls
		  step: function(state, circle) {
		    circle.path.setAttribute('stroke', state.color);
	        var value = Math.round(circle.value() * 100);
		    if (value === 0) {
		      circle.setText('');
		    } else {
		      circle.setText(value);
		    }
		  }
		});
		bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
		bar.text.style.fontSize = '5rem';
		bar.animate(0.7);  // Number from 0.0 to 1.0
	},
	function(e) {
		$(this).find(".techPercent").hide();
	});
/* --------------------------------------------------------------- */
	document.getElementById("defaultOpen").click();

	$(".modal-body #signin input").focus(function(e) {
		if(!$(this).val()) { 
		    $(this).attr("placeholder", "");
		}
		$(this).css({"border-color": "transparent"});
		$(this).next(".inner").show().css({"width": "100%", "border-radius": "12px"});
	}).focusout(function(e) {
		$(this).css({"border-color": "transparent transparent #ccc transparent"});
		$(this).next(".inner").hide().css({"width": "0%", "border-radius": "0px"});
	});
/* --------------------------------------------------------------- */
    $(".nav-item").hover(function() {
	  $(this).find(".icon").css({"visibility":"visible"});
	},
	function() {
	  $(this).find(".icon").css({"visibility":"hidden"});
	});
/* --------------------------------------------------------------- */
	window.onscroll = function() {
	  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	  if(winScroll > parseInt($("header").css("height"))-50) {
	  	$("nav").css({"position": "fixed", "top": "0px", "background-color": "#343a40", "width": "100%", "z-index": "16"});
	  }
	  else {
	  	$("nav").css({"position": "relative", "background-color": "transparent", "width": "100%", "z-index": "16"});
	  }
	  if (winScroll > 60) {
	  	document.getElementById("myBar").style.visibility = "visible";
	  }
	  else {
	  	document.getElementById("myBar").style.visibility = "hidden";
	  }
	  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	  var scrolled = (winScroll / height) * 100;
	  document.getElementById("myBar").style.width = scrolled + "%";
	};
/* --------------------------------------------------------------- */
    var signinForm = document.getElementById('sign-in');
	// Loop over them and prevent submission
  	signinForm.addEventListener('submit', function(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (validateSigninData() == false) {
	    	$("#wrong").text("Invalid Email or Password").show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
	    }
	    else {
	        submitSigninForm();
	    }
	    signinForm.classList.add('was-validated');

	}, false);
/* --------------------------------------------------------------- */
	var signupForm = document.getElementById('sign-up');
	// Loop over them and prevent submission
  	signupForm.addEventListener('submit', function(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (validateSignupData() == false) {
	    	$("#wrong").text("Invalid Data").show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
	    }
	    else {
	        submitSignupForm();
	    }
	    signupForm.classList.add('was-validated');

	}, false);

});
/* --------------------------------------------------------------- */

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/* --------------------------------------------------------------- */

function validateSigninData() {
    var e = $("#InputEmail").val();
    var p = $("#InputPassword").val();
    if(!validateEmail(e)) {
        return false;
    }
    if(p.length <= 5) {
        return false;
    }
    return true;
}
// submit the form data
function submitSigninForm(){
    $(".modal-body").hide();
    $(".modal-content .spinner").show();
    var email = document.getElementById('InputEmail').value;
    var password = document.getElementById('InputPassword').value;
    // When the user signs in with email and password.
	firebase.auth().signInWithEmailAndPassword(email, password)
	.catch(function(error) {
		// Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  $("#wrong").text(errorMessage).show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
            $(".modal-body").show();
            $(".modal-content .spinner").hide();

	}).then(user => {
	  // Get the user's ID token as it is needed to exchange for a session cookie.
	  return user.getIdToken().then(idToken => {
	    return postIdTokenToSessionLogin('/sessionLogin/', idToken);
	  });
	}).then(() => {
	  // A page redirect would suffice as the persistence is set to NONE.
	  //return firebase.auth().signOut();
	}).then(() => {
	  //window.location.assign('/dashboard/');
	});

    /*
    var url = '/signin/';
    var formData = $(form).serializeArray();

    $.post(url, formData).done(function (data) {
        if(data == 'error') {
            $("#wrong").text("Invalid Email or Password").show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
            $(".modal-body").show();
            $(".modal-content .spinner").hide();
        }
        else {
            window.location.replace("/dashboard/");
        }

    }).fail(function() {
        $(".modal-content .spinner").hide();
    	$(".modal-body").show();
    	$("#wrong").text("Something happend and could not log you in").show();
        setTimeout(function(){ $("#wrong").hide(); }, 3000);
  	});
  	*/
    return false;
}

/* --------------------------------------------------------------- */

function validateSignupData() {
	var firstname = $("#firstname").val(), lastname = $("#lastname").val(), username = $("#username").val(),
	confirm = $("#confirmation").val(), email = $("#email").val(), pass = $("#password").val(), tos=document.getElementById('customCheck1').checked;
    if(!validateEmail(email)) {
        return false;
    }
    if(pass.length <= 5) {
        return false;
    }
    if(lastname.length <= 3) {
        return false;
    }
    if(firstname.length <= 3) {
        return false;
    }
    if(username.length <= 5) {
        return false;
    }
    if(pass != confirm) {
        return false;
    }
    if(!tos) {
    	return false;
    }
    return true;
}
// submit the form data
function submitSignupForm(){
    $(".modal-body").hide();
    $(".modal-content .spinner").show();
    var form = $('#sign-up');
    var url = '/signup/';
    var formData = $(form).serializeArray();

    $.post(url, formData).done(function (data) {
        if(data == 'error') {
            $("#wrong").text("Could Not Register You").show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
            $(".modal-body").show();
            $(".modal-content .spinner").hide();
        }
        else {
        	var email = document.getElementById('email').value;
      		var password = document.getElementById('password').value;

      		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				$("#wrong").text(errorMessage).show();
		        setTimeout(function(){ $("#wrong").hide(); }, 3000);
		        $(".modal-body").show();
		        $(".modal-content .spinner").hide();
			}).then(user => {
			  // Get the user's ID token as it is needed to exchange for a session cookie.
			  return user.getIdToken().then(idToken => {
			    return postIdTokenToSessionLogin('/sessionLogin/', idToken);
			  });
			}).then(() => {
			  // A page redirect would suffice as the persistence is set to NONE.
			  return firebase.auth().signOut();
			}).then(() => {
			  //window.location.assign('/dashboard/');
			});

        }
    }).fail(function() {
        $(".modal-content .spinner").hide();
    	$(".modal-body").show();
    	$("#wrong").text("Something happend and could not register you").show();
        setTimeout(function(){ $("#wrong").hide(); }, 3000);
  	});
    return false;
}

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function postIdTokenToSessionLogin(url, id, csrf) {
	var data = {
		idToken: id
	}
	$.post(url, data).done(function (data) {
        if(data == 'UNAUTHORIZED REQUEST!') {
            $("#wrong").text("Invalid Session, Please Signin again").show();
            setTimeout(function(){ $("#wrong").hide(); }, 3000);
            $(".modal-body").show();
            $(".modal-content .spinner").hide();
        }
        else {
        	document.cookie = JSON.parse(data).cookie;
            //window.location.replace("/dashboard/");
        }

    }).fail(function() {
        $(".modal-content .spinner").hide();
    	$(".modal-body").show();
    	$("#wrong").text("Something happend and could not log you in").show();
        setTimeout(function(){ $("#wrong").hide(); }, 3000);
  	});
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}
function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}
/* --------------------------------------------------------------- */

function openTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
    $(".tablinks").css("border-color", "#ccc");
    evt.currentTarget.style.borderColor = "#02ccba #02ccba transparent #02ccba";
    if(tab == "signin") {
    	
    	$("#defaultClose").css({"border-bottom-color": "#02ccba"});
    }
    else {
    	$("#defaultOpen").css({"border-bottom-color": "#02ccba"});
    }
    $(".tabcontent").css({"border-color": "#ccc"});
    $("#"+tab).css({"border-color": "#02ccba"});
} 

