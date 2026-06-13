# Zenith

> Ruang istirahat untuk pikiranmu.

**Zenith** adalah prototipe interaktif aplikasi mobile manajemen tugas berbasis kesejahteraan (wellbeing), dibuat untuk tugas besar mata kuliah **Interaksi Manusia & Komputer (IMK)**. Bukan to-do list biasa — Zenith dirancang untuk mengurangi beban kognitif dan rasa bersalah, bukan memaksa produktivitas.

---

## Konsep — "Mental Thermostat"

Setiap hari, user memilih tingkat energi mereka dalam metafora cuaca: **☀️ Cerah**, **⛅ Berawan**, atau **🌙 Redup**. Aplikasi **beradaptasi** terhadap pilihan ini — menyesuaikan jumlah tugas yang ditampilkan, tone bahasa, dan intensitas visual.

| Energi | Tampilan Hari Ini | Tone bahasa |
|---|---|---|
| ☀️ Cerah | 10 tugas (semua prioritas), kartu normal | "Mari ambil yang berat dulu. Kamu bisa pelan-pelan." |
| ⛅ Berawan | 5 tugas (campuran), kartu normal | "Lima tugas. Bukan empat belas." |
| 🌙 Redup | 3 tugas (hanya ringan), kartu lebih besar & lega | "Hari ini cukup tiga langkah kecil." |

Ganti energi → Home langsung me-render ulang. Tugas yang "disembunyikan" tetap aman, tidak ke mana-mana.

---

## Tech stack

- **React 19** + **Vite** (JavaScript)
- **Plain CSS** dengan CSS variables sebagai design tokens — tanpa framework UI
- **Context API + useReducer** untuk state global (energi, screen aktif, settings, tasks, reflections)
- **Routing state-based** — satu state `currentScreen`, tanpa react-router
- **Font:** Inter (via `@fontsource/inter`)
- **Tanpa backend** — semua data dummy di `src/data/data.js`
- **Mobile-first** 390px, dibungkus device frame ukuran tetap (390×844) di desktop

---

## Fitur

### Layar (16 screen)
- **Onboarding**: Welcome + konsep Energi
- **Login** (tanpa autentikasi nyata — bebas isi apa saja)
- **Energy Picker** dengan validasi disabled-state
- **Home — Hari Ini** adaptif per energi
- **Empty states** Today (3 varian per energi), Agenda, Refleksi
- **Task**: Detail + Create
- **Agenda** dengan week strip + timeline + FAB
- **Refleksi** dengan kartu cuaca minggu, statistik, prompt + Create Reflection (mood selector 5 emoji)
- **Profil** + 5 layar Settings (Kenyamanan visual, Pengingat lembut, Tema & tampilan, Privasi, Bantuan)

### Interaksi
- Toggle interaktif dengan animasi knob — semua tersimpan di context
- Energy chip "ubah" untuk ganti energi tanpa kembali ke picker
- Bottom nav 4 tab (Hari Ini / Agenda / Refleksi / Saya)
- Ukuran teks Standar/Sedang/Besar — **mengubah skala font seluruh app**
- **Dark mode** — token CSS di-override saat tema Gelap dipilih (frame, surface, text — semua mengikuti)
- Reduce motion respect — animasi dimatikan saat aksesibilitas aktif

### Trigger empty state untuk demo
Double-tap pada judul `h1` di tab **Hari Ini / Agenda / Refleksi** → tampilan beralih ke versi kosong. Double-tap lagi → kembali. Gestur sengaja tersembunyi agar tidak muncul dengan sendirinya saat user biasa pakai.

---

## Design system

CSS variables di `src/styles/tokens.css`:

- **Warna energi**: amber (cerah), slate (berawan), ungu (redup) — masing-masing punya soft variant
- **Brand**: biru `#3B82F6` + indigo aksen
- **Radii**: 14 / 16-18 / 20 / pill 28 / chip 19
- **Typography scale**: display (32) → micro (11) dengan letter-spacing & line-height konsisten
- **Dark mode**: override penuh untuk surface, text, border, shadow

Spacing layar horizontal **32px** kiri-kanan (konten 326px dalam frame 390px). Touch target minimum 44–48px.

---

## Struktur folder

```
src/
  main.jsx, App.jsx
  context/AppContext.jsx       # state global + router state-based
  data/data.js                 # TASKS, AGENDA, REFLECTIONS, ENERGY_CONFIG
  styles/tokens.css            # CSS variables + dark mode override
  styles/global.css            # reset, typography, app shell
  components/                  # Screen, Button, Toggle, BottomNav, TaskCard, ...
  screens/                     # 16 layar
```

---

## Konteks tugas

Tugas besar mata kuliah Interaksi Manusia & Komputer.
Fokus pada **tampilan + interaksi visual** — bukan produk siap rilis. Semua data dummy, tanpa backend, tanpa database, tanpa autentikasi nyata. Tujuan: menerjemahkan desain statik (Figma) menjadi prototipe interaktif yang bisa didemokan untuk menunjukkan bagaimana aplikasi bekerja.
