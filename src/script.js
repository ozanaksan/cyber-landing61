// Dark/Light Mode Toggle
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Önce tema ayarla, sonra buton oluştur
        this.applyTheme();
        this.createToggleButton();
        this.showContent();
    }

    createToggleButton() {
        // Navigasyon menüsünü bul
        const nav = document.querySelector('.content p:nth-of-type(2)');
        if (!nav) return;

        // Buton zaten varsa tekrar oluşturma
        if (document.getElementById('theme-toggle')) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.title = 'Tema değiştir';
        toggleBtn.className = 'theme-toggle-btn';
        
        // Navigasyon menüsünün yanına ekle
        nav.appendChild(toggleBtn);

        // Emoji'yi hemen ayarla
        this.updateToggleIcon();

        toggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        this.updateToggleIcon();
    }

    applyTheme() {
        const root = document.documentElement;
        
        if (this.theme === 'light') {
            root.style.setProperty('--color', '#111');
            root.style.setProperty('--background-color', '#f5f5f5');
            root.style.setProperty('--theme-color', '#ff4522');
        } else {
            root.style.setProperty('--color', '#eee');
            root.style.setProperty('--background-color', '#222');
            root.style.setProperty('--theme-color', '#ff4522');
        }
        // Her durumda, hangi temanın aktif olduğunu HTML'e bildir.
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    updateToggleIcon() {
        // Bu fonksiyon artık boş. İkon tamamen CSS ile kontrol ediliyor.
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '';
        }
    }

    showContent() {
        // HTML elementini görünür yap
        document.documentElement.classList.add('theme-ready');
        // Body içeriğini görünür yap
        document.body.classList.remove('no-flash');
        document.body.classList.add('theme-loaded');
    }
}

// Sayfa yüklenmeden önce tema ayarla
(function() {
    const theme = localStorage.getItem('theme') || 'dark';
    const root = document.documentElement;
    
    if (theme === 'light') {
        root.style.setProperty('--color', '#111');
        root.style.setProperty('--background-color', '#f5f5f5');
        root.style.setProperty('--theme-color', '#ff4522');
    } else {
        root.style.setProperty('--color', '#eee');
        root.style.setProperty('--background-color', '#222');
        root.style.setProperty('--theme-color', '#ff4522');
    }
})();

function displayLastUpdated() {
    const dateContainer = document.getElementById('last-updated-container');
    if (dateContainer) {
        const lastUpdatedDate = '21 Haziran, 2025';
        dateContainer.innerHTML = `Son güncellenme tarihi: ${lastUpdatedDate}`;
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    displayLastUpdated();
});

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T ile tema değiştir
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeManager = new ThemeManager();
        themeManager.toggleTheme();
    }
});
