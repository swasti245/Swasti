// Import the Firebase SDK (if using modules)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmaAbTpVE3ugksgK5f-lPP2f7EvEV6drg",
  authDomain: "skill-match-e7cdf.firebaseapp.com",
  //databaseURL: "https://console.firebase.google.com/u/0/project/skill-match-e7cdf/database",
  projectId: "skill-match-e7cdf",
  storageBucket: "skill-match-e7cdf.firebasestorage.app",
  messagingSenderId: "53167329438",
  appId: "1:53167329438:web:065f1303c4f83b3acb2b8f"
 // measurementId: "G-ZJHMT42DSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Write data to Firebase
function writeData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email
  })
  .then(() => {
    console.log('Data written successfully!');
  })
  .catch((error) => {
    console.error('Error writing data:', error);
  });
}

// Read data from Firebase
function readData(userId) {
  const userRef = ref(database, 'users/' + userId);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log('User data:', snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error('Error reading data:', error);
    });
}

// Listen for real-time updates
function listenToChanges(userId) {
  const userRef = ref(database, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log('Real-time update:', snapshot.val());
    } else {
      console.log('No data available');
    }
  });
}

// Usage example
writeData('user1', 'John Doe', 'john.doe@example.com');
readData('user1');
listenToChanges('user1');