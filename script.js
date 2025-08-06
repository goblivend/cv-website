
// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const downloadCvButton = document.getElementById('download-cv');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-fr]');

    languageToggle.addEventListener('click', function() {
        const currentLanguage = languageToggle.textContent;
        if (currentLanguage === 'FR') {
            languageToggle.textContent = 'EN';
            switchLanguage('fr');
        } else {
            languageToggle.textContent = 'FR';
            switchLanguage('en');
        }
    });

    function switchLanguage(lang) {
        downloadCvButton.href = downloadCvButton.getAttribute(`data-pdf-${lang}`);
        elementsToTranslate.forEach(element => {
            const key = lang === 'en' ? 'data-en' : 'data-fr';
            const text = element.getAttribute(key);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.innerHTML = text;
                }
            }
        });
    }
});


// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Function to create a mailto link
function createMailtoLink(name, topic, message) {
    const subject = encodeURIComponent(`Message from ${name}: ${topic}`);
    const body = encodeURIComponent(message);
    return `mailto:ivan.imbert@laposte.net?subject=${subject}&body=${body}`;
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const formMessage = document.getElementById('formMessage');

    // Create mailto link
    const mailtoLink = createMailtoLink(name, subject, message);

    // Redirect to mailto link
    window.location.href = mailtoLink;
    
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.style.color = 'green';
    formMessage.style.display = 'block';
    contactForm.reset();

});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing animation for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Smooth reveal animation for skills tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.opacity = '0';
    tag.style.animation = 'fadeInScale 0.5s ease forwards';
});

// Add fadeInScale animation
const fadeInScaleStyle = document.createElement('style');
fadeInScaleStyle.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(fadeInScaleStyle);

document.querySelectorAll('.toggle-description-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.project-card');
        const detailedDescription = card.querySelector('.project-description-detailed');
        const shortDescription = card.querySelector('.project-description');

        if (detailedDescription.style.display === 'none') {
            detailedDescription.style.display = 'block';
            shortDescription.style.display = 'none';
            this.classList.add('down');
            card.classList.add('expanded'); // Add the expanded class to the card
        } else {
            detailedDescription.style.display = 'none';
            shortDescription.style.display = 'block';
            this.classList.remove('down');
            card.classList.remove('expanded'); // Remove the expanded class from the card
        }
    });
});

