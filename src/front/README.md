# Figma-to-React Frontend

A responsive React web page that faithfully implements the Figma design across Desktop, Tablet, and Mobile breakpoints.

## � Implementation

This React app is a **single responsive page** that adapts to different screen sizes, exactly matching the Figma design specifications:

### Desktop (MacBook Pro 16")
- **Background**: White
- **Text**: Black "This is a heading" (32px, Inter Regular)
- **Buttons**: 1 gray button with white text

### Tablet (iPad mini 8.3")
- **Background**: White  
- **Text**: Black "This is a heading" (32px, Inter Regular)
- **Buttons**: 2 gray buttons with white text

### Mobile (iPhone 16 Plus)
- **Background**: Dark gray (#2C2C2C)
- **Text**: **White** "This is a heading" (32px, Inter Regular)
- **Buttons**: 2 gray buttons with white text
## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### From root directory
```bash
npm run front        # Start the frontend
npm run front:build  # Build the frontend
```

## 📁 Project Structure

```
src/front/
├── src/
│   ├── App.tsx          # Main responsive component
│   ├── App.css          # Responsive styles with breakpoints
│   ├── index.css        # Global styles and accessibility
│   └── main.tsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## � Design Fidelity

- **Typography**: Exact font sizes, weights, and line heights from Figma
- **Colors**: Precise RGB values matching the design
- **Layout**: Responsive breakpoints that match device specifications
- **Spacing**: Accurate padding, margins, and gaps
- **Interactive**: Hover effects and accessibility features

## 📱 Responsive Breakpoints

- **Desktop**: `min-width: 769px` (1 button)
- **Tablet**: `max-width: 768px` (2 buttons)
- **Mobile**: `max-width: 430px` (2 buttons, dark theme)

## ✨ Features

- Fully responsive design
- Accessibility compliant (WCAG)
- Modern CSS with CSS Grid and Flexbox
- Smooth transitions and hover effects
- TypeScript for type safety
- Fast development with Vite

## 🔗 Figma Connection

This frontend is directly connected to data extracted by:
- `figma-json-inspector.ts` - Extracts complete JSON from Figma files
- `src/json-data/figma-file-*.json` - Saved design data

## 🛠️ Tech Stack

- **React 18** - User interface framework
- **TypeScript** - Static typing
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with responsive design
