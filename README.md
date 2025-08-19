# Jay Ambe Construction Website

A modern, professional construction company website built with React, TypeScript, and Tailwind CSS. This website showcases the services, projects, and expertise of Jay Ambe Construction with a beautiful, responsive design.

## 🚀 Features

### Design & UI/UX
- **Modern Professional Design**: Clean, construction-industry focused design
- **Dark/Light Mode Toggle**: Smooth theme switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Professional Color Palette**: 
  - White (#FFFFFF)
  - Orange (#FBB500) 
  - Black (#151616)

### Pages & Sections
- **Home Page**: Hero section, services overview, statistics, and call-to-action
- **Services Page**: Detailed service offerings with features and benefits
- **Projects Page**: Portfolio with filtering by category (residential, commercial, renovation)
- **About Page**: Company story, mission, vision, values, timeline, and team
- **Gallery Page**: Masonry layout with image/video showcase and filtering
- **Contact Page**: Contact form, company information, map placeholder, and FAQ

### Technical Features
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling with custom design system
- **React Router** for navigation
- **Framer Motion** for animations
- **Lucide React** for professional icons
- **Vite** for fast development and building
- **Responsive Navigation** with mobile menu
- **Form Handling** with validation and submission states

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jay-ambe-construction
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light mode context
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── Services.tsx    # Services page
│   ├── Projects.tsx    # Projects page
│   ├── About.tsx       # About page
│   ├── Gallery.tsx     # Gallery page
│   └── Contact.tsx     # Contact page
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js`:
- Primary White: `#FFFFFF`
- Primary Orange: `#FBB500`
- Primary Black: `#151616`

### Content
- Update company information in respective page components
- Replace placeholder images with actual project photos
- Modify contact information in Footer and Contact components
- Update team member information in About page

### Styling
- Custom CSS classes are defined in `src/index.css`
- Component-specific styles use Tailwind CSS utilities
- Animations are handled with Framer Motion

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

The website includes a smooth dark/light mode toggle that:
- Persists user preference in localStorage
- Respects system preference on first visit
- Provides smooth transitions between themes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Configure for static site hosting
- **Any static hosting service**: Upload the `dist` folder

## 📞 Contact Information

For questions about this website or to request modifications:
- Email: [Your Email]
- Phone: [Your Phone]

## 📄 License

This project is created for Jay Ambe Construction. All rights reserved.

## 🔧 Future Enhancements

Potential improvements for future versions:
- Blog/News section
- Client testimonials
- Project case studies
- Online quote calculator
- Live chat integration
- Multi-language support
- SEO optimization
- Performance monitoring
- Analytics integration

---

**Built with ❤️ for Jay Ambe Construction**
