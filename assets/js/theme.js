// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.systemTheme = 'light';
        this.init();
    }

    init() {
        // Detect system theme preference
        this.detectSystemTheme();
        
        // Load saved theme or use system preference
        this.loadTheme();
        
        // Create theme toggle button
        this.createThemeToggle();
        
        // Add navigation theme toggle
        this.addNavThemeToggle();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
        
        // Apply initial theme
        this.applyTheme();
    }

    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.systemTheme = 'dark';
        } else {
            this.systemTheme = 'light';
        }
    }

    loadTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto')) {
            this.currentTheme = savedTheme;
        } else {
            // Default to auto (system preference)
            this.currentTheme = 'auto';
        }
        
        console.log('Loaded theme:', this.currentTheme);
    }

    getEffectiveTheme() {
        if (this.currentTheme === 'auto') {
            return this.systemTheme;
        }
        return this.currentTheme;
    }

    applyTheme(animate = false) {
        const effectiveTheme = this.getEffectiveTheme();
        
        // Add transition class for smooth animation
        if (animate) {
            document.documentElement.classList.add('theme-transitioning');
        }
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', effectiveTheme);
        
        // Update meta theme-color for mobile browsers
        this.updateThemeColor(effectiveTheme);
        
        // Update theme toggle button
        this.updateThemeToggleButton();
        
        // Store current effective theme
        localStorage.setItem('theme', this.currentTheme);
        
        // Remove transition class after animation
        if (animate) {
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
            }, 300);
        }
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { 
                theme: effectiveTheme,
                userPreference: this.currentTheme 
            }
        }));
        
        console.log('Applied theme:', effectiveTheme);
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        this.currentTheme = themes[nextIndex];
        this.applyTheme(true);
        
        // Show theme change notification
        this.showThemeNotification();
        
        // Add rotation animation to toggle button
        this.animateToggleButton();
    }

    setTheme(theme) {
        if (['light', 'dark', 'auto'].includes(theme)) {
            this.currentTheme = theme;
            this.applyTheme(true);
        }
    }

    updateThemeColor(theme) {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        const color = theme === 'dark' ? '#0d1117' : '#2DC44D';
        
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
        }
    }

    createThemeToggle() {
        // Don't create if already exists
        if (document.getElementById('theme-toggle')) return;
        
        const toggleButton = document.createElement('button');
        toggleButton.id = 'theme-toggle';
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Tema değiştir');
        toggleButton.setAttribute('title', 'Tema değiştir (Açık/Koyu/Otomatik)');
        
        toggleButton.innerHTML = '<span class="icon">🌙</span>';
        
        toggleButton.addEventListener('click', () => this.toggleTheme());
        
        // Add keyboard support
        toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        document.body.appendChild(toggleButton);
    }

    addNavThemeToggle() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;
        
        const themeToggle = document.createElement('li');
        themeToggle.innerHTML = `
            <button class="nav-theme-toggle" aria-label="Tema değiştir" title="Tema değiştir">
                <span class="nav-theme-icon">🌙</span>
            </button>
        `;
        
        const button = themeToggle.querySelector('.nav-theme-toggle');
        button.addEventListener('click', () => this.toggleTheme());
        
        navMenu.appendChild(themeToggle);
    }

    updateThemeToggleButton() {
        const toggleButton = document.getElementById('theme-toggle');
        const navToggle = document.querySelector('.nav-theme-toggle');
        
        if (!toggleButton && !navToggle) return;
        
        let icon, title;
        const effectiveTheme = this.getEffectiveTheme();
        
        // Set icon and title based on current theme
        if (this.currentTheme === 'auto') {
            icon = '🔄';
            title = `Otomatik tema (Şu an: ${effectiveTheme === 'dark' ? 'Koyu' : 'Açık'})`;
        } else if (effectiveTheme === 'dark') {
            icon = '🌙';
            title = 'Koyu tema aktif - Açık temaya geç';
        } else {
            icon = '☀️';
            title = 'Açık tema aktif - Otomatik temaya geç';
        }
        
        if (toggleButton) {
            toggleButton.querySelector('.icon').textContent = icon;
            toggleButton.setAttribute('title', title);
        }
        
        if (navToggle) {
            navToggle.querySelector('.nav-theme-icon').textContent = icon;
            navToggle.setAttribute('title', title);
        }
    }

    animateToggleButton() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.classList.add('rotating');
            setTimeout(() => {
                toggleButton.classList.remove('rotating');
            }, 300);
        }
    }

    showThemeNotification() {
        if (typeof toast === 'undefined') return;
        
        const effectiveTheme = this.getEffectiveTheme();
        let message;
        
        if (this.currentTheme === 'auto') {
            message = `Otomatik tema (${effectiveTheme === 'dark' ? 'Koyu' : 'Açık'})`;
        } else {
            message = `${effectiveTheme === 'dark' ? 'Koyu' : 'Açık'} tema aktif`;
        }
        
        toast.info(message);
    }

    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addListener((e) => {
                this.systemTheme = e.matches ? 'dark' : 'light';
                
                // Re-apply theme if using auto mode
                if (this.currentTheme === 'auto') {
                    this.applyTheme();
                }
                
                console.log('System theme changed to:', this.systemTheme);
            });
        }
    }

    // Utility methods
    isDark() {
        return this.getEffectiveTheme() === 'dark';
    }

    isLight() {
        return this.getEffectiveTheme() === 'light';
    }

    isAuto() {
        return this.currentTheme === 'auto';
    }

    getThemeInfo() {
        return {
            current: this.currentTheme,
            effective: this.getEffectiveTheme(),
            system: this.systemTheme
        };
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Global theme functions for external use
window.themeManager = themeManager;

// Theme change event listener example
window.addEventListener('themechange', (e) => {
    console.log('Theme changed:', e.detail);
    
    // Update any theme-dependent components
    if (typeof loadingManager !== 'undefined') {
        // Reload loading styles if needed
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

// Add CSS for theme transitions
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    .theme-transitioning * {
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                   color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                   border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                   box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
`;
document.head.appendChild(transitionStyles);