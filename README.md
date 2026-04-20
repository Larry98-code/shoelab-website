# ShoeLab.de — Official Website

> Bremen's Premier Shoe Cleaning & Detailing Studio

## 🗂 Project Structure

```
shoelab/
├── index.html                  # Main website (single page)
├── README.md                   # This file
└── assets/
    ├── css/
    │   └── styles.css          # All styles
    ├── js/
    │   └── main.js             # Shop cart, Wesley AI, UI logic
    └── images/
        └── logo.png            # ShoeLab brand logo
```

## 🚀 Deployment

### Option 1 — GitHub Pages (Free)
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site goes live at `https://yourusername.github.io/shoelab`

### Option 2 — Netlify (Recommended, Free)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **New site from Git**
3. Connect your repo → deploy
4. Add custom domain `shoelab.de` in Netlify settings

### Option 3 — Netlify Drag & Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `shoelab/` folder
3. Live instantly

## ✏️ Customisation

| What to change | Where |
|---|---|
| Contact info, address | `index.html` — booking & footer sections |
| Services & prices | `index.html` — `#services` section |
| Shop products | `index.html` — `#shop` section |
| Wesley AI knowledge | `assets/js/main.js` — `WESLEY_SYSTEM` constant |
| All colours & fonts | `assets/css/styles.css` — `:root` variables |
| Gallery photos | `index.html` — `#gallery` section |

## 🎨 Brand Colours

```css
--red:    #CC1111   /* Primary brand red */
--black:  #080808   /* Background */
--white:  #FFFFFF   /* Text */
```

## 📞 Contact

- **Phone/WhatsApp:** +49 177 2258878
- **Email:** Shoelab.de@gmail.com
- **Instagram:** @Shoelab.brnm
- **TikTok:** ShoeLab Brmn
- **Address:** Wallerheerstr, 28217 Bremen

---
Built with ❤️ for ShoeLab.de · Bremen, Germany
