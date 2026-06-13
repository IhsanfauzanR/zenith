# Zenith — Prototipe Interaktif

Aplikasi mobile manajemen tugas berbasis kesejahteraan (wellbeing) untuk tugas besar mata kuliah **Interaksi Manusia & Komputer**.

Konsep inti: **Mental Thermostat**. Setiap hari user memilih tingkat energi (Cerah / Berawan / Redup), dan aplikasi beradaptasi — jumlah tugas, tone bahasa, dan ukuran kartu mengikuti energi yang dipilih. Tujuannya mengurangi beban kognitif dan rasa bersalah, bukan memaksa produktivitas.

## Stack

- React 19 + Vite
- CSS Modules / plain CSS dengan CSS variables (design tokens)
- Context API + useReducer untuk state global
- Tanpa backend — semua data dummy di `src/data/data.js`
- Mobile-first (390px) dibungkus device frame

## Cara setup di laptop kamu

Pastikan **Node.js 18+** sudah terinstall ([cek di nodejs.org](https://nodejs.org/)).

```bash
# 1. Clone repo
git clone https://github.com/IhsanfauzanR/-zenith.git
cd -zenith

# 2. Install dependencies (sekali saja, ~1-2 menit)
npm install

# 3. Jalankan dev server
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173/`) di browser.

### Buka di HP (untuk demo)

```bash
npm run dev -- --host
```

Akan tampil dua URL:
- `Local`   — buka di laptop
- `Network` — buka di HP (HP harus se-WiFi dengan laptop, mis. `http://192.168.x.x:5173/`)

## Cara pakai aplikasi

1. Lewati onboarding (atau klik "Mulai perlahan" untuk preview)
2. Login dengan email/password apa saja (tidak ada validasi nyata)
3. Di **Energy Picker**, pilih salah satu energi: ☀️ Cerah / ⛅ Berawan / 🌙 Redup
4. Home akan menampilkan jumlah & ukuran task yang berbeda per energi
5. Tap chip energi di Home (mis. "⛅ Berawan · ubah") untuk ganti energi
6. Tap task → detail. Tap FAB "+" di Agenda → buat task baru.
7. Tab Refleksi → tulis refleksi pelan (mood selector 5 emoji)
8. Tab Saya → 5 menu settings (semua toggle interaktif, tersimpan di context)
   - Bonus: **Tema & tampilan** → pilih Gelap → dark mode aktif

### Trigger empty state untuk demo

Di tab **Hari Ini / Agenda / Refleksi**, **double-tap pada judul h1** (mis. "Halo, Rania." / "Agenda" / "Refleksi pelan") → tampilan berubah ke versi kosong. Double-tap lagi untuk kembali.

Gestur sengaja tersembunyi — kamu yang demo yang tahu, agar tampilan presentasi tetap bersih.

## Struktur folder

```
src/
  main.jsx, App.jsx
  context/AppContext.jsx       # state global + router state-based
  data/data.js                 # TASKS, AGENDA, REFLECTIONS, ENERGY_CONFIG
  styles/tokens.css            # CSS variables (warna, ukuran, dark mode)
  styles/global.css            # reset, typography, app shell
  components/                  # Screen, Button, Toggle, BottomNav, TaskCard, ...
  screens/                     # 16 layar (onboarding → settings)
```

## Skrip yang tersedia

```bash
npm run dev       # dev server (HMR)
npm run dev -- --host    # dev server + dapat diakses dari HP
npm run build     # build production ke folder dist/
npm run preview   # preview hasil build
npm run lint      # ESLint check
```

## Troubleshooting

- **Port 5173 sudah dipakai** — tutup proses lain di port itu, atau jalankan `npm run dev -- --port 5174`
- **`npm install` lama / error** — pastikan koneksi internet stabil, hapus `node_modules` + `package-lock.json` lalu coba lagi
- **Tampilan tidak seperti screenshot** — pastikan buka di browser modern (Chrome/Edge/Firefox terbaru). Internet Explorer tidak didukung.
