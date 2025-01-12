document.addEventListener('DOMContentLoaded', function() {
    const backgroundImage = document.querySelector('.background-image');
    const scatterText = document.querySelector('.scatter-text');
    const speechBubble = document.querySelector('.speech-bubble');
    const text = scatterText.textContent.trim();
    scatterText.textContent = '';
    
    const words = text.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'scatter-char';
        span.style.marginRight = '0.35em';
        scatterText.appendChild(span);
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