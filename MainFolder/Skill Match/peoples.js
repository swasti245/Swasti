import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function fetchUsers() {
  try {
    const usersCollection = collection(db, "users"); 
    const userDocs = await getDocs(usersCollection);
    const users = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderUserProfiles(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


function renderUserProfiles(users) {
  const container = document.getElementById("container");

  users.forEach(user => {
  
    const profileBox = document.createElement("div");
    profileBox.className = "profile-box";

    profileBox.innerHTML = `
      <img src="${user.profilePhoto || 'https://via.placeholder.com/80'}" alt="Profile Photo" class="profile-photo">
      <div class="profile-name">${user.fullName || "Name Not Provided"}</div>
      <div class="profile-designation">${user.designation || "Designation Not Provided"}</div>
      <div class="profile-institute">${user.institute || "Institute Not Provided"}</div>
      <div class="email"><strong>Email Id: </strong>${user.email || "Email Not Provided"}</div>
      <div class="profile-skills">
        <h3>Skills</h3>
        <p>${Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || "No Skills Provided"}</p>
      </div>
      <div class="availability"><strong>Status: </strong>${user.availabilityStatus || "Unknown"}</div>
      <div class="profile-projects">Projects Done: ${user.projectsDone || "0"}</div>
      <a href="${user.profileLink || '#'}" class="view-more-btn">View More</a>
    `;

    
    container.appendChild(profileBox);
  });
}
fetchUsers();
