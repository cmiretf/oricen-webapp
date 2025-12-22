# replit.md

## Overview

**Oricen** is a professional vocational guidance web platform designed for students and educational institutions. The application provides orientation services through three service tiers (Origen, Brújula, Atlas) with a clean, professional, and responsive design.

## User Preferences

- Preferred communication style: Simple, everyday language
- Logo: AVIF format image (user-provided)
- Design: Professional, clean aesthetic matching educational/guidance sector
- Color scheme: Blue (#2B4C7E) as primary, with Red, Green, Yellow accents

## System Architecture

### Technology Stack
- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React
- **Development Server**: Vite on port 5000 with all hosts allowed

### Project Structure
```
src/
├── assets/
│   └── logo.avif          # User's Oricen logo
├── components/
│   ├── Header.jsx         # Responsive navigation header
│   ├── Footer.jsx         # Footer with social links and collaborators
│   └── Layout.jsx         # Wrapper component with fade-in animation
├── pages/
│   ├── HomePage.jsx       # Hero, statistics, specialists, CTA
│   ├── QuienesSomosPage.jsx    # About Us with mission/vision
│   ├── ServiciosPage.jsx       # Service tiers (Origen, Brújula, Atlas)
│   ├── ContactoPage.jsx        # Contact form and information
│   ├── ComprarPage.jsx         # Purchase/checkout page
│   └── LoginPage.jsx           # Login interface
├── index.css              # Tailwind + custom styles
├── main.jsx               # React entry point
└── App.jsx                # Router configuration

root/
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration with allowedHosts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies
```

### Pages Implemented
1. **Home** - Hero section with call-to-action buttons, statistics, specialists section
2. **About Us (Quiénes Somos)** - Mission, vision, and core values
3. **Services (Servicios)** - Three pricing tiers with feature comparisons
4. **Contact (Contacto)** - Contact form and location information
5. **Purchase (Comprar)** - Checkout/purchase flow
6. **Login** - User authentication interface

### Design Details
- **Header**: Logo (h-16), responsive navigation, login link
- **Footer**: 
  - Logo (h-16) with social media icons
  - Contact information column
  - Legal links column
  - Newsletter subscription form
  - Collaborators section: "UNIVERSO START**up** | COLABORADORES | ESIC University" with blue dividing lines
- **All pages**: Smooth fade-in transitions, fully responsive mobile design

## Important Files
- `src/App.jsx` - Main application routing
- `src/components/Header.jsx` - Navigation header with responsive menu
- `src/components/Footer.jsx` - Footer with collaborators section
- `src/assets/logo.avif` - Application logo (AVIF format)
- `vite.config.js` - Vite server configuration (allowedHosts: true)

## Git Configuration
- `.gitignore` includes:
  - `demo_inicial/` - Demo folder excluded from commits
  - `attached_assets/` - Assets folder excluded from commits (prevents large files)
  - Standard Node.js ignore patterns

## External Dependencies
None currently - project uses only npm packages listed in package.json

## Recent Changes
- Reconstructed entire project after git reset to clean commit history
- All pages and components rebuilt with proper structure
- Logo copied to src/assets for proper version control
- .gitignore configured to exclude demo_inicial/ and attached_assets/
- Workflow configured for npm run dev on port 5000
