# 🏥 Child Development Clinic CMS

A complete, full-stack Content Management System (CMS) built for a professional child therapy and development center. Manage your clinic's hero sections, blog, and video testimonials with a clean admin dashboard!

## 🧪 Tech Stack
- **Frontend**: React (Vite), GSAP (Animations), Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Media**: Cloudinary (Image storage)
- **Forms**: EmailJS (Notifications)

---

## 🚀 Quick Start Guide

### 1. Database Setup (PostgreSQL)
1. Make sure you have a local PostgreSQL instance running.
2. Create a new database (e.g., `child_clinic`).
3. Run the following query in your SQL editor (pgAdmin or tableplus):
   ```sql
   CREATE TABLE IF NOT EXISTS site_data (
       id SERIAL PRIMARY KEY,
       type VARCHAR(50) NOT NULL, -- 'settings', 'gallery', 'blog', 'testimonial', 'submission'
       key VARCHAR(100) UNIQUE NULL, -- Unique key for lookups (e.g., 'hero')
       content JSONB NOT NULL, -- Stores all your dynamic fields
       created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 2. Backend Configuration (`/server`)
1.  Navigate into the `server` folder: `cd server`
2.  Install dependencies: `npm install`
3.  Create a **`.env`** file:
    ```env
    PORT=5000
    DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/YOUR_DB_NAME
    JWT_SECRET=your_super_secret_key
    CLOUDINARY_CLOUD_NAME=your_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ADMIN_EMAIL=admin@suryamclinic.com
    ADMIN_PASSWORD=change_this
    ```
4.  Launch the server: `npm run dev` (or `node index.js`)

### 3. Frontend Configuration (`/`)
1.  Navigate into the main folder.
2.  Install dependencies: `npm install`
3.  Create a **`.env`** file:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_id
    VITE_EMAILJS_TEMPLATE_ID=your_id
    VITE_EMAILJS_PUBLIC_KEY=your_key
    ```
4.  Launch the website: `npm run dev`

---

## 📦 Features & Dashboard
Wait for the **Dashboad** login at `/dashboard/login` (default: `admin@suryamclinic.com` / `change_this`).

- **Hero Management**: Change headings, titles, and images in real-time.
- **Blog Manager**: Create professional-grade articles with categories, author roles, and automatic dates.
- **Video Testimonials**: Add YouTube or Google Drive links to showcase success stories.
- **Form CRM**: View every parent who has contacted you directly in the dashboard.
- **Contact Settings**: Instantly change your clinic's phone, WhatsApp, and recipient email.

---

## 🛠️ Maintenance & Notes
- Every blog post or gallery item is stored in the **`site_data`** table as a JSON object (type `JSONB`).
- Images are automatically optimized and served via **Cloudinary**.
- All website sections look for **`src/data/defaults.js`** as a fallback if the database has not been configured yet.
