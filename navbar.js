// ========== 1. INJEKSI CSS DESAIN TABS CENTERED & RINGKAS ==========
const navbarStyle = document.createElement('style');
navbarStyle.innerHTML = `
    /* Terapkan sticky langsung pada ID pembungkus terluar di HTML */
    #navbar {
        position: sticky;
        top: 0;
        z-index: 10000;
    }

    .navbar-container {
        background-color: #11223f;
        border-bottom: 3px solid #f5b016;
        padding: 8px 16px;
        display: flex;
        justify-content: center; /* Pusatkan menu di tengah */
        align-items: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .navbar-links {
        display: flex;
        gap: 8px;
        align-items: center;
        list-style: none;
        width: 100%;
        justify-content: center; /* Pusatkan link di desktop */
    }

    .navbar-links a {
        color: #cbd5e1;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        padding: 8px 12px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .navbar-links a:hover, .navbar-links a.active {
        color: #11223f !important;
        background-color: #f5b016 !important;
        font-weight: 700;
    }

    /* === RESPONSIVE MOBILE TABS === */
    @media (max-width: 768px) {
        .navbar-container {
            padding: 6px 10px;
        }

        .navbar-links {
            justify-content: center; /* Pusatkan menu di HP */
            overflow-x: visible;
            white-space: normal;
            display: flex;
            gap: 12px;
        }

        /* Menyembunyikan teks menu pada HP */
        .navbar-links .nav-text {
            display: none;
        }

        .navbar-links a {
            font-size: 18px; /* Ukuran emoji nyaman disentuh */
            padding: 10px 14px;
            gap: 0;
        }
    }
`;
document.head.appendChild(navbarStyle);

// ========== 2. DETEKSI OTOMATIS HALAMAN AKTIF ==========
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop().split('?')[0].split('#')[0];

const getActive = (path) => currentPage === path ? 'active' : '';
const isHomeActive = currentPage === '' || currentPage === 'index.html' ? 'active' : '';

// ========== 3. INJEKSI HTML NAVBAR TABS RINGKAS ==========
document.getElementById('navbar').innerHTML = `
    <div class="navbar-container">
        <ul class="navbar-links">
            <li><a href="index.html" class="${isHomeActive}">🏛️ <span class="nav-text">Home</span></a></li>
            <li><a href="notulensi.html" class="${getActive('notulensi.html')}">📋 <span class="nav-text">Notulensi</span></a></li>
            <li><a href="notadinas.html" class="${getActive('notadinas.html')}">📄 <span class="nav-text">ND & Surat</span></a></li>
            <li><a href="rekap.html" class="${getActive('rekap.html')}">📊 <span class="nav-text">Rekap Notul</span></a></li>
            <li><a href="rekapnotadinas.html" class="${getActive('rekapnotadinas.html')}">📁 <span class="nav-text">Rekap ND & Surat</span></a></li>
        </ul>
    </div>
`;

// ========== INJEKSI FAVICON (LOGO TAB) SECARA OTOMATIS ==========
(function() {
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
    }
    favicon.href = 'logo-pu.png';
})();