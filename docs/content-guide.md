# Portfolio Content & Customization Guide

## 📄 How to Create New Pages

Since this is a Next.js App Router project, creating pages is based on the file structure.

1.  **Create Folder**: Go to `src/app/` and create a new folder with your route name (e.g., `services`).
2.  **Create File**: Inside that folder, create a `page.tsx`.
3.  **Add Code**:
    ```tsx
    import { Metadata } from 'next';

    export const metadata: Metadata = {
        title: 'Services', // Becomes "Services | John Doe"
        description: 'My professional services...',
    };

    export default function ServicesPage() {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-serif font-bold mb-6">Our Services</h1>
                {/* Your content here */}
            </div>
        );
    }
    ```
4.  **Update Navbar**: Add the link to `src/components/Navbar.tsx`.

---

## 🖼️ Image Dimensions & Assets

For a premium look, use high-quality images with these recommended dimensions:

| Asset Type | Recommended Dimension | Aspect Ratio | Format |
|:---|:---|:---|:---|
| **Author Portrait (Hero)** | 800 x 1000px | 4:5 (Portrait) | JPG/WEBP |
| **Blog Headers** | 1200 x 630px | 1.91:1 (Social Standard) | JPG/WEBP |
| **Project Covers** | 1200 x 800px | 3:2 | JPG/WEBP |
| **OG Images (Social)** | 1200 x 630px | 1.91:1 | PNG |

**Tip:** Store images in `public/images/` and optimize them (compress) before uploading to keep the site fast.

---

## 🎨 Theme & Colors

Your current theme is **"Cyber Minimal"** (Soft Black + Cyan).
*Why this works:* High contrast, very readable for code, looks tech-native.
*Why it feels "AI":* Cyan/Teal on Black is a very common default for tech templates.

### 🌟 3 Premium Alternatives to Try

To change colors, edit `src/app/globals.css` and update the variables.

#### 1. "The Editorial" (Warm & Sophisticated)
*A sleek, newspaper-inspired look. Less "hacker", more "founder".*
```css
:root {
  --background: #1c1917; /* Warm dark grey */
  --background-soft: #292524;
  --foreground: #f5f5f4;
  --accent: #d97706; /* Amber/Gold */
}
```

#### 2. "Deep Sea" (Calm & Trustworthy)
*Professional, stable, and easy on the eyes.*
```css
:root {
  --background: #020617; /* Deep Navy */
  --background-soft: #0f172a;
  --foreground: #e2e8f0;
  --accent: #38bdf8; /* Sky Blue */
}
```

#### 3. "Electric Lavender" (Creative & Bold)
*Stands out, feels artistic and modern.*
```css
:root {
  --background: #050505; /* Pure Black */
  --background-soft: #111;
  --foreground: #ffffff;
  --accent: #a855f7; /* Vibrant Purple */
}
```

### 🛠️ How to Change Colors
1.  Open `src/app/globals.css`.
2.  Locate `:root` at the top.
3.  Replace the hex codes for `--background`, `--background-soft`, and `--accent`.
4.  Save and check the result!
