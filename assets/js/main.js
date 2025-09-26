// Shared JavaScript for Aswin M Guptha Portfolio

// Encrypted email configuration
const EMAIL_CONFIG = {
    secret: "916oO+4=[Y(F",
    encryptedEmail: "U2FsdGVkX1+FQwnGMea6lGzNlNpU3juhIFJ1LHxpzgOkjiQArWuQaN2X8IM8lSrH" 
};

// Mobile Navigation
function toggleMobileNav() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.querySelector('.mobile-nav');
    const menu = document.getElementById('mobileMenu');
    
    if (mobileNav && menu && !mobileNav.contains(event.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});

// Status functionality
function updateStatus() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + istOffset);
    
    const day = istTime.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = istTime.getUTCHours();
    
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    if (!statusDot || !statusText) return;
    
    // Check if it's a weekday (Monday to Friday)
    const isWeekday = day >= 1 && day <= 5;
    
    if (isWeekday) {
        if (hour >= 10 && hour < 18) {
            // 10 AM to 6 PM - Active
            statusDot.className = 'status-dot active';
            statusText.textContent = 'currently active';
        } else if (hour < 22 && hour >= 18) {
            // 6 PM to 10 PM - Recently active
            statusDot.className = 'status-dot recent';
            statusText.textContent = 'last seen: recently';
        } else {
            // 10 PM to 10 AM - Disconnected
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'disconnected';
        }
    } else {
        // Weekends - Always disconnected
        statusDot.className = 'status-dot offline';
        statusText.textContent = 'disconnected';
    }
}

// Email decryption and copy functionality
function copyDecryptedEmail() {
    try {
        if (!EMAIL_CONFIG.secret || !EMAIL_CONFIG.encryptedEmail || 
            EMAIL_CONFIG.secret === "YOUR_SECRET_KEY_HERE" || 
            EMAIL_CONFIG.encryptedEmail === "YOUR_ENCRYPTED_EMAIL_HERE") {
            console.log("Email encryption not configured. Please set your secret key and encrypted email.");
            return;
        }

        // Decrypt the email
        const bytes = CryptoJS.AES.decrypt(EMAIL_CONFIG.encryptedEmail, EMAIL_CONFIG.secret);
        const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedEmail) {
            console.log("Failed to decrypt email. Please check your secret key and encrypted email.");
            return;
        }

        // Copy to clipboard
        const emailLink = document.querySelector('.email-link');
        const emailText = document.getElementById('emailText');
        const originalText = emailText.textContent;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(decryptedEmail).then(() => {
                // Add tick class and change text
                emailLink.classList.add('copied');
                emailText.textContent = 'email copied!';
                
                setTimeout(() => {
                    emailLink.classList.remove('copied');
                    emailText.textContent = originalText;
                }, 1000);
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyEmail(decryptedEmail, emailLink, emailText, originalText);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyEmail(decryptedEmail, emailLink, emailText, originalText);
        }
    } catch (error) {
        console.error('Error decrypting email:', error);
    }
}

function fallbackCopyEmail(email, emailLink, emailText, originalText) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        // Add tick class and change text
        emailLink.classList.add('copied');
        emailText.textContent = 'email copied!';
        
        setTimeout(() => {
            emailLink.classList.remove('copied');
            emailText.textContent = originalText;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy email: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Copy prompt functionality
function copyPrompt() {
    const prompt = `Create a minimalist, terminal-inspired portfolio website for a cybersecurity professional with the following specifications:

Design & Visual Identity
Color Scheme: Dark theme with black/dark gray background (#0a0a0a), subtle borders (#2a2a2a), and light text (#e5e5e5)
Typography:
Primary: 'Inter' sans-serif for body text
Secondary: 'JetBrains Mono' monospace for terminal elements and navigation
Style: Clean, minimal, hacker/terminal aesthetic with subtle animations
Layout & Structure
Header: Fixed terminal-style cursor indicator showing current path (~/)
Navigation: Fixed top-right navigation with links to: home, blog, projects, about
Mobile-responsive with hamburger menu for smaller screens
Single-page layout with clean typography hierarchy
Content Sections
Hero Section
Large name heading: "Aswin M Guptha"
Subtitle: "appsec engineer / cybersecurity researcher / ctf player"
Brief bio: "I build, break, and secure systems. I play CTFs, conduct security assessments, and build security tools."
Skills Tags
Display skill tags in a clean row format:

webapp security
api security
red team
ctfs
ai security
security research
vulnerability assessment
Social Links
Clean text-based links to:

GitHub profile
LinkedIn profile
Email (with click-to-copy functionality using encrypted email)
Resume PDF download
Interactive Features
Status Indicator:

Show online/offline status based on IST timezone (10 AM - 6 PM weekdays)
Color-coded dot (green=active, yellow=recent, gray=offline)
Email Security:

Encrypt email address using AES encryption
Click-to-copy functionality with visual feedback
Brief "email copied!" confirmation
Mobile Navigation:

Hamburger menu that slides in from the side
Click-outside-to-close functionality
Additional Pages Structure
About: "Coming Soon" placeholder with consistent styling
Blog: "Coming Soon" placeholder
Projects: "Coming Soon" placeholder
All pages maintain consistent navigation and terminal cursor
Technical Requirements
Vanilla HTML, CSS, and JavaScript (no frameworks)
External dependencies: Google Fonts, CryptoJS for email encryption
Mobile-first responsive design
Semantic HTML structure
CSS custom properties for consistent theming
Smooth transitions and hover effects
Footer Elements
Credit attribution: "made with ♥ by claude.ai"
Copyright icon with click-to-copy prompt functionality
Key Aesthetic Goals: Professional yet approachable, technical but not intimidating, clean and fast-loading, with subtle interactive elements that enhance the user experience without being distracting.`
    
    const creditIcon = document.getElementById('creditIcon');
    const creditText = document.querySelector('.credit span');
    const originalText = creditText.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(prompt).then(() => {
            // Change icon to tick mark and text
            creditIcon.className = 'credit-icon tick-icon';
            creditText.textContent = 'prompt copied!';
            
            setTimeout(() => {
                creditIcon.className = 'credit-icon copyright-icon';
                creditText.textContent = originalText;
            }, 1000);
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopy(prompt, creditIcon, creditText, originalText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(prompt, creditIcon, creditText, originalText);
    }
}

function fallbackCopy(prompt, creditIcon, creditText, originalText) {
    const textArea = document.createElement('textarea');
    textArea.value = prompt;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        // Change icon to tick mark and text
        creditIcon.className = 'credit-icon tick-icon';
        creditText.textContent = 'prompt copied!';
        
        setTimeout(() => {
            creditIcon.className = 'credit-icon copyright-icon';
            creditText.textContent = originalText;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Create floating particles (for coming soon pages)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize status and update every minute
    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute
    
    // Initialize particles if particles container exists
    createParticles();
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar-container');
  const scrollThreshold = 50;
  
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});