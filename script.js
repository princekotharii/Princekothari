// ----- Document Ready Function -----
document.addEventListener('DOMContentLoaded', () => {
    // Initialize everything after DOM is loaded
    initTypewriter();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initMobileMenu();
    initNavScroll();
});

// ----- Typewriter Effect -----
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const phrases = [
            'Web Developer',
            'UI/UX Designer',
            'Creative Coder',
            'Digital Craftsman'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }
}

// ----- Reveal Elements on Scroll -----
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal(); // Check on initial load
}

// ----- Skill Bars Animation -----
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillItems.forEach(item => {
            const skillSection = item.closest('.skills');
            if (isElementInViewport(skillSection)) {
                const percent = item.getAttribute('data-percent');
                const progressBar = item.querySelector('.skill-progress');
                progressBar.style.width = `${percent}%`;
            }
        });
    }
    
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight - 100 &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
}

// ----- Counter Animation -----
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    function runCounterAnimation() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const statsSection = counter.closest('.about-stats');
            
            if (isElementInViewport(statsSection) && counter.textContent === "0") {
                let currentCount = 0;
                const interval = setInterval(() => {
                    currentCount += 1;
                    counter.textContent = currentCount;
                    
                    if (currentCount >= target) {
                        clearInterval(interval);
                        counter.textContent = target;
                    }
                }, 1000 / target); // Speed up or slow down based on target
            }
        });
    }
    
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight - 100 &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', runCounterAnimation);
    runCounterAnimation(); // Initial check
}

// ----- Mobile Menu Toggle -----
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ----- Navbar Scroll Effect -----
function initNavScroll() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function handleScroll() {
        // Add scrolled class to navbar when scrolled
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        // Highlight active section in nav
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

// ----- Form Validation -----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        let isValid = true;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            isValid = false;
        }
        
        // Email validation
        if (isValid && !isValidEmail(email)) {
            alert('Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            // In a real project, you would send this to a server
            alert('Thanks for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ----- Smooth Scrolling -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});