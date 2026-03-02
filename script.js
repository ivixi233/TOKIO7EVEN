let tracks = [];
let news = [
  {title: "Добро пожаловать на TOKIO7EVEN!", text: "Это новости сайта.", image: "https://via.placeholder.com/300x150"}
];

// Навигация
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(item.dataset.page).classList.add('active');
    if(item.dataset.page==='player-tab') renderPlayerTracks();
  });
});

// Логин
const loginModal = document.getElementById('login-modal');
document.getElementById('admin-login-btn').addEventListener('click', ()=>{loginModal.style.display='flex';});
document.getElementById('close-login').addEventListener('click', ()=>{loginModal.style.display='none';});
document.getElementById('login-submit').addEventListener('click', ()=>{
  const login=document.getElementById('login').value;
  const password=document.getElementById('password').value;
  if(login==='FHJGYUDHGB' && password==='tokkkkioasd'){
    loginModal.style.display='none';
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('admin-panel').classList.add('active');
    renderAdminTracks();
  }else{document.getElementById('login-error').innerText="Неверный логин или пароль";}
});

// Добавление трека админом
document.getElementById('add-track').addEventListener('click', ()=>{
  const title=document.getElementById('new-track-title').value;
  const audio=document.getElementById('new-track-audio').value;
  if(title && audio){
    tracks.push({title, audio, rating:null});
    document.getElementById('new-track-title').value='';
    document.getElementById('new-track-audio').value='';
    renderAdminTracks();
  }
});

// Отображение треков пользователю
function renderTracks(){
  const list=document.getElementById('track-list'); list.innerHTML='';
  tracks.filter(t=>t.rating!==null).forEach(t=>{
    const div=document.createElement('div'); div.className='track';
    div.innerHTML=`${t.title} [${t.rating} ⭐] <button onclick="playAudio('${t.audio}')">▶️</button>`;
    list.appendChild(div);
  });
}

// Плеер с оценкой
function renderPlayerTracks(){
  const list=document.getElementById('player-track-list'); list.innerHTML='';
  tracks.filter(t=>t.rating!==null).forEach(t=>{
    const div=document.createElement('div'); div.className='track';
    div.innerHTML=`${t.title} [${t.rating} ⭐] <button onclick="playAudio('${t.audio}')">▶️</button>`;
    list.appendChild(div);
  });
}

// Аудио
function playAudio(url){const audio=new Audio(url); audio.play();}

// Новости
function renderNews(){
  const list=document.getElementById('news-list'); list.innerHTML='';
  news.forEach(n=>{
    const div=document.createElement('div'); div.className='news-item';
    div.innerHTML=`<h4>${n.title}</h4><p>${n.text}</p>${n.image?`<img src="${n.image}" />`:''}`;
    list.appendChild(div);
  });
}

// Админ: оценка треков
function renderAdminTracks(){
  const list=document.getElementById('admin-track-list'); list.innerHTML='';
  tracks.filter(t=>t.rating===null).forEach((t,i)=>{
    const div=document.createElement('div'); div.className='admin-track';
    div.innerHTML=`${t.title} 
      <select id="rating-${i}">
        <option value="">Оценить</option>
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="5">5 ⭐</option>
      </select>
      <button onclick="submitRating(${i})">Оценить</button>`;
    list.appendChild(div);
  });
}

function submitRating(i){
  const rating=document.getElementById(`rating-${i}`).value;
  if(rating){tracks[i].rating=rating; renderAdminTracks(); renderTracks();}
}

// Добавление новости
document.getElementById('publish-news').addEventListener('click', ()=>{
  const title=document.getElementById('news-title').value;
  const text=document.getElementById('news-text').value;
  const image=document.getElementById('news-image').value;
  if(title && text){
    news.push({title,text,image});
    renderNews();
    document.getElementById('news-title').value='';
    document.getElementById('news-text').value='';
    document.getElementById('news-image').value='';
  }
});

// Инициализация
renderTracks();
renderNews();
