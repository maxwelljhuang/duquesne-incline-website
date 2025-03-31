document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    
    initFaqAccordion();
    
    initSmoothScroll();
    
    initImageGallery();
});


function initMobileNav() {
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
    mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.parentNode.insertBefore(mobileNavToggle, nav);
        
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
            mobileNavToggle.classList.toggle('active');
            
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            answer.style.display = 'none';
            toggle.textContent = '+';
            
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            
            question.addEventListener('click', function() {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                answer.style.display = isExpanded ? 'none' : 'block';
                toggle.textContent = isExpanded ? '+' : '-';
                
                question.setAttribute('aria-expanded', !isExpanded);
                answer.setAttribute('aria-hidden', isExpanded);
            });
        }
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function initImageGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const featuredImage = galleryContainer.querySelector('.gallery-featured');
    const thumbnails = galleryContainer.querySelectorAll('.gallery-thumb');
    
    if (featuredImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newSrc = this.getAttribute('src');
                const newAlt = this.getAttribute('alt');
                
                featuredImage.setAttribute('src', newSrc);
                featuredImage.setAttribute('alt', newAlt);
                
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        thumbnails[0].classList.add('active');
    }
}

/**
 * @param {string} imageSrc 
 * @param {string} imageAlt 
 */
function createLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close lightbox');
    
    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = imageAlt;
    
    content.appendChild(closeButton);
    content.appendChild(image);
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);
    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
    });
}

window.createLightbox = createLightbox;