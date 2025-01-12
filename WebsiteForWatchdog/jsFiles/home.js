document.addEventListener('DOMContentLoaded', function() {
    const backgroundImage = document.querySelector('.background-image');
    const scatterText = document.querySelector('.scatter-text');
    const speechBubble = document.querySelector('.speech-bubble');
    const subtitle = document.querySelector('.games-subtitle');
    const comingSoonBadge = document.querySelector('.coming-soon-badge');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const scatterTextContent = scatterText.textContent.trim();
    const subtitleContent = subtitle.textContent.trim();
    const badgeText = comingSoonBadge.textContent.trim();
    
    scatterText.textContent = '';
    subtitle.textContent = '';
    comingSoonBadge.textContent = '';
    
    const words = scatterTextContent.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'scatter-char';
        span.style.marginRight = '0.35em';
        scatterText.appendChild(span);
    });
    
    [...subtitleContent].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'sway-letter';
        span.style.marginRight = char === ' ' ? '0.2em' : '0.02em';
        span.style.animationDelay = `${index * 0.1}s`;
        subtitle.appendChild(span);
    });
    
    [...badgeText].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'sway-letter';
        span.style.marginRight = char === ' ' ? '0.2em' : '0.02em';
        span.style.animationDelay = `${index * 0.1}s`;
        comingSoonBadge.appendChild(span);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = 75 * (mouseX - 0.5);
        const moveY = 75 * (mouseY - 0.5);
        
        backgroundImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('shockwave');
                    const elements = entry.target.querySelectorAll('.scatter-char');
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, index * 50);
                    });
                    setTimeout(() => {
                        entry.target.classList.remove('shockwave');
                    }, 1000);
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(speechBubble);
});