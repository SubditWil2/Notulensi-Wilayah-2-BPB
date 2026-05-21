# 🇮🇩 Portal Notulensi & Dashboard Dokumentasi - Subdit Wilayah 2 BPB

Selamat datang di **Portal Notulensi dan Dashboard Dokumentasi Subdit Wilayah 2 BPB, Kementerian Pekerjaan Umum dan Perumahan Rakyat**. 

Sistem ini adalah aplikasi portal mandiri (custom hybrid web portal) yang dirancang untuk mengotomatisasi penginputan notulensi rapat, pembentukan struktur folder kerja terstandar di OneDrive, pengisian otomatis berkas (*template*) Microsoft Word, dan menyediakan dashboard pemantauan (rekap) interaktif yang aman, cepat, dan hemat kuota harian.

---

## 🏗️ Arsitektur & Alur Kerja Sistem

Sistem ini membagi tugas secara dinamis antara antarmuka pengguna (*Frontend*) dan mesin otomatisasi awan (*Backend*):
[ Frontend: HTML/CSS/JS ] ──(HTTP Secure Webhook)──> [ Backend: Microsoft Power Automate ]
index.html (Input Form) - Flow 1: Kirim Form & Isi Word
rekap.html (Dashboard Admin) - Flow 2: Pembuat Paket Folder
- Flow 3: Penghapus Data (REST API)
│
├──> [ Excel Online Database ]
└──> [ OneDrive for Business ]

---

## 🌟 Fitur Utama Aplikasi

### 1. Antarmuka Formulir Input (`index.html`)
*   **Identitas Resmi Kementerian PUPR:** Didesain eksklusif menggunakan kode warna resmi PUPR (Biru Navy `#1D355E` dan Kuning Emas `#F5B016`) lengkap dengan logo resmi dan watermark siluet baling-baling PU di latar belakang.
*   **Dropdown Sinkron Dinamis (Dependent Dropdown):** Pilihan dropdown "Provinsi" ditarik langsung secara *live* dari tabel master Excel, dan pilihan "Nama Kegiatan" otomatis menyaring secara instan hanya menampilkan kegiatan yang sesuai dengan provinsi terpilih.
*   **Penambahan Kegiatan Baru On-The-Fly:** Menyediakan tombol `+ Tambah` yang memungkinkan user mengetikkan nama kegiatan baru secara instan jika belum terdaftar di database Excel.
*   **Validasi Keamanan Unggah Berkas:** Area drag-and-drop kustom untuk Surat Undangan dengan pembatasan ketat ukuran file (Maksimal 5MB) dan jenis file (Hanya PDF/JPG).
*   **Pop-Up Interaktif 5-State (Modal):** Mengunci layar saat pengiriman form sedang diproses di cloud, menampilkan pesan progres dinamis ("Menyusun template...", "Mengunggah file..."), dan menampilkan hasil akhir Sukses atau Gagal.
*   **Generator Tautan WhatsApp & URL Shortener:** Otomatis memperpendek tautan OneDrive menggunakan API TinyURL gratis, membuat draf teks notifikasi siap pakai untuk WhatsApp lengkap dengan tebal-miring format WA (`*Judul Rapat*`), dan menyediakan tombol salin (*copy-to-clipboard*) sekali klik.

### 2. Dashboard Pemantauan Berkas (`rekap.html`)
*   **Pencarian Real-Time (Instant Search):** Kolom pencarian dinamis yang menyaring baris data secara instan saat pengguna mengetik, tanpa perlu memuat ulang halaman (*client-side filtering*).
*   **Penyaring Wilayah (Province Filter):** Memungkinkan penyaringan data seluruh tabel berdasarkan provinsi terpilih.
*   **Akses Dokumen Sekali Klik:** Tombol `📄 Buka` yang dinamis di setiap baris tabel, mengarahkan pengguna langsung ke file PDF/Word asli di OneDrive menggunakan tautan pendek TinyURL.
*   **Pop-Up Konfirmasi Hapus 3-Pilihan:** Tombol merah `🗑️ Hapus` di setiap baris yang membuka modal konfirmasi dengan opsi:
    1.  *Hapus Baris Excel Saja:* Hanya menghapus rekam data di Excel Rekap.
    2.  *Hapus Excel & Berkas OneDrive:* Menghapus baris Excel dan otomatis melenyapkan folder rapat spesifik terkait di OneDrive.
    3.  *Batal:* Membatalkan proses dan menutup modal.
*   **Sinkronisasi State Hapus:** Kotak pemroses hapus terintegrasi langsung dengan status eksekusi Power Automate (Loading -> Sukses/Gagal).

---

## ⚙️ Detail Konfigurasi Power Automate (Backend)

### Flow 1: Kirim Form & Isi Word
Menerima payload JSON berisi parameter form dan file dalam format Base64.
*   **Rumus Konversi Tanggal Indonesia:**
    `concat(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'dd'), ' ', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '01'), 'Januari', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '02'), 'Februari', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '03'), 'Maret', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '04'), 'April', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '05'), 'Mei', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '06'), 'Juni', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '07'), 'Juli', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '08'), 'Agustus', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '09'), 'September', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '10'), 'Oktober', if(equals(formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'MM'), '11'), 'November', 'Desember'))))))))))), ' ', formatDateTime(replace(triggerBody()?['tanggalRapat'], '.', '-'), 'yyyy'))`
*   **Rumus Deteksi Hari Indonesia:**
    `if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 0), 'Minggu', if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 1), 'Senin', if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 2), 'Selasa', if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 3), 'Rabu', if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 4), 'Kamis', if(equals(dayOfWeek(replace(triggerBody()?['tanggalRapat'], '.', '-')), 5), 'Jumat', 'Sabtu'))))))`

### Flow 2: Pembuat Paket Folder Kegiatan (Trik Looping 1-Aksi)
*   **Logika Ringkas:** Menggunakan satu variabel berisi daftar nama folder (`DaftarFolderUtama` & `DaftarSubFolderSurat`) dan memprosesnya menggunakan aksi **"Apply to each"** dengan satu perintah pembuatan folder. Ini menghemat puluhan kartu aksi menjadi hanya 3 langkah bersih.
*   **Struktur Folder yang Terbentuk:**
    ```
    📂 SUBDIT WILAYAH 2 BPB
       📂 [Provinsi]
          📂 [Nama Kegiatan]
             ├── A. Dasar Pelaksanaan
             ├── B. Dokumen Perencanaan
             ├── C. Dok. Pelaksanaan
             ├── D. Dok. Pengawasan
             ├── E. Laporan Monev dan Progres
             ├── F. Surat, ND, Notulensi
             │     ├── a. Surat
             │     ├── b. Nota Dinas
             │     └── c. Notulensi (Tempat penyimpanan file PDF undangan otomatis)
             ├── G. Kronologis
             ├── H. Profil
             ├── I. Serah Terima Aset
             ├── J. Administrasi Bangunan Gedung
             └── K. Audit APIP
    ```

### Flow 3: Penghapus Data (REST API - SharePoint Send HTTP)
Menggunakan REST API SharePoint untuk menghapus folder secara langsung via jalur teks (*Path*) tanpa membutuhkan ID sistem, yang terbukti bebas dari hambatan error tipe data berkas kementerian.
*   **Metode:** `POST`
*   **Jalur Penghapusan Folder Rapat Spesifik:**
    `_api/web/GetFolderByServerRelativeUrl('/personal/teuku_zaqirul_pu_go_id/Documents/SUBDIT WILAYAH 2 BPB/@{triggerBody()?['provinsi']}/@{triggerBody()?['namaKegiatan']}/F. Surat, ND, Notulensi/c. Notulensi/@{triggerBody()?['tanggalRapat']} - @{triggerBody()?['judulRapat']}')`
*   **HTTP Headers (Bypass):**
    *   `X-HTTP-Method` : `DELETE`
    *   `IF-MATCH` : `*`  *(Pastikan tidak ada karakter enter/baris baru setelah tanda bintang).*

---

## 🚀 Panduan Penerapan (Deployment)

Karena server SharePoint kementerian terkunci kuota penyimpanannya dan menolak unggah file `.aspx` (kebijakan NoScript), gunakan metode **Tombol Penghubung** berikut:

### 1. Letakkan Form di GitHub Pages / Netlify (100% Gratis)
1.  Buat folder baru di komputer Anda, masukkan file **`index.html`** (ganti nama dari `form_notulensi.html`), **`rekap.html`**, dan gambar **`logo-pu.png`** ke dalamnya secara bersamaan.
2.  Unggah folder tersebut ke **Netlify Drop** atau repositori **GitHub Pages** Anda.
3.  Anda akan mendapatkan URL aman (HTTPS) gratis untuk form input dan dashboard rekap Anda.

### 2. Sambungkan di SharePoint Pages
1.  Buka portal SharePoint tim Anda yang biasa digunakan oleh staf.
2.  Buat Halaman Baru (**New Page**).
3.  Tambahkan komponen **Button (Tombol)** atau **Quick Links (Tautan Cepat)**.
4.  Beri nama tombol tersebut: **`Portal Layanan Notulensi Subdit 2`**, dan arahkan tautannya ke link Netlify/GitHub yang Anda dapatkan di langkah 1.
5.  Klik **Publish**. Staf Anda sekarang dapat mengakses form dan dashboard yang indah ini dengan sangat mudah, aman, resmi, dan gratis!

---
*Dokumentasi ini dibuat sebagai panduan standar operasional sistem (SOP) aplikasi Notulensi Subdit Wilayah 2 BPB.*