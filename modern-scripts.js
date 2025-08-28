// Modern HesapKurdu.com Style JavaScript Functions

// Tab Switching for Calculator Widget
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.widget-tab');
    const forms = document.querySelectorAll('.widget-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const tabType = this.dataset.tab;
            const form = document.getElementById(`${tabType}-form`);
            if (form) {
                form.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.modern-nav-item[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.modern-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = '#ffffff';
            nav.style.backdropFilter = 'none';
        }
    });
});

// Modern Kredi Calculation Function
function modernCalculateKredi() {
    const tutar = parseFloat(document.querySelector('#kredi-form .modern-input[placeholder="100.000"]').value);
    const vade = parseInt(document.querySelector('#kredi-form .modern-select').value);
    const gelir = parseFloat(document.querySelector('#kredi-form .modern-input[placeholder="15.000"]').value);
    
    if (!tutar || !vade || !gelir) {
        showModernNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (tutar < 10000 || tutar > 1000000) {
        showModernNotification('Kredi tutarı 10.000₺ - 1.000.000₺ arasında olmalıdır!', 'error');
        return;
    }
    
    if (gelir < 5000) {
        showModernNotification('Minimum aylık gelir 5.000₺ olmalıdır!', 'error');
        return;
    }
    
    // Gelir-kredi oranı kontrolü (DTI - Debt to Income)
    const aylikOdemeCapacity = gelir * 0.5; // Max %50 gelir kredi ödemesinde kullanılabilir
    
    // Faiz oranları (örnek - gerçek uygulamada API'den gelecek)
    const faizOranlari = {
        12: 2.49, 24: 2.59, 36: 2.69, 48: 2.79, 60: 2.89
    };
    
    const aylikFaizOrani = faizOranlari[vade] / 100 / 12;
    const aylikOdeme = tutar * (aylikFaizOrani * Math.pow(1 + aylikFaizOrani, vade)) / (Math.pow(1 + aylikFaizOrani, vade) - 1);
    const toplamOdeme = aylikOdeme * vade;
    const toplamFaiz = toplamOdeme - tutar;
    
    // DTI kontrolü
    if (aylikOdeme > aylikOdemeCapacity) {
        showModernNotification(`Bu kredi için aylık ödeme ${formatCurrency(aylikOdeme)} olacak. Gelirinizle bu ödemeyi karşılayamayabilirsiniz.`, 'warning');
    }
    
    // Sonuçları göster
    document.getElementById('aylik-odeme').textContent = formatCurrency(aylikOdeme);
    document.getElementById('toplam-odeme').textContent = formatCurrency(toplamOdeme);
    document.getElementById('toplam-faiz').textContent = formatCurrency(toplamFaiz);
    
    const resultDiv = document.getElementById('kredi-result');
    resultDiv.classList.add('show');
    
    // Analytics tracking
    gtag('event', 'calculator_use', {
        'event_category': 'engagement',
        'event_label': 'ihtiyac_kredisi',
        'value': Math.round(tutar)
    });
    
    showModernNotification('Hesaplama tamamlandı!', 'success');
}

// Modern Konut Kredisi Calculation
function modernCalculateKonut() {
    const konutDegeri = parseFloat(document.querySelector('#konut-form .modern-input[placeholder="1.500.000"]').value);
    const pesinатOrani = parseInt(document.querySelector('#konut-form .modern-select').value);
    const vadeYil = parseInt(document.querySelector('#konut-form .modern-select:last-child').value);
    
    if (!konutDegeri || !pesinатOrani || !vadeYil) {
        showModernNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    const pesinат = konutDegeri * (pesinатOrani / 100);
    const krediTutari = konutDegeri - pesinат;
    const vadeAy = vadeYil * 12;
    
    // Konut kredisi faiz oranları (örnek)
    const konutFaizOranlari = {
        10: 1.89, 15: 1.99, 20: 2.09
    };
    
    const aylikFaizOrani = konutFaizOranlari[vadeYil] / 100 / 12;
    const aylikOdeme = krediTutari * (aylikFaizOrani * Math.pow(1 + aylikFaizOrani, vadeAy)) / (Math.pow(1 + aylikFaizOrani, vadeAy) - 1);
    const toplamOdeme = aylikOdeme * vadeAy;
    
    document.getElementById('konut-kredi-tutari').textContent = formatCurrency(krediTutari);
    document.getElementById('konut-aylik-odeme').textContent = formatCurrency(aylikOdeme);
    document.getElementById('konut-toplam-odeme').textContent = formatCurrency(toplamOdeme);
    
    const resultDiv = document.getElementById('konut-result');
    resultDiv.classList.add('show');
    
    gtag('event', 'calculator_use', {
        'event_category': 'engagement',
        'event_label': 'konut_kredisi',
        'value': Math.round(krediTutari)
    });
    
    showModernNotification('Konut kredisi hesaplama tamamlandı!', 'success');
}

// Modern Taşıt Kredisi Calculation
function modernCalculateTasit() {
    const aracDegeri = parseFloat(document.querySelector('#tasit-form .modern-input[placeholder="800.000"]').value);
    const pesinат = parseFloat(document.querySelector('#tasit-form .modern-input[placeholder="200.000"]').value) || 0;
    const vade = parseInt(document.querySelector('#tasit-form .modern-select').value);
    
    if (!aracDegeri || vade === undefined) {
        showModernNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (pesinат >= aracDegeri) {
        showModernNotification('Peşinat tutarı araç değerinden az olmalıdır!', 'error');
        return;
    }
    
    const krediTutari = aracDegeri - pesinат;
    
    // Taşıt kredisi faiz oranları
    const tasitFaizOranlari = {
        12: 2.19, 24: 2.29, 36: 2.39, 48: 2.49
    };
    
    const aylikFaizOrani = tasitFaizOranlari[vade] / 100 / 12;
    const aylikOdeme = krediTutari * (aylikFaizOrani * Math.pow(1 + aylikFaizOrani, vade)) / (Math.pow(1 + aylikFaizOrani, vade) - 1);
    const toplamOdeme = aylikOdeme * vade;
    const toplamFaiz = toplamOdeme - krediTutari;
    
    document.getElementById('tasit-kredi-tutari').textContent = formatCurrency(krediTutari);
    document.getElementById('tasit-aylik-odeme').textContent = formatCurrency(aylikOdeme);
    document.getElementById('tasit-toplam-faiz').textContent = formatCurrency(toplamFaiz);
    
    const resultDiv = document.getElementById('tasit-result');
    resultDiv.classList.add('show');
    
    gtag('event', 'calculator_use', {
        'event_category': 'engagement',
        'event_label': 'tasit_kredisi',
        'value': Math.round(krediTutari)
    });
    
    showModernNotification('Taşıt kredisi hesaplama tamamlandı!', 'success');
}

// Modern Notification System
function showModernNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.modern-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `modern-notification modern-notification-${type}`;
    
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#modern-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modern-notification-styles';
        styles.textContent = `
            .modern-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                min-width: 300px;
                max-width: 500px;
                padding: 16px;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
            }
            
            .modern-notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .modern-notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            .modern-notification-warning {
                background: linear-gradient(135deg, #f59e0b, #d97706);
            }
            
            .modern-notification-info {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                opacity: 0.8;
                margin-left: auto;
                padding: 4px;
                border-radius: 4px;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
                background: rgba(255,255,255,0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Currency Formatter
function formatCurrency(amount, currency = 'TRY', locale = 'tr-TR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Number formatter for thousands
function formatNumber(num) {
    return new Intl.NumberFormat('tr-TR').format(num);
}

// Form validation helper
function validatePositiveNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

// Modern Loading Button State
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.disabled = true;
        button.innerHTML = `
            <div class="spinner" style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></div>
            Hesaplanıyor...
        `;
        
        // Add spin animation if not exists
        if (!document.querySelector('#spinner-styles')) {
            const spinnerStyles = document.createElement('style');
            spinnerStyles.id = 'spinner-styles';
            spinnerStyles.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyles);
        }
    } else {
        button.disabled = false;
        // Restore original content based on form type
        const formId = button.closest('.widget-form').id;
        const buttonTexts = {
            'kredi-form': '<i class="fas fa-calculator"></i> Hesapla',
            'konut-form': '<i class="fas fa-home"></i> Hesapla',
            'tasit-form': '<i class="fas fa-car"></i> Hesapla'
        };
        button.innerHTML = buttonTexts[formId] || '<i class="fas fa-calculator"></i> Hesapla';
    }
}

// Enhanced calculation with loading state
function enhancedCalculate(calculationFunction) {
    return function() {
        const button = event.target;
        setButtonLoading(button, true);
        
        // Simulate API call delay for better UX
        setTimeout(() => {
            try {
                calculationFunction();
            } catch (error) {
                showModernNotification('Hesaplama sırasında bir hata oluştu!', 'error');
                console.error('Calculation error:', error);
            } finally {
                setButtonLoading(button, false);
            }
        }, 800); // Simulated delay
    };
}

// Error handling for API calls (future use)
async function safeApiCall(apiFunction, errorMessage = 'İşlem sırasında bir hata oluştu') {
    try {
        const result = await apiFunction();
        return { success: true, data: result };
    } catch (error) {
        console.error('API Error:', error);
        showModernNotification(errorMessage, 'error');
        return { success: false, error };
    }
}

// Initialize modern features
function initializeModernFeatures() {
    // Add modern input formatting
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters and format
            let value = this.value.replace(/[^\d.]/g, '');
            if (value.split('.').length > 2) {
                value = value.substring(0, value.lastIndexOf('.'));
            }
            this.value = value;
        });
        
        input.addEventListener('blur', function() {
            // Format number on blur
            const num = parseFloat(this.value);
            if (!isNaN(num)) {
                this.value = num.toLocaleString('tr-TR');
            }
        });
        
        input.addEventListener('focus', function() {
            // Remove formatting on focus for easier editing
            this.value = this.value.replace(/[.,]/g, '');
        });
    });
    
    // Intersection Observer for animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.modern-feature-card, .comparison-table, .widget-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModernFeatures);

// Quick Tools Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openMevduatCalculator() {
    showModernNotification('Mevduat hesaplama sayfası açılıyor...', 'info');
    // Mevduat hesaplama sayfasına yönlendirme
    setTimeout(() => {
        window.open('mevduat-hesaplama.html', '_blank');
    }, 1000);
}

function openKartComparison() {
    showModernNotification('Kredi kartı karşılaştırma sayfası açılıyor...', 'info');
    setTimeout(() => {
        window.open('kredi-karti-karsilastirma.html', '_blank');
    }, 1000);
}

function openInvestmentCalculator() {
    showModernNotification('Yatırım hesaplama araçları açılıyor...', 'info');
    setTimeout(() => {
        window.open('yatirim-hesaplama.html', '_blank');
    }, 1000);
}

function openInsuranceCalculator() {
    showModernNotification('Sigorta hesaplama araçları açılıyor...', 'info');
    setTimeout(() => {
        window.open('sigorta-hesaplama.html', '_blank');
    }, 1000);
}

function openRealEstateCalculator() {
    showModernNotification('Emlak değerleme araçları açılıyor...', 'info');
    setTimeout(() => {
        window.open('emlak-degerleme.html', '_blank');
    }, 1000);
}

// Newsletter subscription function
function subscribeNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email || !isValidEmail(email)) {
        showModernNotification('Geçerli bir e-posta adresi girin!', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showModernNotification('E-posta aboneliği işleminiz başlatılıyor...', 'info');
    
    setTimeout(() => {
        // Simulate successful subscription
        showModernNotification('Başarıyla abone oldunuz! E-postanızı kontrol edin.', 'success');
        emailInput.value = '';
        
        // Analytics tracking
        gtag('event', 'newsletter_subscribe', {
            'event_category': 'engagement',
            'event_label': 'footer_newsletter'
        });
    }, 1500);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}