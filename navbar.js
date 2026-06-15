// ========== 1. INJEKSI CSS RESPONSIF SECARA OTOMATIS ==========
const navbarStyle = document.createElement('style');
navbarStyle.innerHTML = `
    .navbar-container {
        background-color: #11223f;
        border-bottom: 3px solid #f5b016;
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .navbar-brand {
        color: #f5b016;
        font-weight: 700;
        font-size: 15px;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
    }

    .navbar-links {
        display: flex;
        gap: 12px;
        align-items: center;
        list-style: none;
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

    /* === RESPONSIVE MOBILE NAVBAR (SWIPEABLE) === */
    @media (max-width: 768px) {
        .navbar-container {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 15px;
            gap: 10px;
        }

        .navbar-brand {
            font-size: 14px;
        }

        .navbar-links {
            width: 100%;
            overflow-x: auto; /* Aktifkan geser horizontal di HP */
            white-space: nowrap;
            padding-bottom: 4px;
            display: flex;
            gap: 8px;
            -webkit-overflow-scrolling: touch; /* Geser halus di iOS */
        }

        /* Sembunyikan scrollbar bawaan browser demi estetika */
        .navbar-links::-webkit-scrollbar {
            display: none;
        }
        .navbar-links {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        .navbar-links a {
            font-size: 12px;
            padding: 6px 10px;
        }
    }
`;
document.head.appendChild(navbarStyle);

// ========== 2. DETEKSI OTOMATIS HALAMAN AKTIF (ACTIVE TAB) ==========
const currentPath = window.location.pathname;
const getActive = (path) => currentPath.includes(path) ? 'active' : '';

// Tentukan tab aktif untuk Home/Landing Page
const isHomeActive = currentPath.endsWith('/') || currentPath.endsWith('index.html') ? 'active' : '';

// ========== 3. INJEKSI HTML NAVBAR ==========
document.getElementById('navbar').innerHTML = `
    <div class="navbar-container">
        <a href="index.html" class="navbar-brand">
            🚧 Subdit Wil 2 BPB
        </a>
        <ul class="navbar-links">
            <li><a href="index.html" class="${isHomeActive}">🏛️ Home</a></li>
            <li><a href="notulensi.html" class="${getActive('notulensi.html')}">📋 Notulensi</a></li>
            <li><a href="notadinas.html" class="${getActive('notadinas.html')}">📄 Nota Dinas / Surat</a></li>
            <li><a href="rekap.html" class="${getActive('rekap.html')}">📊 Rekap Notulensi</a></li>
            <li><a href="rekapnotadinas.html" class="${getActive('rekapnotadinas.html')}">📁 Rekap ND & Surat</a></li>
        </ul>
    </div>
`;