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