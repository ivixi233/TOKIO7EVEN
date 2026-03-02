import { auth, db, storage } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const authBtn = document.getElementById("authSection");

if(authBtn){
authBtn.onclick = ()=>{
  const email = prompt("Email:");
  const pass = prompt("Password:");
  signInWithEmailAndPassword(auth,email,pass);
};
}

onAuthStateChanged(auth,user=>{
  if(user){
    document.getElementById("adminPanel")?.style.display="block";
    document.getElementById("newsAdmin")?.style.display="block";
  }
});

const uploadBtn = document.getElementById("upload");
if(uploadBtn){
uploadBtn.onclick = async ()=>{
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const file = document.getElementById("file").files[0];

  const storageRef = ref(storage,"tracks/"+file.name);
  await uploadBytes(storageRef,file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db,"tracks"),{
    title,
    artist,
    url,
    score:0
  });

  location.reload();
};
}

async function loadTracks(){
  const snap = await getDocs(collection(db,"tracks"));
  const container = document.getElementById("tracks");
  if(!container) return;

  snap.forEach(doc=>{
    const data = doc.data();
    container.innerHTML += `
      <div class="card track">
        <div>
          <h3>${data.title}</h3>
          <p>${data.artist}</p>
          <audio controls src="${data.url}"></audio>
        </div>
        <div>${data.score}</div>
      </div>
    `;
  });
}

loadTracks();