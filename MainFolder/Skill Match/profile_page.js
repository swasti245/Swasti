import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { signUpButton } from "sigignup.js";  // Import the signUpButton from signup.js
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Load user profile information
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("user-name").textContent = userData.fullName || "Name Not Available";
        document.getElementById("designation").textContent = userData.designation || "Designation Not Available";
        document.getElementById("institute").textContent = userData.institute || "Institute Not Available";
        document.getElementById("default-skill").textContent = userData.skills || "Skills Not Available";
        document.getElementById("email").textContent = userData.email || "Email Not Available";
      } else {
        console.error("No user data found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
});

let userCredentials = [];
getuserCredentials();
function getuserCredentials(){
  const userCredentials = localStorage.getItem("userCredentials");
    userCredentials = JSON.parse(userCredentials);
  }

function displayUserCredentials(){
  let userCredentials = getuserCredentials();
  const userCredentialsList = document.getElementById("user-info");
  userCredentialsList.innerHTML = "";
  userCredentials.forEach((userCredentials) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2 id="user-name">${userCredentials.fullName}</h2>
        <p id="designation">${userCredentials.designation}</p>
        <p id="institute">${userCredentials.institute}</p>
        <div class="email">${userCredentials.email}</div>
        <p id="default-skill">${userCredentials.skills}</p>
        <div class="availability">
          <span>Availablility Status </span>
          <label class="toggle-switch">
            <input type="checkbox" id="availability-toggle">
            <span class="slider"></span>
          </label>`;
    userCredentialsList.appendChild(li);
  });
}

window.onload = function(){displayUserCredentials();};

