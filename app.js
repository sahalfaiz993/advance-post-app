// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore ,addDoc ,collection , getDocs ,doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {

  apiKey: "AIzaSyAtsHf_mRn4eAqPBsZT3eO6dIHilet2LvE",
  authDomain: "hackatone-5a5ec.firebaseapp.com",
  projectId: "hackatone-5a5ec",
  storageBucket: "hackatone-5a5ec.appspot.com",
  messagingSenderId: "951760425437",
  appId: "1:951760425437:web:b26c41c2447900c272e634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
  
var btn = document.getElementById("add")
btn.addEventListener('click',async() => {
 let  pic = document.getElementById("picture").files[0]
        
const storageRef = ref(storage, "hi");
const uploadTask = uploadBytesResumable(storageRef, pic);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      var productName = document.getElementById("name").value;
  var productPrice = document.getElementById("price").value;
  var productDescription = document.getElementById("description").value;
      var pic = document.getElementById("picture").files[0]
  
      try {
          const docRef = await addDoc(collection(db, "users"), {
            name: productName,
            price: productPrice,
            description: productDescription,
            picture:downloadURL,
          })
          window.location.reload()
console.log(docRef);
console.log("Document written with ID: ", docRef.id);
        }catch (e) {
            console.error("Error adding document: ", e);
        }
      
    });
  }
);

    } 
)
var contai =document.querySelector(".post")
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
   contai.innerHTML+=`
   <h1 id="title">Title:${doc.data().name}</h1>
   <h1 id="title">price:${doc.data().price}</h1>
   <h1 id="title">description:${doc.data().description}</h1>
   <img width="100px" height="100px" src="${doc.data().picture}"alt="">
   <button onclick="delet('${doc.id}')">Delete</button>
   <button onclick="upd('${doc.id}')">update</button>

   `
});

async function delet(id){
  await deleteDoc(doc(db, "users", id));
  window.location.reload()
}
window.delet = delet