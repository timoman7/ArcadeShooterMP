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
	googleProvider = new firebase.auth.GoogleAuthProvider();
	googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
	firebase.auth().getRedirectResult().then(function(result) {
		//Log in
		var user = result.user;
		var credential = result.credential;
		if(user===null){
			//User is null after redirect
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
	firebase.auth().onAuthStateChanged(function(user) {
		console.log(user);
		if(user){
			//Already logged in
			currentUser = firebase.auth().currentUser;
		}else{

		}
	},function(err){
		console.log(err);
	});
}
function signInWithGoogle(){
	firebase.auth().signInWithRedirect(googleProvider);
}
function signOut(){
	firebase.auth().signOut().then(function() {
	  alert("Signed out.");
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
