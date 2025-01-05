
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export const signUpButton = document.getElementById("authForm");
signUpButton.addEventListener("submit", async (event) => {
  event.preventDefault();

  
  const fullName = document.getElementById("rName").value;
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const designation = document.getElementById("rDesignation").value;
  const institute = document.getElementById("rInstitute").value;
  const skills = document.getElementById("rSkills").value;

  try {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      designation,
      institute,
      skills,
      createdAt: new Date().toISOString()
    });

   
    alert("User signed up successfully!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
});



// import {
//   getFirestore,
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
// } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// // Initialize Firestore
// // const db = getFirestore();

// // Function to add `availabilityStatus` to all documents in a collection
// async function addAvailabilityStatusToAllDocs() {
//   const collectionName = "users"; // Replace with your collection name
//   const newField = { availabilityStatus: "Unavailable" }; // Default value

//   try {
//     const querySnapshot = await getDocs(collection(db, collectionName));

//     // Iterate over each document and update it
//     const updates = querySnapshot.docs.map((docSnapshot) => {
//       const docRef = doc(db, collectionName, docSnapshot.id);
//       return updateDoc(docRef, newField);
//     });

//     await Promise.all(updates); // Wait for all updates to complete
//     console.log("All documents updated with availabilityStatus.");
//   } catch (error) {
//     console.error("Error updating documents:", error);
//   }
// }

// // Call the function
// addAvailabilityStatusToAllDocs();

