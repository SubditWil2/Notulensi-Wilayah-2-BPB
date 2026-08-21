/**
 * GENERATOR TEMPLATE NOTULENSI RESMI DITJEN CIPTA KARYA KEMENTERIAN PU
 * Mengonversi output JSON dari AI + Metadata Form menjadi HTML standar siap cetak / PDF.
 */
function generateNotulensiHtml(ai, meta) {
    // 1. Format Tanggal Indonesia (Contoh: Kamis, 20 Agustus 2026)
    let tglFormatted = meta.tanggalRapat || '-';
    let hariFormatted = '-';

    if (meta.tanggalRapat) {
        try {
            const rawDate = meta.tanggalRapat.replace(/\./g, '-');
            const dateObj = new Date(rawDate);
            const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

            if (!isNaN(dateObj.getTime())) {
                hariFormatted = namaHari[dateObj.getDay()];
                tglFormatted = `${dateObj.getDate()} ${namaBulan[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            }
        } catch (e) {
            console.warn("Gagal parsing tanggal:", e);
        }
    }

    // 2. Rakit Bagian Pembukaan (Nomor 1)
    let pembukaanHtml = '';
    (ai.grupPembukaan || []).forEach(p => {
        const lines = (p.teksPembukaan || '').split('\n').filter(l => l.trim()).map(l => `<li>${l.replace(/^\d+[\s.]*/, '')}</li>`).join('');
        pembukaanHtml += `
            <p class="pembicara-text">${p.namaPembicara}</p>
            <ol>${lines}</ol>
        `;
    });

    // 3. Rakit Bagian Poin Pembahasan (Nomor 2)
    let pembahasanHtml = '';
    let lastTopik = '';
    (ai.grupPembahasan || []).forEach(b => {
        // Cek Topik Makro (Cukup muncul 1x di atas per kelompok topik)
        if (b.topikMakro && b.topikMakro.trim() !== lastTopik) {
            pembahasanHtml += `<p class="topik-makro-text">${b.topikMakro.toUpperCase()}</p>`;
            lastTopik = b.topikMakro.trim();
        }

        // Pisahkan narasi utama dan blok "Tanggapan"
        const teks = b.teksPembahasan || '';
        const parts = teks.split(/\n(?=Tanggapan\s)/i);
        const mainText = parts[0] || '';
        const tanggapanTexts = parts.slice(1);

        const mainLines = mainText.split('\n').filter(l => l.trim()).map(l => `<li>${l.replace(/^\d+[\s.]*/, '')}</li>`).join('');

        let tanggapanHtml = '';
        tanggapanTexts.forEach(t => {
            const tLines = t.split('\n').filter(l => l.trim());
            const tHeader = tLines[0] || 'Tanggapan:';
            const tItems = tLines.slice(1).map(l => `<li>${l.replace(/^[a-zA-Z]+[\s.]*/, '')}</li>`).join('');
            tanggapanHtml += `
                <p class="tanggapan-text">${tHeader}</p>
                <ol style="list-style-type: lower-alpha;">${tItems}</ol>
            `;
        });

        pembahasanHtml += `
            <div class="speaker-group">
                <p class="pembicara-text">${b.namaPembicara}</p>
                <ol>${mainLines}</ol>
                ${tanggapanHtml}
            </div>
        `;
    });

    // 4. Rakit Bagian Kesimpulan (Nomor 3)
    let kesimpulanHtml = '';
    const kList = (ai.grupKesimpulan || []).map(k => `<li>${k.teksKesimpulan.replace(/^\d+[\s.]*/, '')}</li>`).join('');
    kesimpulanHtml = `<ol>${kList}</ol>`;

    // 5. Rakit Lampiran Surat Undangan (Base64 Image)
    let lampiranUndanganImg = '<p style="font-size: 10pt; color: #64748b; font-style: italic;">(Tidak ada lampiran surat undangan)</p>';
    if (meta.suratBase64 && meta.suratTipe) {
        lampiranUndanganImg = `<img class="lampiran-img" src="data:${meta.suratTipe};base64,${meta.suratBase64}" alt="Surat Undangan">`;
    }

    // 6. Satukan ke dalam Template HTML & CSS Master
    return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Risalah Rapat - ${meta.judulRapat || 'Notulensi'}</title>
    <style>
    * { font-family: Arial, Helvetica, sans-serif !important; }
        html, body, table, tbody, tr, td, th, p, div, span, ol, li, b, strong { 
            font-family: Arial, Helvetica, sans-serif !important; 
        }
        @page { 
    size: A4; 
    margin: 10mm; 
}
body { 
    font-family: Arial, Helvetica, sans-serif; 
    font-size: 10pt; 
    line-height: 1.35; 
    color: #000; 
    background-color: #fff; 
    margin: 0 !important; 
    padding: 0 !important; 
    width: 100% !important; 
    box-sizing: border-box; 
}
.doc-container { 
    width: 100% !important; 
    max-width: 100% !important; 
    margin: 0 !important; 
    padding: 0 !important; 
}
        
        table.tabel-header { width: 100% !important; border-collapse: collapse !important; border: 1.5px solid #000 !important; table-layout: fixed !important; margin-bottom: 0 !important; }
        table.tabel-header td { border: 1px solid #000 !important; padding: 6px 8px !important; vertical-align: top !important; box-sizing: border-box !important; }
        
        table.tabel-isi { width: 100% !important; border-collapse: collapse !important; border: 1.5px solid #000 !important; border-top: none !important; margin-top: -1.5px !important; table-layout: fixed !important; }
        table.tabel-isi td { border: 1px solid #000 !important; padding: 6px 8px !important; vertical-align: top !important; box-sizing: border-box !important; }
        
        table.tabel-isi thead { display: table-header-group; }
        table.tabel-isi thead tr th { border: none; border-top: 1.5px solid #000; padding: 0; height: 0; }
        table.tabel-isi tfoot { display: table-footer-group; }
        table.tabel-isi tfoot tr td { border: none; border-top: 1.5px solid #000; padding: 0; height: 0; }

        .col-nomor-kunci { width: 30px !important; max-width: 30px !important; min-width: 30px !important; text-align: center !important; font-weight: bold !important; font-size: 10pt !important; padding: 6px 2px !important; }
        .header-title { text-align: center !important; font-weight: bold !important; font-size: 11pt !important; text-transform: uppercase !important; padding: 6px !important; }
        .header-subtitle { text-align: center !important; font-weight: bold !important; font-size: 10pt !important; padding: 6px !important; }
        .meta-label { font-weight: bold !important; text-transform: uppercase !important; font-size: 9.5pt !important; margin-bottom: 3px !important; }
        .section-header-cell { text-align: center !important; font-weight: bold !important; font-size: 10pt !important; text-transform: uppercase !important; padding: 5px !important; letter-spacing: 0.5px; }
        
        .topik-makro-text { text-align: center !important; font-weight: bold !important; text-transform: uppercase !important; font-size: 10pt !important; margin: 14px 0 6px 0 !important; }
        .topik-makro-text:first-child { margin-top: 0 !important; }
        .pembicara-text { font-weight: bold !important; font-size: 10pt !important; margin: 8px 0 4px 0 !important; }
        .tanggapan-text { font-weight: bold !important; margin: 8px 0 3px 0 !important; }
        .speaker-group { margin-bottom: 14px; }
        .speaker-group:last-child { margin-bottom: 0; }
        
        ol { margin: 0 !important; padding-left: 20px !important; }
        ol li { margin-bottom: 3px !important; text-align: justify !important; }
        ol ol { padding-left: 18px !important; list-style-type: lower-alpha !important; }
        p { margin: 0 0 3px 0 !important; text-align: justify !important; }
        
        .page-break { page-break-before: always; break-before: page; margin-top: 30px; }
        .lampiran-container { text-align: center; padding-top: 20px; }
        .lampiran-title { font-weight: bold; font-size: 12pt; text-transform: uppercase; margin-bottom: 6px; }
        .lampiran-subtitle { font-weight: bold; font-size: 11pt; margin-bottom: 15px; }
        .lampiran-img { max-width: 95% !important; height: auto !important; border: 1px solid #000; display: block; margin: 10px auto; }
    </style>
</head>
<body>
<div class="doc-container">

    <!-- TABEL 1: HEADER & METADATA -->
    <table class="tabel-header">
        <tr><td colspan="6" class="header-title">RISALAH RAPAT</td></tr>
        <tr><td colspan="6" class="header-subtitle">${meta.judulRapat || ''}</td></tr>
        <tr>
            <td colspan="2" style="width: 34%;">
                <div class="meta-label">HARI/TANGGAL</div>
                ${hariFormatted}<br>${tglFormatted}
            </td>
            <td colspan="2" style="width: 33%;">
                <div class="meta-label">TEMPAT</div>
                Zoom Meeting<br>Meeting ID: ${meta.meetingId || '-'}<br>Passcode: ${meta.meetingPasscode || '-'}
            </td>
            <td colspan="2" style="width: 33%;">
                <div class="meta-label">PEMIMPIN RAPAT</div>
                ${meta.instansiPengundang || '-'}
            </td>
        </tr>
        <tr>
            <td colspan="3" style="width: 50%;">
                <p style="text-align: center; margin-bottom: 4px;"><strong>UNDANGAN</strong></p>
                (Terlampir)
            </td>
            <td colspan="3" style="width: 50%;">
                <p style="text-align: center; margin-bottom: 4px;"><strong>DAFTAR HADIR</strong></p>
                (Terlampir)
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <strong>LINK REKAMAN ZOOM</strong><br>-
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <strong>Tujuan Rapat :</strong><br>
                <p>${ai.tujuanRapat || ''}</p>
            </td>
        </tr>
    </table>

    <!-- TABEL 2: ISI NOTULENSI -->
    <table class="tabel-isi">
        <colgroup><col style="width: 30px;"><col style="width: auto;"></colgroup>
        <thead><tr><th colspan="2"></th></tr></thead>
        <tfoot><tr><td colspan="2"></td></tr></tfoot>
        <tbody>
            <tr><td colspan="2" class="section-header-cell">PEMBUKAAN</td></tr>
            <tr>
                <td class="col-nomor-kunci">1.</td>
                <td>${pembukaanHtml}</td>
            </tr>
            <tr><td colspan="2" class="section-header-cell">POIN – POIN PEMBAHASAN</td></tr>
            <tr>
                <td class="col-nomor-kunci">2.</td>
                <td>${pembahasanHtml}</td>
            </tr>
            <tr><td colspan="2" class="section-header-cell">KESIMPULAN DAN TINDAK LANJUT</td></tr>
            <tr>
                <td class="col-nomor-kunci">3.</td>
                <td>${kesimpulanHtml}</td>
            </tr>
        </tbody>
    </table>

    <!-- HALAMAN LAMPIRAN -->
    <div class="page-break"></div>
    <div class="lampiran-container">
        <div class="lampiran-title">LAMPIRAN</div>
        <div class="lampiran-subtitle">A. Surat Undangan</div>
        ${lampiranUndanganImg}
    </div>

    <div class="page-break"></div>
    <div class="lampiran-container">
        <div class="lampiran-subtitle">B. Presensi / Daftar Hadir</div>
    </div>

    <div class="page-break"></div>
    <div class="lampiran-container">
        <div class="lampiran-subtitle">C. Dokumentasi Foto Rapat</div>
    </div>

</div>
</body>
</html>
    `;
}