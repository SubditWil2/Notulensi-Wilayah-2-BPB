// ── NAVBAR SUBDIT WIL 2 BPB ──
// Cara pakai:
// 1. Tambah <div id="navbar"></div> sebagai elemen PERTAMA di dalam <body>
// 2. Tambah <script src="navbar.js"></script> sebelum </body>
// 3. Hapus padding dari body, ganti dengan wrapper (lihat instruksi di bawah)

function loadNavbar() {
    const currentPage = window.location.pathname.split('/').pop() || 'landing.html';

    const navItems = [
        { href: 'landing.html',          label: '🏛️ Home',               id: 'landing.html' },
        { href: 'notulensi.html',            label: '📋 Notulensi',          id: 'notulensi.html' },
        { href: 'notadinas.html',        label: '📄 Nota Dinas & Surat', id: 'notadinas.html' },
        { href: 'rekap.html',            label: '📊 Rekap Notulensi',    id: 'rekap.html' },
        { href: 'rekapnotadinas.html',   label: '📁 Rekap Nota Dinas',   id: 'rekapnotadinas.html' },
    ];

    const navbarDiv = document.getElementById('navbar');
    if (!navbarDiv) return;

    navbarDiv.innerHTML = `
        <style>
            /* Reset body padding supaya navbar full width */
            body {
                padding-top: 0 !important;
            }

            /* Wrapper konten utama — ganti fungsi body padding lama */
            .page-wrapper {
                padding: 20px;
            }

            /* Khusus rekap yang pakai padding berbeda */
            .page-wrapper-rekap {
                padding: 16px;
            }

            #siteNavbar {
                background: linear-gradient(135deg, #1d355e 0%, #11223f 100%);
                border-bottom: 3px solid #f5b016;
                padding: 0 24px;
                display: flex;
                align-items: center;
                gap: 2px;
                position: sticky;
                top: 0;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                width: 100%;
            }

            #siteNavbar .nav-brand {
                color: #f5b016;
                font-weight: 700;
                font-size: 13px;
                padding: 13px 16px 13px 0;
                border-right: 1px solid rgba(245,176,22,0.3);
                margin-right: 6px;
                white-space: nowrap;
                font-family: 'Segoe UI', sans-serif;
                letter-spacing: 0.3px;
            }

            #siteNavbar a.nav-item {
                color: rgba(255,255,255,0.7);
                text-decoration: none;
                font-size: 12.5px;
                font-weight: 500;
                padding: 13px 13px;
                border-radius: 4px;
                transition: all 0.2s ease;
                white-space: nowrap;
                font-family: 'Segoe UI', sans-serif;
            }

            #siteNavbar a.nav-item:hover {
                color: #f5b016;
                background: rgba(245,176,22,0.1);
            }

            #siteNavbar a.nav-item.active {
                color: #f5b016;
                background: rgba(245,176,22,0.12);
                font-weight: 700;
            }

            @media (max-width: 768px) {
                #siteNavbar {
                    padding: 0 12px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                #siteNavbar::-webkit-scrollbar { display: none; }
                .page-wrapper, .page-wrapper-rekap { padding: 8px; }
            }
        </style>
        <nav id="siteNavbar">
            <div class="nav-brand">Subdit Wil 2 BPB</div>
            ${navItems.map(item => `
                <a href="${item.href}"
                   class="nav-item ${currentPage === item.id ? 'active' : ''}">
                    ${item.label}
                </a>
            `).join('')}
        </nav>
    `;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}