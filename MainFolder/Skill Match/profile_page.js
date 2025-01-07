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


const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    try {
     
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        
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
        document.getElementById ("availability").checked = userData.availabilityStatus;
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






function initializeAvailabilityStatus() {
  const availability = document.getElementById("availability-toggle");

 
  const savedStatus = localStorage.getItem("availabilityStatus");
  
  
  if (savedStatus === "true") {
    availability.checked = true;
  } else {
    availability.checked = false;
  }


  availability.addEventListener("change", () => {
    const currentStatus = availability.checked;
    localStorage.setItem("availabilityStatus", currentStatus);
    console.log("Availability Status updated to:", currentStatus);
  });
}


document.addEventListener("DOMContentLoaded", initializeAvailabilityStatus);







