/**
 * NAVBAR.JS - Document Management System Subdit Wil 2
 * Update: Menambahkan menu Kronologis & Menyembunyikan Panduan
 */

(function () {
    // ========== 1. INJEKSI CSS KE HEAD ==========
    const navbarStyle = document.createElement('style');
    navbarStyle.innerHTML = `
        #navbar {
            position: sticky;
            top: 0;
            z-index: 99999;
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
            gap: 6px;
            list-style: none;
            width: 100%;
            max-width: 1200px;
            justify-content: center;
            padding: 0;
            margin: 0;
        }

        .navbar-links a {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 12.5px;
            font-weight: 600;
            padding: 8px 12px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.25s ease;
            white-space: nowrap;
        }

        .navbar-links a:hover, 
        .navbar-links a.active {
            color: #11223f !important;
            background-color: #f5b016 !important;
            font-weight: 700;
        }

        /* === RESPONSIVE MOBILE (Optimal untuk 6 Menu) === */
        @media (max-width: 768px) {
            .navbar-container {
                padding: 4px 6px;
            }

            .navbar-links {
                gap: 2px;
                justify-content: space-evenly;
            }

            .navbar-links .nav-text {
                display: none; /* Sembunyikan teks di HP agar 6 icon muat satu baris */
            }

            .navbar-links a {
                font-size: 18px;
                padding: 10px 8px;
                gap: 0;
            }
        }

        @media (max-width: 360px) {
            .navbar-links a {
                padding: 8px 6px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(navbarStyle);

    // ========== 2. LOGIKA DETEKSI HALAMAN AKTIF ==========
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().split('?')[0].split('#')[0];

    const getActive = (path) => (currentPage === path) ? 'active' : '';
    const isHomeActive = (currentPage === '' || currentPage === 'index.html') ? 'active' : '';

    // ========== 3. INJEKSI HTML NAVBAR ==========
    const navHTML = `
        <div class="navbar-container">
            <ul class="navbar-links">
                <li><a href="index.html" class="${isHomeActive}" title="Dashboard Utama">
                    <span>🏛️</span> <span class="nav-text">Home</span>
                </a></li>
                
                <li><a href="notulensi.html" class="${getActive('notulensi.html')}" title="Buat Notulensi">
                    <span>📋</span> <span class="nav-text">Notulensi</span>
                </a></li>
                
                <li><a href="notadinas.html" class="${getActive('notadinas.html')}" title="Buat ND & Surat">
                    <span>📄</span> <span class="nav-text">ND & Surat</span>
                </a></li>
                
                <li><a href="rekap.html" class="${getActive('rekap.html')}" title="Rekap Notulensi">
                    <span>📊</span> <span class="nav-text">Rekap Notul</span>
                </a></li>
                
                <li><a href="rekapnotadinas.html" class="${getActive('rekapnotadinas.html')}" title="Rekap ND & Surat">
                    <span>📁</span> <span class="nav-text">Rekap ND</span>
                </a></li>

                <li><a href="kronologis.html" class="${getActive('kronologis.html')}" title="Kronologis Kegiatan">
                    <span>⏳</span> <span class="nav-text">Kronologis</span>
                </a></li>
            </ul>
        </div>
    `;

    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        navbarElement.innerHTML = navHTML;
    }

    // ========== 4. AUTO-INJEKSI FAVICON ==========
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
    }
    favicon.href = 'logo-pu.png';

})();