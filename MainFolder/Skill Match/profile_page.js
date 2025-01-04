import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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


// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// const firebaseConfig = {
//   apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
//   authDomain: "skillmatch-act.firebaseapp.com",
//   projectId: "skillmatch-act",
//   storageBucket: "skillmatch-act.appspot.com",
//   messagingSenderId: "194495863137",
//   appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Function to update the UI with user data
// const updateUserInfo = (userData) => {
//   // Update HTML elements with Firestore data
//   document.getElementById("user-name").textContent = userData.fullName || "Name Not Available";
//   document.getElementById("designation").textContent = userData.designation || "Designation Not Available";
//   document.getElementById("institute").textContent = userData.institute || "Institute Not Available";
//   document.getElementById("default-skill").textContent = Array.isArray(userData.skills) 
//     ? userData.skills.join(", ") 
//     : userData.skills || "Skills Not Available";
//   document.getElementById("email").textContent = userData.email || "Email Not Available";
// };

// // Monitor the authentication state
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     try {
//       // Fetch user document from Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);
      
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         console.log("User data retrieved from Firestore:", userData);
        
//         // Update the UI with user data
//         updateUserInfo(userData);
//       } else {
//         console.error("No user data found in Firestore for UID:", user.uid);
//       }
//     } catch (error) {
//       console.error("Error fetching user data from Firestore:", error);
//     }
//   } else {
//     console.log("User is not signed in.");
//   }
// });
