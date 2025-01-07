import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase Configuration
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

// Monitor authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    try {
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Populate the HTML with user data
        document.getElementById("profileName").textContent =
          userData.fullName || "Name Not Available";
        document.getElementById("profileInstitute").textContent =
          userData.institute || "Institute Not Available";
        document.getElementById("profileDesignation").textContent =
          userData.designation || "Designation Not Available";
        document.getElementById("profileSkill").textContent =
          userData.skills || "Skills Not Available";
        document.getElementById("profileEmail").textContent =
          userData.email || "Email Not Available";
      } else {
        console.error("No user document found for this UID.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  } else {
    console.log("No user is signed in.");
    // Clear profile page fields
    document.getElementById("profileName").textContent = "Not Logged In";
    document.getElementById("profileInstitute").textContent = "";
    document.getElementById("profileDesignation").textContent = "";
    document.getElementById("profileSkill").textContent = "";
    document.getElementById("profileEmail").textContent = "";
  }
});

// Example placeholder for adding or modifying pictures (replace with real logic)
function addPicture() {
  console.log("Add Picture clicked.");
}

function removePicture() {
  console.log("Remove Picture clicked.");
}

function importPicture() {
  console.log("Import Picture clicked.");
}

function editProfile() {
  console.log("Edit Profile clicked.");
}

function openSettings() {
  console.log("Settings clicked.");
}

function signOut() {
  console.log("Sign Out clicked.");
}
