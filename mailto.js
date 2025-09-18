
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
