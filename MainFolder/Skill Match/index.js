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

// Monitor authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
  
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

       
        localStorage.setItem("userName", userData.fullName);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userDesignation", userData.designation);
        localStorage.setItem("userInstitute", userData.institute);
        localStorage.setItem("userSkill", userData.skills);
        localStorage.setItem("availabilityStatus", userData.availabilityStatus);

        
        document.getElementById("name").textContent =
          userData.fullName || "Name Not Available";
        document.getElementById("institute").textContent =
          userData.institute || "Institute Not Available";
        document.getElementById("designation").textContent =
          userData.designation || "Designation Not Available";
        document.getElementById("skill").textContent =
          userData.skills || "Skills Not Available";
        document.getElementById("email").textContent =
          userData.email || "Email Not Available";
      } else {
        console.error("No user data found in Firestore.");
        document.getElementById("name").textContent = "No Data Found";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    
    document.getElementById("name").textContent = "Not Logged In";
    document.getElementById("institute").textContent = "";
    document.getElementById("designation").textContent = "";
    document.getElementById("skill").textContent = "";
    document.getElementById("email").textContent = "";
  }
})


  

const profileButton= document.getElementById('profileButton');
profileButton.addEventListener('submit', async (event) => {
  event.preventDefault();


  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const designation = document.getElementById('designation').value;
  const institute = document.getElementById('institute').value;
  const skill = document.getElementById('skill').value;

  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, name, designation, institute, skill);
    const user = userCredential.user;

    localStorage.setItem("displayName", user.displayName || "No Name Provided");
    localStorage.setItem("displayEmail", user.email || "No Email Provided");
    localStorage.setItem("displayDesignation", user.designation || "No Designation Provided");
    localStorage.setItem("displayInstitute", user.institute || "No Institute Provided");
    localStorage.setItem("displaySkill", user.skill || "No Skill Provided");
   
    
    window.location.href = 'profile_page2.html';
    

  } catch (error) {
    
    console.error("Error logging in:", error.message);
    alert(error.message);
  }
});


