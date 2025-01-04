// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Handle Sign Up
const signUpButton = document.getElementById("authForm");
signUpButton.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("rName").value;
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const designation = document.getElementById("rDesignation").value;
  const institute = document.getElementById("rInstitute").value;
  const skills = document.getElementById("rSkills").value;

  try {
    // Register user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      designation,
      institute,
      skills,
      createdAt: new Date().toISOString()
    });

    // Notify success and redirect
    alert("User signed up successfully!");
    window.location.href = "login.html";
  } catch (error) {
    // Handle errors
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
});
