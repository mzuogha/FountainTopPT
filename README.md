# 🏥 Fountain Top Physiotherapy Clinic — Official Web Application

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-teal.svg)](#license)

> **Fountain Top Physiotherapy** is a leading physical rehabilitation center located behind Stephen Keshi Stadium by MFM Junction in Asaba, Delta State, Nigeria. This production-grade web application delivers patient booking flows, WhatsApp integration, symptom assessments, specialized rehabilitation program catalogs, and an evidence-based clinical health knowledge hub.

---

## 📑 Table of Contents

- [Overview & Clinic Information](#-overview--clinic-information)
- [Key Features](#-key-features)
- [Clinical Knowledge Hub & Articles](#-clinical-knowledge-hub--articles)
- [Specialized Rehabilitation Programs](#-specialized-rehabilitation-programs)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Development](#-getting-started--local-development)
- [cPanel Deployment Guide (Step-by-Step)](#-cpanel-deployment-guide-step-by-step)
- [SEO, Schema.org & Performance](#-seo-schemaorg--performance)
- [Contact & Location](#-contact--location)

---

## 🏥 Overview & Clinic Information

- **Clinic Name:** Fountain Top Physiotherapy Clinic
- **Address:** Behind Stephen Keshi Stadium by MFM Junction, Off Nnebisi Road, Asaba, Delta State, Nigeria
- **Phone:** `+234 703 946 6804` / `+234 802 331 8295`
- **Email:** `info@fountaintoppt.com`
- **Working Hours:**
  - Monday – Friday: 8:00 AM – 6:00 PM
  - Saturday: 9:00 AM – 3:00 PM
  - Sunday: Emergency On-Call
- **WhatsApp Direct Contact:** [Chat on WhatsApp](https://wa.me/2347039466804)

---

## ✨ Key Features

1. **Dual Channel Appointment Booking Engine (Email & WhatsApp):**
   - **Direct Email Booking:** Patients can submit their consultation request with name, email, phone, service, date, time window, and Home Visit option. Dispatches notifications directly to clinic email (`info@fountaintoppt.com`), logs securely, and generates a pre-formatted single-tap mailto backup and reference code.
   - **Instant WhatsApp Booking:** Formats a structured consultation message with full appointment parameters and connects patients directly to the clinic's WhatsApp coordination desk.
2. **Interactive Symptom & Joint Pain Locator:**
   - Visual body map helping patients identify pain regions (neck, shoulder, lower back, knee, ankle) and get matched with appropriate rehabilitation treatments.
3. **12 Evidence-Based Clinical Health Guides:**
   - Comprehensive articles written from a physiotherapeutic perspective covering orthopedics, neurology, pediatrics, and preventive wellness.
4. **Responsive Modern UI:**
   - Adaptive top bar and navigation for mobile, tablet, and desktop viewports with dark/light mode toggle.
5. **Dual-Environment Backend Support (Node.js & cPanel PHP):**
   - Development & Container: Express.js server (`server.ts`) with optional Resend API support.
   - Production / cPanel: Native `/api/submit.php` script utilizing standard PHP `mail()` to deliver inquiries without requiring Node.js or complex server setups.
6. **Production Caching & Routing Configuration:**
   - Pre-configured `.htaccess` with Gzip compression, WebP asset caching, security headers, and single-page application (SPA) rewrite rules.

---

## 🔒 Security Audit & Public Repository Verification

Is it safe to make this repository public on GitHub? **Yes, absolutely.**

This repository has undergone a security verification:
- ✅ **Zero Hardcoded Secrets or API Keys:** No private credentials, tokens, or passwords are saved in the codebase.
- ✅ **Safe `.env.example` Template:** All configuration variables use safe placeholders without live secret keys.
- ✅ **Client-Safe Endpoints:** All contact submissions and booking references are handled securely without exposing database credentials or private server tokens.
- ✅ **`.gitignore` Rules:** Excludes `.env`, local credential files, `node_modules`, and temporary logs.
- ✅ **Safe Deployment Artifacts:** The pre-bundled `cpanel_public_html.tar.gz` contains only compiled client-side assets and the stateless PHP submission script.

---

## 📚 Clinical Knowledge Hub & Articles

The application features 12 comprehensive, medical guides indexed with Schema.org `MedicalWebPage` and search filters:

| # | Title | Category | Focus Areas |
|---|---|---|---|
| 1 | **Understanding & Managing Chronic Low Back Pain** | Spine & Back Health | Lumbar ergonomics, core stability, McKenzie protocol |
| 2 | **Stroke Rehabilitation: Regaining Independence** | Stroke Rehab | Neuroplasticity, task-oriented gait retraining, CIMT |
| 3 | **Ergonomic Survival Guide for Desk Workers** | Wellness & Prevention | Posture, Text Neck, monitor setup, micro-breaks |
| 4 | **Knee Osteoarthritis: Movement as Medicine** | Joint & Arthritis Care | Quadriceps strengthening, joint unweighting, cartilage nutrition |
| 5 | **Pediatric Physiotherapy for Developmental Milestones** | Pediatric Care | Motor milestones, early intervention, Torticollis, CP |
| 6 | **Post-Surgical Rehabilitation: ACL & Joint Replacement** | Post-Surgical Rehab | Cryotherapy, scar tissue mobilization, kinetic chain loading |
| 7 | **Overcoming Frozen Shoulder (Adhesive Capsulitis)** | Joint & Arthritis Care | 3 clinical stages, Codman pendular swings, Maitland glides |
| 8 | **Plantar Fasciitis & Morning Heel Pain** | Wellness & Prevention | Rathleff high-load strength protocol, Windlass mechanism |
| 9 | **Carpal Tunnel Syndrome vs. Cervical Radiculopathy** | Spine & Back Health | Median nerve flossing, nighttime splinting, double crush |
| 10 | **Acute Soft Tissue Injury: The P.E.A.C.E. & L.O.V.E. Protocol** | Post-Surgical Rehab | Modern BJSM protocol replacing R.I.C.E. mechanotherapy |
| 11 | **Senior Balance & Fall Prevention (Otago Protocol)** | Wellness & Prevention | Proprioceptive training, reactive stepping, sit-to-stand power |
| 12 | **Postpartum Recovery & Diastasis Recti** | Wellness & Prevention | Linea alba healing, transverse abdominis breathing, pelvic floor |

---

## 🩺 Specialized Rehabilitation Programs

- **Musculoskeletal & Orthopedic Physiotherapy** (`#musculoskeletal`)
- **Neurological & Stroke Rehabilitation** (`#stroke-rehab`)
- **Post-Surgical Management & Joint Replacement Rehab** (`#post-surgical`)
- **Pediatric Erb's Palsy Rehabilitation** (`#erbs-palsy`)
- **Pediatric Cerebral Palsy Neuro-Developmental Therapy** (`#cerebral-palsy`)
- **Club Foot Non-Surgical Ponseti Method Management** (`#club-foot`)
- **Therapeutic Medical & Deep Tissue Massage** (`#therapeutic-massage`)
- **Preventive Wellness, Ergonomics & Fitness Training** (`#wellness-fitness`)

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Animations:** Motion (`motion/react`)
- **Routing:** React Router v6
- **Full-Stack Development Server:** Express.js + Vite Middleware (`server.ts`)
- **cPanel PHP API:** Native PHP endpoint (`public/api/submit.php`) for shared hosting form submissions
- **SEO & Meta:** Full Open Graph, Twitter Cards, Semantic HTML5, Schema.org JSON-LD structured data, `robots.txt`, and XML Sitemap (`sitemap.xml`)

---

## 📁 Project Directory Structure

```
├── cpanel_public_html.tar.gz   # Pre-built ready-to-extract cPanel archive (8.9MB)
├── CPANEL_DEPLOYMENT.md        # Dedicated step-by-step cPanel deployment guide
├── index.html                  # HTML entry point with meta tags & JSON-LD schema
├── package.json                # Project dependencies & build scripts
├── public/
│   ├── .htaccess               # Apache routing, gzip compression, browser caching
│   ├── robots.txt              # Search engine bot instructions
│   ├── sitemap.xml             # Search engine XML sitemap (canonical URLs & articles)
│   ├── api/
│   │   └── submit.php          # PHP backend for processing appointments & emails on cPanel
│   └── images/                 # Optimized WebP clinic images and staff photos
├── server.ts                   # Express server with Vite middleware for container environments
├── src/
│   ├── App.tsx                 # Main application routes & layout wrapper
│   ├── main.tsx                # React DOM render entry point
│   ├── types.ts                # TypeScript interfaces, types, and schemas
│   ├── components/             # Reusable UI components (Navbar, Footer, Modals, SEO, etc.)
│   ├── data/
│   │   ├── clinicData.ts       # Clinic info, services, therapists, FAQ, testimonials
│   │   └── healthArticles.ts   # 12 clinical physiotherapy articles with rich data
│   └── pages/                  # Page components (HomePage, ServicesPage, HealthTipsPage, ContactPage)
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/mzuogha/FountainTopPT.git
cd FountainTopPT

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
The application will launch at `http://localhost:3000`.

### Production Build Scripts
```bash
# Standard Production Build (generates dist/ folder)
npm run build

# One-Click cPanel Package Generation (generates cpanel_public_html.tar.gz)
npm run build:cpanel

# Type Check / Lint
npm run lint
```

---

## 🌐 cPanel Deployment Guide (Step-by-Step)

The repository includes a ready-to-deploy archive **`cpanel_public_html.tar.gz`**.

### Method 1: Instant Deployment with `cpanel_public_html.tar.gz` (Recommended)

1. Log in to your **cPanel Dashboard**.
2. Open **File Manager** and enter the **`public_html`** folder (or your subdomain directory).
3. Click **Upload** in the top toolbar.
4. Select and upload **`cpanel_public_html.tar.gz`** from the root of this repository.
5. In File Manager, right-click `cpanel_public_html.tar.gz` and select **Extract** -> Extract to `/public_html`.
6. **Done!** Your website is immediately live with all pages, images, contact forms, and `.htaccess` routing active.

### Method 2: Manual Build & Upload

1. Run the build locally:
   ```bash
   npm run build
   ```
2. Open cPanel **File Manager** -> **`public_html`**.
3. Upload all files inside the generated **`dist/`** folder:
   - `index.html`
   - `assets/` (bundled JS & CSS)
   - `images/` (WebP photos)
   - `.htaccess` (SPA routing & caching)
   - `api/submit.php` (appointment form email handler)
   - `sitemap.xml` & `robots.txt`

---

## 🔍 SEO, Schema.org & Performance

- **Google Search Console & Bing Webmaster Verification:** Canonical sitemap available at `https://fountaintoppt.com/sitemap.xml`.
- **Structured Data:** Includes Schema.org `MedicalBusiness`, `PhysiotherapyClinic`, `MedicalWebPage`, and `FAQPage` JSON-LD schemas.
- **Image Optimization:** All assets converted to modern `.webp` with responsive sizing and caching.
- **Performance Score:** Fast First Contentful Paint (FCP) and zero-layout shift design.

---

## 📞 Contact & Location

**Fountain Top Physiotherapy Clinic**  
📍 Behind Stephen Keshi Stadium by MFM Junction, Asaba, Delta State, Nigeria  
📞 Phone: `+234 703 946 6804` | `+234 802 331 8295`  
✉️ Email: `info@fountaintoppt.com`  
💬 WhatsApp: [+234 703 946 6804](https://wa.me/2347039466804)  
🌐 Website: [https://fountaintoppt.com](https://fountaintoppt.com)

---

## 📄 License

Proprietary © 2026 Fountain Top Physiotherapy Clinic. All rights reserved.
