// Main Code 
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// // Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// // Handle Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

//   // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
//     // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("displayName", user.displayName || "No Name Provided");
    localStorage.setItem("email", user.email || "No Email Provided");

//     // Notify success and redirect to index.html
    alert('Login successful!');
    window.location.href = 'index.html';
    //window.location.href = 'test.html';

  } catch (error) {
    // Handle login errors
    console.error("Error logging in:", error.message);
    alert(error.message);
  }
});


// For testing
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
//     authDomain: "skillmatch-act.firebaseapp.com",
//     projectId: "skillmatch-act",
//     storageBucket: "skillmatch-act.appspot.com",
//     messagingSenderId: "194495863137",
//     appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Login Form
// const loginForm = document.getElementById("loginForm");
// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // User is signed in
//             const user = userCredential.user;

//             // Store the user's displayName in localStorage
//             localStorage.setItem("displayName", user.displayName || "No Name Provided");

//             // Redirect to the test page
//             window.location.href = "test.html";
//         })
//         .catch((error) => {
//             console.error("Error during login:", error.message);
//         });
// });

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
//   authDomain: "skillmatch-act.firebaseapp.com",
//   projectId: "skillmatch-act",
//   storageBucket: "skillmatch-act.appspot.com",
//   messagingSenderId: "194495863137",
//   appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Login Form
// const loginForm = document.getElementById("loginForm");
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User is signed in
//       const user = userCredential.user;

//       // Store the user's displayName and email in localStorage
//       localStorage.setItem("displayName", user.displayName || "No Name Provided");
//       localStorage.setItem("email", user.email || "No Email Provided");

//       // Redirect to the test page
//       window.location.href = "index.html";
//     })
//     .catch((error) => {
//       console.error("Error during login:", error.message);
//     });
// });