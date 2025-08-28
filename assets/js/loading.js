// Loading Management System
class LoadingManager {
    constructor() {
        this.isLoading = false;
        this.loadingQueue = new Set();
        this.lazyImages = [];
        this.init();
        this.initLazyLoading();
    }

    init() {
        // Create loading overlay if it doesn't exist
        if (!document.getElementById('loading-overlay')) {
            this.createLoadingOverlay();
        }

        // Page load handling
        window.addEventListener('load', () => {
            this.hidePageLoader();
        });

        // Form submission handling
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('calc-form')) {
                this.showFormLoading(e.target);
            }
        });
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">Yükleniyor...</div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    showPageLoader(text = 'Yükleniyor...') {
        const overlay = document.getElementById('loading-overlay');
        const loadingText = overlay.querySelector('.loading-text');
        
        if (loadingText) {
            loadingText.textContent = text;
        }
        
        overlay.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        this.isLoading = true;
    }

    hidePageLoader() {
        setTimeout(() => {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.classList.add('hide');
                document.body.style.overflow = '';
                this.isLoading = false;
                
                // Add loaded class to main content
                document.body.classList.add('loaded');
                
                // Trigger loaded animations
                this.triggerLoadedAnimations();
            }
        }, 100);
    }

    showFormLoading(form) {
        if (!form) return;
        
        const loadingId = `form-loading-${Date.now()}`;
        this.loadingQueue.add(loadingId);
        
        form.classList.add('form-loading');
        
        return loadingId;
    }

    hideFormLoading(form, loadingId) {
        if (!form) return;
        
        setTimeout(() => {
            form.classList.remove('form-loading');
            if (loadingId) {
                this.loadingQueue.delete(loadingId);
            }
        }, 300);
    }

    showSkeletonCard(container, count = 1) {
        if (!container) return;

        const skeletonHTML = `
            <div class="skeleton-card">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton skeleton-text long"></div>
                <div class="skeleton skeleton-text medium"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-button"></div>
            </div>
        `;

        container.innerHTML = skeletonHTML.repeat(count);
    }

    hideSkeletonCards(container, content) {
        if (!container) return;
        
        setTimeout(() => {
            container.innerHTML = content;
            container.classList.add('page-transition', 'loaded');
        }, 500);
    }

    simulateLoading(duration = 2000) {
        return new Promise((resolve) => {
            this.showPageLoader('Hesaplanıyor...');
            setTimeout(() => {
                this.hidePageLoader();
                resolve();
            }, duration);
        });
    }

    triggerLoadedAnimations() {
        // Animate elements in sequence
        const elements = document.querySelectorAll('.tool-card, .feature-card, .rate-row');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    // Utility methods for different loading types
    async withLoading(asyncFunction, loadingText = 'Yükleniyor...') {
        this.showPageLoader(loadingText);
        try {
            const result = await asyncFunction();
            return result;
        } finally {
            this.hidePageLoader();
        }
    }

    createButtonLoader(button, originalText) {
        if (!button) return null;
        
        const loader = document.createElement('span');
        loader.className = 'button-loader';
        loader.innerHTML = '<div class="loading-spinner" style="width: 16px; height: 16px;"></div>';
        
        button.disabled = true;
        button.textContent = '';
        button.appendChild(loader);
        
        return {
            remove: () => {
                button.disabled = false;
                button.textContent = originalText;
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }
        };
    }

    // Network request wrapper with loading
    async fetchWithLoading(url, options = {}, loadingText = 'Veri alınıyor...') {
        return this.withLoading(async () => {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }, loadingText);
    }
    
    // Lazy Loading System
    initLazyLoading() {
        // Modern browsers native lazy loading is already implemented
        // Add intersection observer for older browsers and enhanced features
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
        
        // Find all images with loading="lazy" attribute
        this.lazyImages = document.querySelectorAll('img[loading="lazy"]');
        this.observeLazyImages();
    }
    
    setupIntersectionObserver() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });
    }
    
    observeLazyImages() {
        if (this.imageObserver) {
            this.lazyImages.forEach(img => {
                // Add placeholder if needed
                if (!img.src && !img.dataset.src) return;
                
                // For browsers that don't support native lazy loading
                if (!('loading' in HTMLImageElement.prototype)) {
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="%23f0f0f0"/></svg>';
                }
                
                this.imageObserver.observe(img);
            });
        }
    }
    
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
        
        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            console.warn('Image failed to load:', img.src);
        });
    }
}

// Global loading manager instance
const loadingManager = new LoadingManager();

// Enhanced calculation functions with loading
function quickCalculateWithLoading(type) {
    const form = document.querySelector(`#quick-${type}-form`) || document.body;
    const loadingId = loadingManager.showFormLoading(form);
    
    setTimeout(() => {
        quickCalculate(type);
        loadingManager.hideFormLoading(form, loadingId);
    }, 800);
}

// Page loading enhancement
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class
    document.body.classList.add('page-transition');
    
    // Enhanced form submissions
    const calculateButtons = document.querySelectorAll('[onclick^="quickCalculate"]');
    calculateButtons.forEach(button => {
        const originalOnclick = button.getAttribute('onclick');
        const type = originalOnclick.match(/quickCalculate\('(\w+)'\)/)?.[1];
        
        if (type) {
            button.removeAttribute('onclick');
            button.addEventListener('click', () => quickCalculateWithLoading(type));
        }
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingManager;
}