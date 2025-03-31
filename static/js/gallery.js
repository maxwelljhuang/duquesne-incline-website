document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    
    setupLightbox();
});

function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const featuredImage = galleryContainer.querySelector('.gallery-featured');
    const thumbnails = galleryContainer.querySelectorAll('.gallery-thumb');
    
    if (featuredImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update the featured image
                const newSrc = this.getAttribute('src');
                const newAlt = this.getAttribute('alt');
                
                featuredImage.style.opacity = 0;
                
                setTimeout(() => {
                    featuredImage.setAttribute('src', newSrc);
                    featuredImage.setAttribute('alt', newAlt);
                    featuredImage.style.opacity = 1;
                }, 300);
                
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        thumbnails[0].classList.add('active');
    }
}

function setupLightbox() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const featuredImage = galleryContainer.querySelector('.gallery-featured');
    
    if (featuredImage) {
        featuredImage.style.cursor = 'pointer';
        
        featuredImage.addEventListener('click', function() {
            const imageSrc = this.getAttribute('src');
            const imageAlt = this.getAttribute('alt');
            
            if (typeof window.createLightbox === 'function') {
                window.createLightbox(imageSrc, imageAlt);
            }
        });
    }
}

function createSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;
    
    const slides = slideshowContainer.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    showSlide(currentSlide);
    
    const prevButton = document.createElement('button');
    prevButton.className = 'slideshow-prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.setAttribute('aria-label', 'Previous slide');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slideshow-next';
    nextButton.innerHTML = '&#10095;';
    nextButton.setAttribute('aria-label', 'Next slide');
    
    slideshowContainer.appendChild(prevButton);
    slideshowContainer.appendChild(nextButton);
    
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    /**
     * @param {number} index - The index of the slide to show
     */
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
}
