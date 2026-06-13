# Samuel Portfolio Frontend

Frontend Next.js untuk website portofolio dinamis Samuel. Project ini membaca data dari Strapi CMS melalui REST API dan disiapkan sebagai repo GitHub terpisah `portfolio-frontend` untuk deploy ke Vercel.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Strapi REST API
- Vercel

## Setup Lokal

1. Salin `.env.example` menjadi `.env.local`.
2. Pastikan backend Strapi lokal berjalan di `http://localhost:1337`.
3. Isi env:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

4. Jalankan frontend:

```bash
npm run dev
```

5. Buka `http://localhost:3000`.

## Backend Connection

Frontend memakai endpoint Strapi berikut:

- `/api/portfolio-profile?populate=*`
- `/api/contact-info?populate=*`
- `/api/projects`
- `/api/skill-categories`
- `/api/services`
- `/api/experiences`
- `/api/certificates`

Data mengikuti response Strapi 5 yang sudah flattened. Field dibaca langsung dari item `data`, bukan `data.attributes`.

## CMS Empty / Offline Behavior

Jika Strapi belum menyala, data belum dipublish, URL kosong, atau gambar kosong:

- halaman tetap render
- section menampilkan empty state
- tombol URL kosong tidak ditampilkan
- gambar kosong memakai placeholder blueprint/grid

## Production

Set env Vercel:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-cloud-url.strapiapp.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

`NEXT_PUBLIC_STRAPI_URL` harus tersedia saat build karena `next.config.ts` memakainya untuk `images.remotePatterns`.

## Validation

```bash
npm run lint
npm run build
```

Target Lighthouse production:

- Performance minimal 85
- Accessibility minimal 90
- Best Practices minimal 90
- SEO minimal 90
