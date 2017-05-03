var currentUser;
var googleProvider;
setInterval(function(){
	if(currentUser){
		var logoutbtn = $(".Logout");
		logoutbtn.show();
		var loginbtns = $(".Login");
		loginbtns.hide();
	}else{
		var logoutbtn = $(".Logout");
		logoutbtn.hide();
		var loginbtns = $(".Login");
		loginbtns.show();
	}
},100);
function initApp(){
	// Result from Redirect auth flow.
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          currentUser = firebase.auth().currentUser;
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          alert("Signed out");
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
}
function signInWithGoogle(){
	googleProvider = new firebase.auth.GoogleAuthProvider();
	googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
	firebase.auth().signInWithPopup(googleProvider);
}
function signOut(){
	firebase.auth().signOut().then(function() {
		location.reload();
	}).catch(function(error) {
	  // An error happened.
		console.log(error);
		alert("Somehow you screwed up logging out.");
	});
}
window.onload = function(){
	initApp();
};
