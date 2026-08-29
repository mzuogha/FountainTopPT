# Fountain Top Physical Therapy - Deployment & GitHub Guide

## 1. How to Push Codebase to Your GitHub Repository

Run the following commands in your local terminal:

```bash
# 1. Add your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/fountain-top-physiotherapy.git

# 2. Rename branch to main
git branch -M main

# 3. Push all commits to GitHub
git push -u origin main
```

---

## 2. How to Upload & Deploy to cPanel (`public_html`)

### Method A: One-Click Tar Upload (Instant Deployment)
1. In your cPanel dashboard, open **File Manager** and enter the **`public_html`** directory (or your target subdomain root).
2. Click **Upload** in the top toolbar and upload the pre-packaged file:
   - **`cpanel_public_html.tar.gz`** (located at the root of this repository).
3. Once uploaded, right-click `cpanel_public_html.tar.gz` in File Manager and select **Extract** -> Extract to `/public_html`.
4. Done! All production assets, WebP images, `.htaccess` (with SPA rewrite rules & Gzip caching), `sitemap.xml`, `robots.txt`, and `api/submit.php` are immediately active.

### Method B: Manual Build & Upload
1. **Run Build**:
   ```bash
   npm run build
   ```
2. In cPanel **File Manager** -> **`public_html`**, upload the contents of the generated **`dist/`** directory.
3. Ensure `.htaccess` is present to handle React SPA route navigation and caching.

### Method B: Node.js App on cPanel (If using cPanel Node.js Selector)
1. In cPanel, click **Setup Node.js App**.
2. Set **Application Root** to your folder and **Application startup file** to `dist/server.cjs`.
3. Add environment variable `RESEND_API_KEY` in cPanel if you use Resend email delivery.
4. Run `npm run build` and click **Restart**.

---

## 3. What Was Implemented in This Update
- **Multi-Page Architecture**:
  - `Services` has its own dedicated directory and page (`/services`) with category filters, modalities, search, and deep-dive modals.
  - `Health Tips` has its own dedicated page (`/health-tips`) with clinical guides, tags, read times, and share features.
  - `Contact` has its own dedicated page (`/contact`) with interactive clinic hours, direct WhatsApp CTA, Google Maps embed, and direct consultation inquiries.
- **Dark Mode Toggle**:
  - Added Sun/Moon theme toggle in the header navigation and footer.
  - Seamlessly persists preference in `localStorage` and adapts to system color scheme (`prefers-color-scheme`).
- **Testimonial Cleanup**:
  - Star ratings removed from testimonial cards for a clean, professional clinical review look.
  - Testimonial title updated to **Chronic Shoulder Stiffness**.
- **Image Performance**:
  - WebP conversion with fallback handling.
  - Native lazy loading on below-the-fold media.
  - Pre-configured `.htaccess` browser caching headers (1 year for images/fonts).
