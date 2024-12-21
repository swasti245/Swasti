import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Get references to the form fields and buttons
const name = document.getElementById("name");
const institute = document.getElementById("institute");
const skills = document.getElementById("skills");
const designation = document.getElementById("designation");
const email = document.getElementById("email");
const password = document.getElementById("password");

const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

// Get Firebase Authentication and Realtime Database instances
const auth = getAuth();
const database = getDatabase();

// Sign in functionality
signInButton.addEventListener("click", function() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function(userCredential) {
      // Sign in successful, redirect the user to the protected resources page
      window.location.href = "/index.html";
    })
    .catch(function(error) {
      // Show an error message
      alert(error.message);
    });
});

// Sign up functionality
signUpButton.addEventListener("click", function() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(function(userCredential) {
      const userId = userCredential.user.uid;
      
      // Save user data to Firebase Realtime Database
      set(ref(database, 'users/' + userId), {
        name: name.value,
        institute: institute.value,
        skills: skills.value,
        designation: designation.value,
        email: email.value
      });

      // Sign up successful, redirect the user to the protected resources page
      window.location.href = "/protected-resources.html";
    })
    .catch(function(error) {
      // Show an error message
      alert(error.message);
    });
});
