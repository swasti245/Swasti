import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

// Fetch and display student data
async function fetchStudentData() {
  const tableBody = document.getElementById("student-table");
  try {
    // Fetch documents from the 'users' collection
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const user = doc.data();

      // Ensure fields exist and are properly handled
      const fullName = users.fullName || "N/A";
      const institute = users.institute || "N/A";
      const skills = users.skills || "N/A";

      // Create a new row for each student
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${fullName}</td>
        <td>${institute}</td>
        <td>${skills}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
}

// Call the function to fetch and display data
fetchStudentData();
