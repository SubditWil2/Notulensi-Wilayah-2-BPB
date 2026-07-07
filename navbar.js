/**
 * NAVBAR.JS - Document Management System Subdit Wil 2
 * Mencakup: CSS Injection, HTML Injection, Active Page Detection, & Favicon
 */

(function () {
    // ========== 1. INJEKSI CSS KE HEAD ==========
    const navbarStyle = document.createElement('style');
    navbarStyle.innerHTML = `
        /* Sticky Navbar Styling */
        #navbar {
            position: sticky;
            top: 0;
            z-index: 99999; /* Memastikan di atas modal manapun */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .navbar-container {
            background-color: #11223f; /* PUPR Navy */
            border-bottom: 3.5px solid #f5b016; /* PUPR Gold */
            padding: 5px 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .navbar-links {
            display: flex;
            gap: 6px; /* Jarak antar menu */
            list-style: none;
            width: 100%;
            max-width: 1100px;
            justify-content: center;
            padding: 0;
            margin: 0;
        }

        .navbar-links li {
            margin: 0;
        }

        .navbar-links a {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            padding: 8px 12px;
            border-radius: 8px; /* Rounded Corner Rectangle */
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.25s ease;
            white-space: nowrap;
        }

        /* Hover & Active State */
        .navbar-links a:hover, 
        .navbar-links a.active {
            color: #11223f !important;
            background-color: #f5b016 !important;
            transform: translateY(-1px);
        }

        .navbar-links a:active {
            transform: scale(0.96);
        }

        /* === RESPONSIVE MOBILE (Untuk 6 Menu) === */
        @media (max-width: 768px) {
            .navbar-container {
                padding: 4px 6px;
            }

            .navbar-links {
                gap: 3px;
                justify-content: space-evenly;
                /* Fail-safe jika layar terlalu sempit: bisa scroll horizontal */
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }

            /* Sembunyikan teks menu di HP, sisakan icon saja agar muat */
            .navbar-links .nav-text {
                display: none;
            }

            .navbar-links a {
                font-size: 18px; /* Ukuran icon emoji diperbesar agar nyaman disentuh */
                padding: 10px 10px;
                gap: 0;
            }
        }

        /* Support untuk layar sangat kecil (iPhone SE dsb) */
        @media (max-width: 360px) {
            .navbar-links a {
                padding: 8px 8px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(navbarStyle);

    // ========== 2. LOGIKA DETEKSI HALAMAN AKTIF ==========
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().split('?')[0].split('#')[0];

    // Fungsi pembantu menentukan kelas aktif
    const getActive = (path) => (currentPage === path) ? 'active' : '';
    // Khusus Home (jika path kosong atau index.html)
    const isHomeActive = (currentPage === '' || currentPage === 'index.html') ? 'active' : '';

    // ========== 3. INJEKSI HTML NAVBAR ==========
    const navHTML = `
        <div class="navbar-container">
            <ul class="navbar-links">
                <li><a href="index.html" class="${isHomeActive}" title="Dashboard Utama">
                    <span class="nav-icon">🏛️</span> 
                    <span class="nav-text">Home</span>
                </a></li>
                
                <li><a href="notulensi.html" class="${getActive('notulensi.html')}" title="Buat Notulensi Rapat">
                    <span class="nav-icon">📋</span> 
                    <span class="nav-text">Notulensi</span>
                </a></li>
                
                <li><a href="notadinas.html" class="${getActive('notadinas.html')}" title="Buat Nota Dinas / Surat">
                    <span class="nav-icon">📄</span> 
                    <span class="nav-text">ND & Surat</span>
                </a></li>
                
                <li><a href="rekap.html" class="${getActive('rekap.html')}" title="Rekap Notulensi">
                    <span class="nav-icon">📊</span> 
                    <span class="nav-text">Rekap Notul</span>
                </a></li>
                
                <li><a href="rekapnotadinas.html" class="${getActive('rekapnotadinas.html')}" title="Rekap Nota Dinas / Surat">
                    <span class="nav-icon">📁</span> 
                    <span class="nav-text">Rekap ND</span>
                </a></li>
                
                <li><a href="tutorial.html" class="${getActive('tutorial.html')}" title="Panduan Penggunaan & SOP">
                    <span class="nav-icon">💡</span> 
                    <span class="nav-text">Panduan</span>
                </a></li>
            </ul>
        </div>
    `;

    // Masukkan ke elemen dengan id="navbar"
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        navbarElement.innerHTML = navHTML;
    } else {
        console.warn("Navbar container with id 'navbar' not found. Please add <div id='navbar'></div> to your HTML.");
    }

    // ========== 4. AUTO-INJEKSI FAVICON ==========
    // Memastikan logo PU muncul di tab browser secara otomatis
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
    }
    favicon.href = 'logo-pu.png';

})();