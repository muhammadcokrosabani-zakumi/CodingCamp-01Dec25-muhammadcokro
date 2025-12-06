document.addEventListener('DOMContentLoaded', function() {

    displayWelcomeMessage(); 
    displayCurrentTime();
   
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
});

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

let slideIndex = 0;
let slides;        
let dots;          
let slideInterval; 

function initSlider() {
    slides = document.querySelectorAll('.slider-image');
    dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return; 

    showSlide(slideIndex); 
    
    slideInterval = setInterval(nextSlide, 3000); 

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval); 
            showSlide(parseInt(this.getAttribute('data-slide')));
            slideInterval = setInterval(nextSlide, 3000); 
        });
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length; 
    showSlide(slideIndex);
}

function showSlide(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}
    /**
     * @param {Date} dateObj 
     * @returns {string} 
     */
function formatDate(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
}

function displayWelcomeMessage() {
    const welcomeElement = document.getElementById('welcome-message');

    if (welcomeElement) {
        let userName = prompt("👋 Selamat datang di website kami!\n\nMohon masukkan Nama Anda:") || "Pengunjung"; 
        welcomeElement.textContent = `Hi ${userName}, Welcome To Website`;
    }
}

function displayCurrentTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    
    const formattedDate = formatDate(now); 
    
    const timeString = now.toLocaleTimeString('id-ID');

    if (timeElement) {
        timeElement.textContent = `${formattedDate} ${timeString}`;
    }
}

function handleFormSubmit(event) {
    event.preventDefault(); 

    const form = event.target;
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const errorElement = document.getElementById('form-error');
    const outputArea = document.getElementById('form-output-data');
    const outputTitle = document.getElementById('output-title');

    errorElement.textContent = '';
    outputArea.innerHTML = '';

    if (nameInput.value.trim() === '' || messageInput.value.trim() === '') {
        errorElement.textContent = 'ERROR: Kolom Nama dan Pesan wajib diisi.';
        return; 
    }

    const formData = new FormData(form);
    let outputText = '';
    
    for (const [key, value] of formData.entries()) {
        let label = key.charAt(0).toUpperCase() + key.slice(1);
        
        if (key === 'name') label = 'Nama';
        if (key === 'dob') label = 'Tanggal Lahir';
        if (key === 'gender') label = 'Jenis Kelamin';
        if (key === 'message') label = 'Pesan';

        outputText += `${label}: ${value}\n`;
    }

    const now = new Date();
    const formattedDate = formatDate(now);
    const timeString = now.toLocaleTimeString('id-ID');

    outputTitle.innerHTML = `Data Terkirim Pada: <span id="current-time">${formattedDate} ${timeString}</span>`;
    outputArea.textContent = outputText;
    
}