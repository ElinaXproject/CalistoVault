// Calisto Vault - Main JavaScript
// Smooth scrolling for anchor links
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

// Add scroll animation to elements
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

// Observe all animated elements
document.querySelectorAll('.feature-card, .cloudflare-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to phone mockup
const phoneFrame = document.querySelector('.phone-frame');
if (phoneFrame) {
    phoneFrame.addEventListener('mouseenter', () => {
        phoneFrame.style.transform = 'scale(1.05)';
        phoneFrame.style.transition = 'transform 0.3s ease';
    });
    
    phoneFrame.addEventListener('mouseleave', () => {
        phoneFrame.style.transform = 'scale(1)';
    });
}

// Console message
console.log('%c🔒 Calisto Vault', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cBezpieczny Menedżer Haseł', 'color: #f59e0b; font-size: 14px;');
console.log('%chttps://github.com/ElinaXproject/CalistoVault', 'color: #606070;');
