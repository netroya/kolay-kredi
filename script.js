// Smooth Scrolling for Navigation Links
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

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentNode;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = this.querySelector('i');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.querySelector('.faq-answer').classList.remove('active');
                item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        answer.classList.toggle('active');
        
        // Rotate icon
        if (answer.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Navigation Active State
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
createBackToTopButton();

// Google Analytics Enhanced Events
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('navigation_click', {
            'link_text': this.textContent.trim(),
            'link_url': this.getAttribute('href')
        });
    });
});

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        trackEvent('faq_interaction', {
            'question': this.textContent.trim()
        });
    });
});

// Track time spent on page
let timeOnPage = 0;
const startTime = Date.now();

window.addEventListener('beforeunload', function() {
    timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', {
        'seconds': timeOnPage
    });
});

// Track scroll depth
let maxScrollPercentage = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScrollPercentage) {
        maxScrollPercentage = scrollPercent;
        
        // Track milestone percentages
        if (scrollPercent >= 25 && scrollPercent < 50) {
            trackEvent('scroll_depth', { 'percent': 25 });
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
            trackEvent('scroll_depth', { 'percent': 50 });
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
            trackEvent('scroll_depth', { 'percent': 75 });
        } else if (scrollPercent >= 90) {
            trackEvent('scroll_depth', { 'percent': 90 });
        }
    }
});

// Mobile Menu Toggle (for very small screens)
function createMobileMenu() {
    const nav = document.querySelector('.navigation');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    toggleButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-primary);
        cursor: pointer;
        padding: 10px;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    `;
    
    // Insert toggle button
    const navContainer = document.querySelector('.nav-container');
    navContainer.style.position = 'relative';
    navContainer.appendChild(toggleButton);
    
    // Toggle menu on click
    toggleButton.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-open');
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('mobile-open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 600px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--background);
                box-shadow: var(--shadow-lg);
                flex-direction: column;
                padding: 20px;
                gap: 10px;
            }
            
            .nav-menu.mobile-open {
                display: flex;
            }
            
            .nav-link {
                justify-content: center;
                padding: 15px;
                border-radius: var(--border-radius);
                background: var(--background-secondary);
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

// Initialize mobile menu
createMobileMenu();

// Performance optimization: Lazy load images if any
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

console.log('Website initialized successfully!');