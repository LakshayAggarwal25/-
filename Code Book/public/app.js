import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwFCYY_ytxffCzgal7eHWA8NkjCqzmLDE",
  authDomain: "code-book-fd505.firebaseapp.com",
  databaseURL: "https://code-book-fd505-default-rtdb.firebaseio.com",
  projectId: "code-book-fd505",
  storageBucket: "code-book-fd505.appspot.com",
  messagingSenderId: "370017341673",
  appId: "1:370017341673:web:bca53ea7bfd7bbd0b6a078"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();



let registerUser = document.querySelector("#submitBtnRegis");
if (registerUser) {
  registerUser.addEventListener("click", function () {
    let userName = document.querySelector("#new-user-name").value;
    let email = document.querySelector("#new-user-mail").value;
    let password = document.querySelector("#new-user-pass").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //
        const user = userCredential.user;

        //
        set(ref(db, 'users/' + user.uid), {
          username: userName,
          email: email,
        });
        //

        alert("User Created");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });

  })
}


let loginUser = document.querySelector("#submitBtnLogin");
if (loginUser) {
  loginUser.addEventListener("click", function () {
    let email = document.querySelector("#user-mail").value;
    let password = document.querySelector("#user-pass").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        location.href = 'home.html';

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

  })
}



let currentUser = document.querySelector("#current-user-name");
if (currentUser) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      get(ref(db, 'users/' + uid)).then((data) => {
        if (data.exists()) {
          currentUser.innerHTML = "Welcome, " + data.val().username;

          if (data.val().previous_canvas !== undefined) {
            var image = new Image();
            image.src = data.val().previous_canvas.image;
            image.onload = function () {
              tool.drawImage(image, 0, 0);
            }
          }
        }
      }).catch((error) => {
        alert(error.message);
      });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

}

let logOut = document.querySelector("#logout-btn");
if (logOut) {
  logOut.addEventListener("click", function () {
    signOut(auth).then(() => {
      location.href = 'index.html';
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      alert(error.message);
    });
  })
}


let saveCanvas = document.querySelector("#saveOnDB");
if (saveCanvas) {
  saveCanvas.addEventListener("click", function () {
    var canvasContents = board.toDataURL();
    var data = { image: canvasContents };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        update(ref(db, 'users/' + uid), {
          previous_canvas: data
        });
      } else {
        // User is signed out
        // ...
      }
    });
  })
}

let loadCanvas = document.querySelector("#getFromDB");
if (loadCanvas) {
  loadCanvas.addEventListener("click", function () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        get(ref(db, 'users/' + uid)).then((data) => {
          if (data.val().previous_canvas !== undefined) {
            var image = new Image();
            image.src = data.val().previous_canvas.image;
            image.onload = function () {
              tool.drawImage(image, 0, 0);
            }
          }
        }).catch((error) => {
          alert(error.message);
        });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  })
}