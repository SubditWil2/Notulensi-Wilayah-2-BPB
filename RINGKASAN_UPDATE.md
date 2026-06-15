# RINGKASAN UPDATE FITUR — Subdit Wil 2 BPB
# Untuk dilanjutkan di sesi berikutnya

---

## STATUS SAAT INI (Sudah Selesai)

### notulensi.html — Form Notulensi
- [x] OCR surat undangan via Gemini AI (model ringan: gemini-3.1-flash-lite dulu)
- [x] Multi API key fallback (GEMINI_API_KEYS array, dari Excel via PA)
- [x] Model fallback: OCR pakai OCR_MODELS, notulensi pakai MODELS_FALLBACK
- [x] Urutan fallback: model terbaik dulu di semua key, baru turun model
- [x] temperature: 0.1 di generationConfig untuk konsistensi output
- [x] Spinner animasi di tombol OCR saat memindai
- [x] Fix double event listener (hapus addEventListener click di btnOCR)
- [x] Fix setOCRStatus — 1 fungsi, id="ocrStatusBox"
- [x] removeFile() reset judul, instansi, tanggal, meetingId, passcode
- [x] state.meetingId & state.meetingPasscode (belakang layar, dari OCR)
- [x] AbortController untuk tombol batal proses
- [x] Warning panjang transkrip sebelum submit AI
- [x] Loading text dinamis saat proses AI (berbeda dengan submit manual)
- [x] sanitasiUntukPA() untuk bersihkan karakter ilegal sebelum kirim PA
- [x] formatUntukWord() — format teks dengan \n antar poin
- [x] isProcessing guard untuk cegah double submit AI
- [x] Deployed ke Cloudflare Pages via GitHub private repo

### Word Template (template_v3_multiline.docx)
- [x] pembukaanLengkap SDT → multiLine="1"
- [x] pembahasanLengkap SDT → multiLine="1"  
- [x] kesimpulanLengkap SDT → multiLine="1"
- [ ] MASALAH AKTIF: saat content control di-remove untuk numbering,
      semua teks jadi 1 paragraf (Plain Text limitation)
      → Belum ada solusi final, sedang diskusi pendekatan baru

### PA Flow
- [x] GEMINI_API_KEYS dibaca sebagai array dari 1 field geminiKey
      (bukan 3 field terpisah)
- [x] Schema JSON PA: sudah include meetingId, meetingPasscode
- [ ] \n di teksPembahasan/teksPembukaan masih jadi soft return di Word
      → Perlu replace di PA atau pendekatan lain

---

## SEDANG DIKERJAKAN (Phase 1)

### landing.html ← BARU DIBUAT
- [x] Dashboard utama dengan 5 kartu navigasi
- [x] Statistik bulan ini (notulensi count dari Excel)
- [x] Tema Navy & Gold konsisten dengan notulensi.html
- [ ] Statistik nota dinas & surat (Phase 3, tunggu sheet Excel baru)

### navbar.js ← BARU DIBUAT  
- [x] Navbar sticky konsisten di semua halaman
- [x] Active state otomatis berdasarkan URL
- [x] Responsive mobile
- [ ] Perlu ditambahkan ke notulensi.html dan rekap.html:
      ```html
      <!-- Tambah SEBELUM <div class="container"> -->
      <div id="navbar"></div>
      
      <!-- Tambah SEBELUM </body> -->
      <script src="navbar.js"></script>
      ```

### Update notulensi.html yang Perlu Dilakukan
- [ ] Tambah <div id="navbar"></div> sebelum .container
- [ ] Tambah <script src="navbar.js"></script> sebelum </body>
- [ ] Tombol "Lihat Rekap Data" di header bisa dihapus (sudah ada di navbar)

### Update rekap.html yang Perlu Dilakukan
- [ ] Tambah <div id="navbar"></div> sebelum konten utama
- [ ] Tambah <script src="navbar.js"></script> sebelum </body>

---

## BELUM DIKERJAKAN (Phase 2)

### notadinas.html — Form Nota Dinas & Surat Undangan
- [ ] Toggle tipe dokumen: [📄 Nota Dinas] [✉️ Surat Undangan]
- [ ] Field: Provinsi, Nama Kegiatan, Perihal/Judul, Tanggal, Nama Pembuat
- [ ] Tidak ada: upload surat undangan, OCR, tombol Kirim via AI
- [ ] Submit → PA flow baru → copy template kosong → simpan OneDrive → rekap Excel
- [ ] PA flow baru: "Buat Nota Dinas & Surat"
  - Trigger: HTTP
  - Copy template (nota_dinas atau surat_undangan tergantung jenisDokumen)
  - Simpan ke folder Provinsi/Kegiatan
  - Append row ke sheet/table baru di Excel

### rekap-notadinas.html
- [ ] Tab: [Nota Dinas] [Surat Undangan]
- [ ] Kolom: No, Perihal, Tanggal, Pembuat, Status, Nomor Surat, Link Draft, Link Final
- [ ] Modal upload TTD + input nomor surat
- [ ] Filter per provinsi, kegiatan, bulan, status

---

## BELUM DIKERJAKAN (Phase 3)

### Statistik Landing Page
- [ ] Load dari Excel: hitung nota dinas & surat bulan ini
- [ ] Perlu sheet/table baru di Excel: tbl_NotaDinas, tbl_SuratUndangan
- [ ] Update GET_DATA_FLOW_URL response untuk include data baru

### Modal Upload TTD + Nomor Surat (di rekap-notadinas.html)
- [ ] User klik row dokumen → modal muncul
- [ ] Input: Nomor Surat, Upload file TTD (PDF)
- [ ] PA action: update row Excel (isi nomor surat, link final)
- [ ] Status berubah: Draft → Final

### Status Tracking
- [ ] Kolom Status di Excel: Draft / Final
- [ ] Color coding di rekap: 🟡 Draft, 🟢 Final
- [ ] Filter per status

---

## FITUR DAFTAR UNDANGAN & DAFTAR HADIR (Direncanakan)

### Konsep
- Daftar Undangan: dari OCR surat (halaman lampiran)
- Daftar Hadir: dari analisis transkrip AI + matching dengan daftar undangan

### Format Output di Word
- Daftar Undangan: nomor + jabatan/nama + instansi
  - Pejabat: "Direktur Air Minum, Ditjen Cipta Karya"
  - Jafung Utama: "Ir. Iwan Suprijanto, ST.,MT. - Jafung Penata Kelola BPB Ahli Utama, Direktorat BPB"
- Daftar Hadir: sama format, hanya yang terdeteksi di transkrip
  - Eselon 1-3: jabatan/nama asli
  - Di bawah eselon 3: "Perwakilan [Instansi]"

### Yang Perlu Dibuat
- [ ] Update prompt OCR → tambah ekstrak daftarUndangan
- [ ] state.daftarUndangan & state.daftarHadir
- [ ] Prompt matching AI di submitRapatDenganAI()
- [ ] formatDaftarUntukWord() function
- [ ] 2 SDT baru di Word template: daftarUndangan, daftarHadir (multiLine="1")
- [ ] Update formData & PA schema

---

## MASALAH AKTIF YANG BELUM SELESAI

1. **Word Template Numbering**
   - Plain Text content control tidak support hard paragraph break
   - Saat control di-remove untuk buat numbering, semua jadi 1 paragraf
   - Opsi yang sedang dipertimbangkan:
     a. Generate docx langsung di browser (docxtemplater/pizzip)
     b. Azure Function untuk manipulasi XML
     c. Instruksikan user jangan remove control, edit di dalam saja

2. **\n di PA → Word**
   - \n dari JSON diterima PA tapi diinterpretasikan sebagai soft return
   - Dengan multiLine="1" sudah lebih baik tapi masih 1 paragraf saat control di-remove
   - Perlu solusi final

---

## STRUKTUR FILE DI REPO

```
/
├── notulensi.html          ← Form Notulensi (existing, perlu tambah navbar)
├── rekap.html          ← Rekap Notulensi (existing, perlu tambah navbar)
├── landing.html        ← Dashboard (BARU - sudah dibuat)
├── navbar.js           ← Shared navbar (BARU - sudah dibuat)
├── notadinas.html      ← Form Nota Dinas & Surat (Phase 2)
├── rekap-notadinas.html ← Rekap Nota Dinas (Phase 2)
├── prompt_notulensi.txt ← System prompt AI
├── logo-pu.png
└── template files (di OneDrive, bukan repo)
```

---

## KONFIGURASI PENTING

```javascript
// API Keys (dari Excel via PA)
let GEMINI_API_KEYS = []; // diisi loadDataFromExcel()

// Model fallback
const MODELS_FALLBACK = ['gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
const OCR_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-2.5-flash'];

// generationConfig
{
    temperature: 0.1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192
}

// PA Flow URLs (sudah ada di notulensi.html)
GET_DATA_FLOW_URL = '...' // ambil data Excel
FLOW_URL = '...'          // submit notulensi
```

---

## NEXT STEPS PRIORITAS

1. Tambah navbar ke notulensi.html dan rekap.html (2 baris HTML + 1 baris script)
2. Push ke GitHub → Cloudflare auto deploy
3. Test landing.html
4. Mulai notadinas.html (Phase 2)
