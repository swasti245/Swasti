
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmaAbTpVE3ugksgK5f-lPP2f7EvEV6drg",
  authDomain: "skill-match-e7cdf.firebaseapp.com",
  databaseURL: "https://skill-match-e7cdf-default-rtdb.firebaseio.com",
  //https://console.firebase.google.com/u/0/project/skill-match-e7cdf/database/skill-match-e7cdf-default-rtdb/data/~2F
  //https://skill-match-e7cdf-default-rtdb.firebaseio.com/
  projectId: "skill-match-e7cdf",
  storageBucket: "skill-match-e7cdf.firebasestorage.app",
  messagingSenderId: "53167329438",
  appId: "1:53167329438:web:065f1303c4f83b3acb2b8f",
  measurementId: "G-ZJHMT42DSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
   
   
    const messageDiv = document.getElementById('message')
    messageDiv.innerHTML = message
}

const signup = document.getElementById('signUpButton')
signup.addEventListener('click', (event)=>{
    event.preventDefault();
    
    const name = getElementById('rName').value
    const designation = getElementById('rDesignation').value
    const institute = getElementById('rInstitute').value
    const skills = getElementById('rSkills').value
    const email = getElementById('rEmail').value    
    const password = getElementById('rPassword').value 
    
    
    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            name: name,
            designation:designation,
            institute: institute,

        };

        showMessage('User created successfully', 'signUpMessage')
        const docRef = doc(db, 'users', user.uid)
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href = 'index.html';
        })  
        .catch((error)=>{
            console.error('Error writing document: ', error);
        })
        .catch((error)=>{
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use'){
                showMessage('Email already in use', 'signUpMessage')
            }
            else{
                showMessage('Unable to create user', 'signUpMessage')
            }
        })

    })

    const login = document.getElementById('loginButton')
    login.addEventListener('click', (event)=>{
        event.preventDefault();
        const email = getElementById('name').value
        const password = getElementById('password').value
        const auth = getAuth()
        System.Windows.Forms.MessageBox.Show("login attempted");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            showMessage('User logged in successfully', 'loginMessage')
            window.location.href = 'index.html';
        })

    
})
    
})
