// Particles background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = `rgba(0, 170, 255, ${Math.random() * 0.5})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles(count = 80) {
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}
initParticles(70);
animateParticles();

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') navLinks.style.display = 'none';
    else navLinks.style.display = 'flex';
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth <= 768 && navLinks.style.display === 'flex') navLinks.style.display = 'none';
    }
  });
});

// Service buttons: pre-fill form project type
const serviceBtns = document.querySelectorAll('.request-service-btn');
serviceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service-card');
    let serviceType = card.getAttribute('data-service-type');
    if (!serviceType) {
      const h3 = card.querySelector('h3');
      if (h3) serviceType = h3.innerText.split(' ')[0];
    }
    const projectTypeSelect = document.getElementById('projectType');
    if (projectTypeSelect && serviceType) {
      const option = Array.from(projectTypeSelect.options).find(opt => opt.value === serviceType || opt.text.includes(serviceType));
      if (option) projectTypeSelect.value = option.value;
      else projectTypeSelect.value = "Custom Software";
    }
    document.getElementById('request-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// FORM VALIDATION & SUBMISSION (phone required) + Send to WhatsApp & Email
const form = document.getElementById('projectRequestForm');
const phoneInput = document.getElementById('phoneNumber');
const nameInput = document.getElementById('fullName');
const phoneError = document.getElementById('phoneError');
const nameError = document.getElementById('nameError');
const successDiv = document.getElementById('formSuccessMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;
  
  // Name validation
  if (!nameInput.value.trim()) {
    nameError.innerText = 'Full name is required';
    isValid = false;
  } else {
    nameError.innerText = '';
  }
  
  // Phone required
  const phone = phoneInput.value.trim();
  if (!phone) {
    phoneError.innerText = 'Phone number is REQUIRED to contact you.';
    isValid = false;
  } else {
    phoneError.innerText = '';
  }
  
  if (!isValid) return;
  
  // Gather form data
  const fullName = nameInput.value.trim();
  const phoneNumber = phone;
  const email = document.getElementById('email').value.trim();
  const projectType = document.getElementById('projectType').value;
  const projectSize = document.getElementById('projectSize').value;
  const description = document.getElementById('projectDesc').value.trim() || "No description provided.";
  
  // Prepare message for WhatsApp & Email
  const message = `*New Project Request*%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Phone:* ${encodeURIComponent(phoneNumber)}%0A*Email:* ${encodeURIComponent(email || 'Not provided')}%0A*Project Type:* ${encodeURIComponent(projectType)}%0A*Project Size:* ${encodeURIComponent(projectSize)}%0A*Description:* ${encodeURIComponent(description)}`;
  
  // WhatsApp link (your number: +201034851479)
  const whatsappUrl = `https://wa.me/201034851479?text=${message}`;
  
  // Email link (your email: kimos65592@gmail.com)
  const subject = `New Project Request from ${fullName}`;
  const body = `Name: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email || 'Not provided'}\nProject Type: ${projectType}\nProject Size: ${projectSize}\nDescription: ${description}`;
  const mailtoUrl = `mailto:kimos65592@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open WhatsApp and email in new windows/tabs
  window.open(whatsappUrl, '_blank');
  window.open(mailtoUrl, '_blank');
  
  // Show success message
  successDiv.classList.remove('hidden');
  form.reset();
  setTimeout(() => {
    successDiv.classList.add('hidden');
  }, 5000);
});

// Typewriter effect for hero typed-text
const typedSpan = document.querySelector('.typed-text');
if (typedSpan) {
  const roles = ['Developer | AI Builder | App Creator', 'Full-Stack Architect', 'AI Systems Engineer'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % roles.length;
    typedSpan.style.opacity = '0';
    setTimeout(() => {
      typedSpan.innerText = roles[idx];
      typedSpan.style.opacity = '1';
    }, 200);
  }, 2800);
}