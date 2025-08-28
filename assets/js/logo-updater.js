/**
 * Logo Güncelleme Sistemi
 * Gerçek banka logolarını otomatik olarak yükler
 */

// Banka logo dosya yolları
const bankLogos = {
    'ziraat': {
        real: 'assets/images/banks/real-logos/ziraat',
        fallback: 'assets/images/banks/ziraat.svg'
    },
    'garanti': {
        real: 'assets/images/banks/real-logos/garanti',
        fallback: 'assets/images/banks/garanti.svg'
    },
    'isbank': {
        real: 'assets/images/banks/real-logos/isbank',
        fallback: 'assets/images/banks/isbank.svg'
    },
    'vakifbank': {
        real: 'assets/images/banks/real-logos/vakifbank',
        fallback: 'assets/images/banks/vakifbank.svg'
    },
    'halkbank': {
        real: 'assets/images/banks/real-logos/halkbank',
        fallback: 'assets/images/banks/halkbank.svg'
    },
    'akbank': {
        real: 'assets/images/banks/real-logos/akbank',
        fallback: 'assets/images/banks/akbank.svg'
    },
    'yapikredi': {
        real: 'assets/images/banks/real-logos/yapikredi',
        fallback: 'assets/images/banks/yapikredi.svg'
    },
    'teb': {
        real: 'assets/images/banks/real-logos/teb',
        fallback: 'assets/images/banks/teb.svg'
    },
    'ing': {
        real: 'assets/images/banks/real-logos/ing',
        fallback: 'assets/images/banks/ing.svg'
    },
    'qnb': {
        real: 'assets/images/banks/real-logos/qnb',
        fallback: 'assets/images/banks/qnb.svg'
    },
    'denizbank': {
        real: 'assets/images/banks/real-logos/denizbank',
        fallback: 'assets/images/banks/denizbank.svg'
    }
};

// Desteklenen dosya formatları
const supportedFormats = ['png', 'jpg', 'jpeg', 'svg'];

/**
 * Gerçek logo dosyasının var olup olmadığını kontrol et
 */
async function checkLogoExists(bankName) {
    const logoConfig = bankLogos[bankName];
    if (!logoConfig) return false;

    for (const format of supportedFormats) {
        try {
            const response = await fetch(`${logoConfig.real}.${format}`, { method: 'HEAD' });
            if (response.ok) {
                return `${logoConfig.real}.${format}`;
            }
        } catch (error) {
            console.log(`${bankName} logosu ${format} formatında bulunamadı`);
        }
    }
    return false;
}

/**
 * Tüm banka logolarını güncelle
 */
async function updateAllLogos() {
    console.log('🏦 Gerçek banka logolarını kontrol ediliyor...');
    
    const logoElements = document.querySelectorAll('img[src*="/banks/"]');
    
    for (const img of logoElements) {
        const src = img.getAttribute('src');
        const bankName = extractBankName(src);
        
        if (bankName && bankLogos[bankName]) {
            const realLogoPath = await checkLogoExists(bankName);
            
            if (realLogoPath) {
                console.log(`✅ ${bankName} için gerçek logo bulundu: ${realLogoPath}`);
                img.src = realLogoPath;
                img.classList.add('real-logo-loaded');
                
                // Alt text'i güncelle
                const bankDisplayName = getBankDisplayName(bankName);
                img.alt = `${bankDisplayName} - Resmi Logo`;
            } else {
                console.log(`⚠️ ${bankName} için gerçek logo bulunamadı, SVG kullanılıyor`);
            }
        }
    }
}

/**
 * Dosya yolundan banka adını çıkar
 */
function extractBankName(src) {
    const match = src.match(/\/banks\/(?:real-logos\/)?([^/.]+)/);
    return match ? match[1] : null;
}

/**
 * Banka görüntüleme adını al
 */
function getBankDisplayName(bankName) {
    const names = {
        'ziraat': 'Ziraat Bankası',
        'garanti': 'Garanti BBVA',
        'isbank': 'İş Bankası',
        'vakifbank': 'VakıfBank',
        'halkbank': 'Halkbank',
        'akbank': 'Akbank',
        'yapikredi': 'Yapı Kredi',
        'teb': 'TEB',
        'ing': 'ING Bank',
        'qnb': 'QNB Finansbank',
        'denizbank': 'Denizbank'
    };
    return names[bankName] || bankName;
}

/**
 * Logo yükleme hatalarını yakala
 */
function handleLogoError(img, bankName) {
    console.log(`❌ ${bankName} logosu yüklenemedi, fallback kullanılıyor`);
    img.src = bankLogos[bankName].fallback;
}

/**
 * Sayfa yüklendiğinde logoları güncelle
 */
document.addEventListener('DOMContentLoaded', () => {
    updateAllLogos();
    
    // Logo klasörüne yeni dosya eklendiğinde otomatik güncelleme
    // File system monitoring (tarayıcıda mümkün değil, manuel refresh gerekir)
    console.log('💡 Yeni logolar eklediğinizde sayfayı yenileyiniz');
});

/**
 * Manuel logo güncelleme fonksiyonu
 */
window.refreshLogos = function() {
    updateAllLogos();
    console.log('🔄 Logolar yeniden kontrol ediliyor...');
};

// Global erişim için
window.logoUpdater = {
    updateAllLogos,
    checkLogoExists,
    refreshLogos: window.refreshLogos
};