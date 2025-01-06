
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdftGzRbm_sOtbKSwivEVpNyaXVA4nzjc",
  authDomain: "skillmatch-act.firebaseapp.com",
  projectId: "skillmatch-act",
  storageBucket: "skillmatch-act.appspot.com",
  messagingSenderId: "194495863137",
  appId: "1:194495863137:web:7fcd7ab7149aa6a7700d20"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to handle file upload
async function uploadFile(file) {
  const fileRef = ref(storage, `uploads/${file.name}`); // Define storage path
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload Progress: ${progress}%`);
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        resolve(downloadURL);
      }
    );
  });
}

// Handle form submission
document.getElementById("postButton").addEventListener("click", async (event) => {
  event.preventDefault();

  const projectTitle = document.getElementById("project_title").value.trim();
  const description = document.getElementById("project_description").value.trim();
  const projectMode = document.getElementById("projectMode").value;
  const projectCategory = document.getElementById("projectCategory").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const projectLink = document.getElementById("project_link").value.trim();
  const fileInput = document.getElementById("fileId");
  const files = fileInput.files;

  try {
    let fileURLs = [];

    // Upload all selected files
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileURL = await uploadFile(files[i]);
        fileURLs.push(fileURL);
      }
    }

    // Save project details to Firestore
    const uniqueId = `project_${Date.now()}`; // Generate unique ID
    await setDoc(doc(db, "project_details", uniqueId), {
      projectTitle,
      description,
      projectMode,
      projectCategory,
      startDate,
      endDate,
      projectLink,
      fileURLs, // Array of uploaded file URLs
      createdAt: new Date().toISOString(),
    });

    alert("Project posted successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error saving project:", error.message);
    alert(`Error: ${error.message}`);
  }
});
