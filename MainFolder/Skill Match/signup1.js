import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import {doc, getDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// // Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

signUpButton.addEventListener("click", (event) => {
  event.preventDefault();
  const fullName = document.getElementById("rName").value.trim();
  const email = document.getElementById("rEmail").value.trim();
  const password = document.getElementById("rPassword").value.trim();
  const designation = document.getElementById("rDesignation").value.trim();
  const institute = document.getElementById("rInstitute").value.trim();
  const skills = document.getElementById("rSkills").value.trim();

  const docRef = doc(db, email, password);
  const docSnap = await getDoc(docRef);
  try {
    if (
      !fullName ||
      !email ||
      !password ||
      !designation ||
      !institute ||
      !skills
    ) {
      alert("Please fill out all fields.");
      return;
    }
   if (docSnap.exists()){
    alert("User created successfully! Redirecting to login page...");
    window.location.href = "signup.html";
   }else{
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;

        // Save additional user details in Firestore
        return (
          setDoc(doc(db, "users", user.uid)),
          {
            fullName,
            email,
            designation,
            institute,
            skills,
          }
        );
      }
    );
    alert("User created successfully! Redirecting to login page...");
    window.location.href = "login.html";
  } }catch (error) {
    console.error("Error during sign-up:", error.message);
    alert(error.message);
  }
});
