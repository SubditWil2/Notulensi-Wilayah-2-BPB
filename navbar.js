// ========== 1. INJEKSI CSS DESAIN TABS CENTERED & RINGKAS ==========
const navbarStyle = document.createElement('style');
navbarStyle.innerHTML = `
    .navbar-container {
        background-color: #11223f;
        border-bottom: 3px solid #f5b016;
        padding: 8px 16px;
        display: flex;
        justify-content: center; /* Pusatkan menu di tengah */
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10000;
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
            padding: 8px 10px;
        }

        .navbar-links {
            justify-content: flex-start; /* Rata kiri di HP untuk geser mulus */
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 2px;
            display: flex;
            gap: 6px;
            -webkit-overflow-scrolling: touch;
        }

        /* Sembunyikan scrollbar bawaan */
        .navbar-links::-webkit-scrollbar {
            display: none;
        }
        .navbar-links {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .navbar-links a {
            font-size: 12px;
            padding: 6px 10px;
        }
    }
`;
document.head.appendChild(navbarStyle);

// ========== 2. DETEKSI OTOMATIS HALAMAN AKTIF ==========
const currentPath = window.location.pathname;

// Mengambil hanya nama file di akhir path (misal: "rekapnotadinas.html")
// dan mengabaikan parameter query atau hash jika ada
const currentPage = currentPath.split('/').pop().split('?')[0].split('#')[0];

// Melakukan perbandingan secara presisi (exact match)
const getActive = (path) => currentPage === path ? 'active' : '';
const isHomeActive = currentPage === '' || currentPage === 'index.html' ? 'active' : '';

// ========== 3. INJEKSI HTML NAVBAR TABS RINGKAS ==========
document.getElementById('navbar').innerHTML = `
    <div class="navbar-container">
        <ul class="navbar-links">
            <li><a href="index.html" class="${isHomeActive}">🏛️ Home</a></li>
            <li><a href="notulensi.html" class="${getActive('notulensi.html')}">📋 Notulensi</a></li>
            <li><a href="notadinas.html" class="${getActive('notadinas.html')}">📄 ND & Surat</a></li>
            <li><a href="rekap.html" class="${getActive('rekap.html')}">📊 Rekap Notul</a></li>
            <li><a href="rekapnotadinas.html" class="${getActive('rekapnotadinas.html')}">📁 Rekap ND & Surat</a></li>
        </ul>
    </div>
`;