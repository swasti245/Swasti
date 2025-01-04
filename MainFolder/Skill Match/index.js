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

// Monitor authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetch user data from Firestore
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        
        // Update the page with user data
        document.getElementById("name").textContent = userData.fullName || "Name Not Available";
        document.getElementById("institute").textContent = userData.institute || "Institute Not Available";
        document.getElementById("designation").textContent = userData.designation || "Designation Not Available";
        document.getElementById("skill").textContent = userData.skills || "Skills Not Available";
        document.getElementById("email").textContent = userData.email || "Email Not Available";
      } else {
        console.error("No user data found in Firestore.");
        document.getElementById("name").textContent = "No Data Found";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    // User is not signed in
    document.getElementById("name").textContent = "Not Logged In";
    document.getElementById("institute").textContent = "";
    document.getElementById("designation").textContent = "";
    document.getElementById("skill").textContent = "";
    document.getElementById("email").textContent = "";
  }
});
