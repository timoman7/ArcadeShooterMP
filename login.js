var currentUser;
var credential;
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
function signOut(){
	firebase.auth().signOut().then(function() {
	  alert("Signed out.");
		location.reload();
	}).catch(function(error) {
	  // An error happened.
		console.log(err0r);
		alert("Somehow you screwed up logging out.");
	});
}
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		//Already logged in
		currentUser = firebase.auth().currentUser;
	}else{
		firebase.auth().getRedirectResult().then(function(result) {
			//Log in
			var user = result.user;
			var credential = result.credential;
			if(user===null){
				//User is null after redirect
				alert("Something went wrong");
			}else{
				//User is defined after redirect
				currentUser = firebase.auth().currentUser;
			}
		}, function(error) {
			// The provider's account email, can be used in case of
			// auth/account-exists-with-different-credential to fetch the providers
			// linked to the email:
			var email = error.email;
			// The provider's credential:
			var credential = error.credential;
			// In case of auth/account-exists-with-different-credential error,
			// you can fetch the providers using this:
			console.log(error);

		});
	}
});
function signInWithGoogle(){
	var googleProvider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(googleProvider);
}
