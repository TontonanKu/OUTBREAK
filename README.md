# OUTBREAK website

Website resmi OUTBREAK (RRBY Studio). Isinya file statis biasa (HTML, CSS, JS), tanpa build dan tanpa server.

- `index.html` : struktur halaman
- `css/style.css` : tampilan (warna dan bentuk dari OUTBREAK UI KIT v9)
- `js/main.js` : semua isi yang bisa diganti ada di bagian atas file ini
- `assets/` : gambar, sprite, audio, foto tim
- `CNAME` : subdomain untuk GitHub Pages (`outbreak.zura-w.my.id`)

## Buka di komputer sendiri

Klik dua kali `index.html`. Atau, biar sama persis dengan versi online, jalankan server kecil dari folder ini, lalu buka `http://localhost:8000`:

```
npx serve -l 8000 .
```

## Mengganti isi

Semua yang perlu diubah ada di bagian atas `js/main.js`:

| Bagian | Isi |
|---|---|
| `CONFIG.links` | Discord, YouTube, Facebook, email, press kit. Link yang masih kosong otomatis tampil "Coming soon". |
| `CONFIG.stores` | Tombol Windows PC / itch.io / Google Play. Link yang masih kosong otomatis tampil "Coming soon". |
| `CONFIG.trailerYouTubeId` | ID video trailer YouTube |
| `CONFIG.newsletterAction` | URL form newsletter (misalnya Formspree) |
| `HEROES` | Data hero. `soon: true` = tampil siluet + "Coming soon". |
| `ZONES`, `ROADMAP`, `NEWS`, `TEAM` | Misi, roadmap, berita, tim |

Setelah mengubah CSS atau JS, naikkan angka `?v=` di `index.html` (misalnya `1.2.4` jadi `1.2.5`) supaya browser pengunjung tidak memakai file lama.

## Online di GitHub Pages + subdomain

1. Buat repository baru di GitHub, misalnya `outbreak-website`. Untuk akun gratis, repository-nya harus **Public**.
2. Upload isi folder ini (bukan foldernya) ke branch `main`, sehingga `index.html` ada di paling atas repository.
3. Di repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pilih `main` dan `/ (root)`, lalu **Save**.
4. Masih di halaman Pages, isi **Custom domain** dengan `outbreak.zura-w.my.id`, lalu **Save**. File `CNAME` sudah ada, jadi isinya akan sama.
5. Di panel DNS domain `zura-w.my.id` (tempat domain dibeli, atau Cloudflare kalau nameserver sudah dipindah ke sana), tambahkan:

   | Type | Name / Host | Value / Target | TTL |
   |---|---|---|---|
   | CNAME | `outbreak` | `USERNAME.github.io` | Auto / 3600 |

   Ganti `USERNAME` dengan username GitHub pemilik repository (tanpa nama repo di belakangnya). Kalau pakai Cloudflare, set **Proxy status: DNS only** (awan abu-abu).
6. Tunggu DNS aktif (biasanya beberapa menit, paling lama sekitar 24 jam). Kalau GitHub Pages sudah menulis "DNS check successful", centang **Enforce HTTPS**.
7. (Disarankan) Verifikasi domain di **GitHub → Settings (akun) → Pages → Add a domain** dengan record TXT yang diberikan GitHub, supaya subdomain ini tidak bisa dipakai repository orang lain.

Setiap kali ada perubahan yang di-push ke `main`, website online ikut terupdate dalam 1-2 menit.

## File download game

GitHub menolak file di atas 100 MB. Kalau zip build Windows lebih besar dari itu, upload ke itch.io atau GitHub Releases, lalu tempel link-nya di `CONFIG.stores`.
