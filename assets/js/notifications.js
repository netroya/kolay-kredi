// Modern Toast Notification System
class ToastNotification {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icon}</div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                toast.classList.add('hide');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || icons.info;
    }

    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }
}

// Global instance
const toast = new ToastNotification();

// Enhanced Form Validation System
class FormValidator {
    constructor() {
        this.validators = {
            required: (value) => value && value.trim().length > 0,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^(\+90|0)?5\d{9}$/.test(value.replace(/\s/g, '')),
            number: (value) => !isNaN(value) && isFinite(value),
            min: (value, min) => parseFloat(value) >= parseFloat(min),
            max: (value, max) => parseFloat(value) <= parseFloat(max),
            minLength: (value, length) => value.length >= parseInt(length),
            maxLength: (value, length) => value.length <= parseInt(length),
            pattern: (value, pattern) => new RegExp(pattern).test(value),
            tc: (value) => this.validateTCKN(value),
            iban: (value) => this.validateIBAN(value)
        };
        
        this.errorMessages = {
            required: 'Bu alan zorunludur',
            email: 'Geçerli bir e-posta adresi girin',
            phone: 'Geçerli bir telefon numarası girin',
            number: 'Geçerli bir sayı girin',
            min: 'Minimum değer: {min}',
            max: 'Maksimum değer: {max}',
            minLength: 'En az {length} karakter olmalı',
            maxLength: 'En fazla {length} karakter olmalı',
            tc: 'Geçerli bir TC Kimlik No girin',
            iban: 'Geçerli bir IBAN girin'
        };
    }

    validateField(field) {
        const errors = [];
        const value = field.value.trim();
        
        // Required validation
        if (field.hasAttribute('required') && !this.validators.required(value)) {
            errors.push(this.errorMessages.required);
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !field.hasAttribute('required')) {
            return { isValid: true, errors: [] };
        }
        
        // Type validation
        const type = field.getAttribute('type');
        if (type === 'email' && value && !this.validators.email(value)) {
            errors.push(this.errorMessages.email);
        }
        
        // Custom data attributes
        const validations = [
            'min', 'max', 'minLength', 'maxLength', 'pattern', 'phone', 'tc', 'iban'
        ];
        
        validations.forEach(validation => {
            const attr = field.getAttribute(`data-${validation}`);
            if (attr && value) {
                if (validation === 'min' || validation === 'max') {
                    if (!this.validators[validation](value, attr)) {
                        errors.push(this.errorMessages[validation].replace(`{${validation}}`, attr));
                    }
                } else if (validation === 'minLength' || validation === 'maxLength') {
                    if (!this.validators[validation](value, attr)) {
                        errors.push(this.errorMessages[validation].replace('{length}', attr));
                    }
                } else if (this.validators[validation]) {
                    if (!this.validators[validation](value, attr)) {
                        errors.push(this.errorMessages[validation]);
                    }
                }
            }
        });
        
        return { isValid: errors.length === 0, errors };
    }

    validateForm(form) {
        if (typeof form === 'string') {
            form = document.getElementById(form);
        }
        if (!form) return { isValid: false, errors: [] };

        const fields = form.querySelectorAll('input, select, textarea');
        let allErrors = [];
        let firstInvalidField = null;

        fields.forEach(field => {
            const result = this.validateField(field);
            
            if (!result.isValid) {
                field.classList.add('invalid');
                this.showFieldError(field, result.errors[0]);
                allErrors.push(...result.errors);
                
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                field.classList.remove('invalid');
                this.hideFieldError(field);
            }
        });

        if (allErrors.length > 0 && firstInvalidField) {
            firstInvalidField.focus();
            toast.error(allErrors[0]);
        }

        return { isValid: allErrors.length === 0, errors: allErrors };
    }

    showFieldError(field, message) {
        this.hideFieldError(field); // Remove existing error
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', field.id + '-error');
        errorElement.id = field.id + '-error';
    }

    hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }

    validateTCKN(tc) {
        if (!tc || tc.length !== 11) return false;
        
        const digits = tc.split('').map(Number);
        if (digits.some(isNaN)) return false;
        
        const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
        const sum2 = digits[1] + digits[3] + digits[5] + digits[7] + digits[9];
        const checksum1 = (sum1 - sum2) % 10;
        
        const totalSum = digits.slice(0, 10).reduce((a, b) => a + b, 0);
        const checksum2 = totalSum % 10;
        
        return checksum1 === digits[9] && checksum2 === digits[10];
    }

    validateIBAN(iban) {
        const cleaned = iban.replace(/\s/g, '').toUpperCase();
        if (cleaned.length !== 26 || !cleaned.startsWith('TR')) return false;
        
        const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
        const numeric = rearranged.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55);
        
        return this.mod97(numeric) === 1;
    }

    mod97(string) {
        let remainder = '';
        for (let i = 0; i < string.length; i++) {
            remainder = (remainder + string[i]) % 97;
        }
        return remainder;
    }

    // Real-time validation setup
    setupRealTimeValidation(form) {
        if (typeof form === 'string') {
            form = document.getElementById(form);
        }
        if (!form) return;

        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', () => {
                const result = this.validateField(field);
                if (!result.isValid) {
                    field.classList.add('invalid');
                    this.showFieldError(field, result.errors[0]);
                } else {
                    field.classList.remove('invalid');
                    this.hideFieldError(field);
                }
            });
            
            // Clear error on focus
            field.addEventListener('focus', () => {
                field.classList.remove('invalid');
                this.hideFieldError(field);
            });
            
            // Real-time validation for certain fields
            if (field.getAttribute('data-realtime') === 'true') {
                field.addEventListener('input', debounce(() => {
                    const result = this.validateField(field);
                    if (field.value.trim() !== '') {
                        if (!result.isValid) {
                            field.classList.add('invalid');
                            this.showFieldError(field, result.errors[0]);
                        } else {
                            field.classList.remove('invalid');
                            this.hideFieldError(field);
                        }
                    }
                }, 500));
            }
        });
        
        // Form submit validation
        form.addEventListener('submit', (e) => {
            const result = this.validateForm(form);
            if (!result.isValid) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global validator instance
const formValidator = new FormValidator();

// Legacy function for backward compatibility
function validateForm(formId) {
    const result = formValidator.validateForm(formId);
    return result.isValid;
}

// Replace native alert
function showAlert(message, type = 'info') {
    toast.show(message, type);
}