// Global variables and elements (Pichle waale code se same)
let currentPage = 1;
const totalPages = 5;
const allowedNames = ['srija', 'trishala'];
let recipientName = 'SRIJA'; // Default name

const music = document.getElementById('bg-music');
const video = document.getElementById('birthday-video');

// --- Utility: Page Navigation (Same as before) ---
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    document.getElementById(`page-${currentPage}`).classList.remove('active');
    
    if (currentPage === 4) {
        music.pause();
        music.currentTime = 0; 
    }

    currentPage = pageNumber;
    document.getElementById(`page-${currentPage}`).classList.add('active');

    if (currentPage === 2) {
        startPage2Animation(recipientName);
    } else if (currentPage === 3) {
        setTimeout(showPage3Blocks, 100);
    } else if (currentPage === 4) {
        music.play().catch(e => console.log('Music autoplay failed.', e));
        startPhotoCarousel();
    } else if (currentPage === 5) {
        video.play().catch(e => console.log('Video autoplay failed.', e));
    }
}


// --- Page 1 Logic (Login) --- (Same as before)
document.getElementById('login-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('name-input');
    const msgElement = document.getElementById('login-msg');
    const enteredName = nameInput.value.trim().toLowerCase();

    if (allowedNames.includes(enteredName)) {
        recipientName = enteredName.toUpperCase();
        msgElement.textContent = `Welcome, ${recipientName}! Opening your surprise...`;
        msgElement.classList.remove('error');
        setTimeout(() => goToPage(2), 1500);
    } else {
        msgElement.textContent = 'Aree...Naam toh Sahi daalo';
        msgElement.classList.add('error');
        nameInput.value = '';
    }
});


// --- Page 2 Logic (FIXED Animation) ---
const WISH_TEXT = "HAPPY BIRTHDAY "; 
const balloonContainer = document.getElementById('balloon-container');

// Balloon Creation and Animation (Same as before)
function createBalloon(color, delay) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.backgroundColor = color;
    balloon.style.left = `${Math.random() * 80 + 10}%`;
    
    // Set up balloon animation (using a fixed name for simplicity)
    const floatDuration = 5; 
    balloon.style.animation = `floatUp ${floatDuration}s linear forwards`;
    balloon.style.animationDelay = `${delay}s`;
    
    // Keyframes for floatUp (Yeh CSS mein nahi hai, isliye agar zaroori ho toh CSS mein add kar dena)
    // Maine मान लिया hai ki tumne floatUp @keyframes styles.css mein daal diya hai

    // Burst Logic 
    setTimeout(() => {
        balloon.classList.add('pop');
    }, (floatDuration - 1) * 1000 + delay * 1000); 

    balloonContainer.appendChild(balloon);
}


function startPage2Animation(name) {
    balloonContainer.innerHTML = '';
    const finalWish = WISH_TEXT + name;
    const messageArea = document.getElementById('message-area');
    messageArea.innerHTML = '';

    // Balloons start
    createBalloon('#f7574a', 0.5);
    createBalloon('#7a69ff', 1.5);
    createBalloon('#4af7c7', 2.5);

    let rollInStartDelay = 2500; // Balloons ke pop hone ke baad, 2.5 seconds
    
    // 1. Text Roll-in
    finalWish.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add('letters', 'letter');
        
        // Har letter ko roll-in class thoda delay se do
        setTimeout(() => {
            span.classList.add('roll-in');
        }, rollInStartDelay + index * 100); // 100ms ka gap

        messageArea.appendChild(span);
    });
    
    // 2. Falling Letters Animation (7 seconds baad)
    const totalRollInTime = finalWish.length * 100 + 600; // Total time for all letters to roll in
    const fallDelay = 7000; // Overall 7 seconds delay
    
    setTimeout(() => {
        const letters = document.querySelectorAll('.letter.roll-in');
        letters.forEach((letter, index) => {
            letter.classList.remove('roll-in');
            // 'fall' animation class add karo
            letter.classList.add('fall');
            // Thoda random delay de do taaki ek saath na gire
            letter.style.animationDelay = `${index * 0.05}s`; 
        });
    }, fallDelay + totalRollInTime); // Roll-in complete hone ke baad 7 sec wait karega

    // Iske baad, Page 3 ka button visible ho jayega (jo ki default hidden nahi hai)
}

document.getElementById('next-2').addEventListener('click', () => goToPage(3));


// --- Page 3 Logic (Message Blocks) --- (Same as before)
function showPage3Blocks() {
    const blocks = document.querySelectorAll('#page-3 .block');
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('show');
        }, index * 300);
    });
}

document.getElementById('next-3').addEventListener('click', () => goToPage(4));


// --- Page 4 Logic (Carousel & Music) --- (Same as before)
let currentPhotoIndex = 0;
let carouselInterval;

function startPhotoCarousel() {
    const photos = document.querySelectorAll('#page-4 .photo');
    if (photos.length === 0) return;

    if (carouselInterval) clearInterval(carouselInterval);

    photos[currentPhotoIndex].classList.add('active');

    carouselInterval = setInterval(() => {
        photos[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photos[currentPhotoIndex].classList.add('active');
    }, 3000); 
}

document.getElementById('next-4').addEventListener('click', () => {
    clearInterval(carouselInterval);
    goToPage(5);
});

// Music Toggle
document.getElementById('play-music').addEventListener('click', () => {
    if (music.paused) {
        music.play();
        document.getElementById('play-music').textContent = 'Pause Music';
    } else {
        music.pause();
        document.getElementById('play-music').textContent = 'Play Music';
    }
});


// --- Page 5 Logic (Video) --- (Same as before)
document.getElementById('next-5').addEventListener('click', () => {
    video.pause();
    alert('Congratulations! You completed the whole surprise! I love you! ❤️');
});


// Initial setup: Page 1 active
document.addEventListener('DOMContentLoaded', () => {
    goToPage(1);
});