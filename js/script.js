const projects = {
  "1": { 
    title: "OpenGov API Worker", 
    desc: "During my Data Analyst internship at City of Springfield, I built a 14-script Python program to automate city data extraction from the OpenGov API. This pipeline extracted, transformed, and loaded municipal data to improve the data reporting process. This project is how I learned the way real APIs work, rather than any classroom controlled API. This was a rough experience at the start, as I didn't understand exactly how to pull from the API effectively. As time went on, I discovered a lot of tricks that helped me improve efficiency, while still gathering all of the correct data. ", 
    btnText: "View on GitHub",
    github: "NA",
    image: "media/project1.png" 
  },
  "2": { 
    title: "Hello Kitty Island Adventure Companion App", 
    desc: "My first HTML based project! This app is a simple web application that allows users to track and manage their daily activities and tasks effectively. Also contains a Supabase backend for data storage, such as saving user progress, preferences, and changelog information.", 
    github: "hkiac/index.html",
    btnText: "Open Website",
    image: "media/project2.png" 
  },
  "3": { 
    title: "AI Statistical Analysis Tool", 
    desc: "For this project, I was a helper on improving the UI. I minimalized the design to be easier on the eyes and added a phase-based plot for better visualization. There were even a few errors within the code that I was able to fix, such as the randomization test printing too many outputs and the multiple baseline analysis type causing the entire program to error out. Beyond this, I also adjusted the size of a few elements, added more explanation to the sidebar, and separated the app into three sections for better readability.", 
    btnText: "View on GitHub",
    github: "NA",
    image: "media/project3.png" 
  },
  "4": { 
    title: "Stickman: The Rhythm Warrior - Unity Game", 
    desc: "A 2D rhythm platformer Stickman fighting game that has you fight through multiple worlds to the beat of a song. This project was for my Game Design class and took a lot of time and effort to put together. A bunch of the scripting was done by me, as well as a lot of the Unity work. I also added custom assembly definitions to shorten compile times. The rest was done by the two other people I collaborated with. The game came out pretty well and you could see a trailer that showcases the gameplay a bit below!", 
    btnText: "View on GitHub",
    github: "https://github.com/Lakatria/RhythmWarrior",
    image: "media/project4.png",
    youtube: "https://www.youtube.com/embed/ctNe3rScuZU?si=SnJZVZJwQs1pxxbh"
  }
};

const header = document.getElementById('header');
const mainContent = document.getElementById('main-content');
const overlay = document.getElementById('overlay');
const titleEl = document.getElementById('overlay-title');
const descEl = document.getElementById('overlay-desc');
const githubEl = document.getElementById('overlay-github');
const videoContainer = document.getElementById('overlay-video-container');
const iframeEl = document.getElementById('overlay-iframe');
const imgEl = document.getElementById('overlay-img');
const backToProjectsBtn = document.getElementById('back-to-projects');

const aboutBtn = document.getElementById('about-btn');
const aboutOverlay = document.getElementById('about-overlay');
const backFromAboutBtn = document.getElementById('back-from-about');
const cascadeTexts = document.querySelectorAll('.cascade-text');

let currentCard = null;

document.querySelectorAll('.project-card').forEach(card => {
  const id = card.getAttribute('data-id');
  card.style.backgroundImage = `url('${projects[id].image}')`;
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    currentCard = card;
    
    const id = card.getAttribute('data-id');
    const data = projects[id];
    
    overlay.classList.add('active');
    
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    
    if (data.youtube) {
      iframeEl.src = data.youtube;
      videoContainer.style.display = 'block';
    } else {
      videoContainer.style.display = 'none';
      iframeEl.src = '';
    }

    if (data.github === "NA") {
      githubEl.removeAttribute('href');
      githubEl.textContent = "GitHub link not available.";
      githubEl.style.cssText = "background: transparent; color: #ef4444; padding: 0; pointer-events: none;";
    } else {
      githubEl.href = data.github;
      githubEl.textContent = data.btnText;
      githubEl.style.cssText = "";
    }

    imgEl.src = data.image;

    document.body.style.overflow = 'hidden'; 
  });
});

function closeProject() {
  if(!currentCard) return;
  
  overlay.classList.remove('active');
  
  iframeEl.src = '';
  document.body.style.overflow = ''; 
}


function openAboutMe() {
  header.classList.add('fade-out');
  mainContent.classList.add('fade-out');

  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    aboutOverlay.classList.add('active');
    cascadeTexts.forEach(el => {
      el.classList.remove('cascade-text');
      void el.offsetWidth;
      el.classList.add('cascade-text');
    });
  }, 400);
}

function closeAboutMe() {
  aboutOverlay.classList.remove('active');

  document.body.style.overflow = '';

  setTimeout(() => {
    header.classList.remove('fade-out');
    mainContent.classList.remove('fade-out');
  }, 500);
}


backToProjectsBtn.addEventListener('click', closeProject);
aboutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openAboutMe();
});
backFromAboutBtn.addEventListener('click', closeAboutMe);