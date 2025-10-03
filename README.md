# Song of the Stone - React Website

A modern, responsive React application for "Song of the Stone" featuring beautiful animations, cultural heritage aesthetics, and your custom logo and hero image integration.

## ✨ **React Features Added:**

### **Enhanced Interactivity:**
- **Framer Motion animations** - Smooth, professional page transitions
- **Intersection Observer** - Elements animate as they come into view
- **Component-based architecture** - Easy to maintain and extend
- **State management** - Interactive forms and navigation
- **Real image integration** - Your logo.jpeg and hero.jpeg are properly integrated

### **Modern React Stack:**
- **Vite** - Lightning fast development and builds
- **FontAwesome React** - Scalable icons with proper React integration
- **CSS Variables** - Consistent theming throughout
- **Responsive design** - Mobile-first approach
- **Accessibility** - Semantic HTML and ARIA support

## 🚀 **Getting Started:**

### **Development:**
```bash
cd song-of-the-stone-react
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the site

### **Build for Production:**
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### **Preview Production Build:**
```bash
npm run preview
```

## 📱 **Your Images Integrated:**

- **Logo** (`logo.jpeg`) - Displays in the navigation bar with beautiful circular styling
- **Hero Image** (`hero.jpeg`) - Full-screen background with elegant overlay and your brand colors
- **Responsive** - Both images scale perfectly on all devices

## 🎨 **Component Structure:**

```
App.jsx
├── Navigation (with your logo)
├── HeroSection (with your hero image)
├── AboutSection (brand story & features)
├── EventsSection (curated experiences)
├── GallerySection (moments showcase)
├── ContactSection (contact form & info)
└── Footer (social links & newsletter)
```

## 🌐 **Deployment Ready:**

### **Option 1: Netlify (Recommended)**
1. Run `npm run build`
2. Drag `dist/` folder to [netlify.com](https://netlify.com)
3. Configure your custom domain

### **Option 2: Vercel**
1. Connect GitHub repository
2. Auto-deploys on every commit
3. Zero configuration needed

### **Option 3: Traditional Hosting**
1. Run `npm run build`
2. Upload `dist/` folder contents to your web server
3. Point your domain to the hosting

## 🎯 **Key React Advantages:**

### **Flexibility Benefits:**
- **Component Reusability** - Easy to duplicate/modify sections
- **Dynamic Content** - Easy to add CMS integration later
- **State Management** - Interactive features like forms, modals, etc.
- **SEO Ready** - Can add Next.js later for SSR if needed
- **Performance** - Code splitting and lazy loading ready

### **Maintenance Benefits:**
- **Hot Reload** - Instant updates during development
- **TypeScript Ready** - Easy to add type safety
- **Testing Framework** - Jest/React Testing Library integration
- **Modern Tooling** - ESLint, Prettier, etc.

## 🎪 **Animations & Interactions:**

- **Scroll Animations** - Elements fade and slide in beautifully
- **Hover Effects** - Cards lift and scale on interaction
- **Navigation** - Smooth scrolling between sections
- **Mobile Menu** - Elegant slide-in menu for mobile devices
- **Form Validation** - Real-time feedback on contact form

## 🔧 **Easy Customization:**

### **Adding New Events:**
```jsx
const newEvent = {
  title: "New Event",
  date: "Date Here",
  description: "Description here...",
  category: "Music" // or "Art", "Literature", "Dance"
};
```

### **Changing Colors:**
Edit CSS variables in `App.css`:
```css
:root {
  --primary-red: #901A1C;
  --golden-mustard: #D3A351;
  /* etc... */
}
```

### **Adding New Sections:**
Create new component and import into `App.jsx`

## 📊 **Performance Optimized:**

- **Vite bundling** - Fast builds and optimized output
- **Image optimization** - Your images load efficiently
- **Code splitting** - Only loads what's needed
- **Modern CSS** - CSS custom properties and modern layouts
- **Lazy loading ready** - Easy to add for future images

## 🚀 **Next Steps:**

1. **Run the development server** to see your site with integrated images
2. **Customize content** - Update event details, contact info, etc.
3. **Add more images** - Replace gallery placeholders with real photos
4. **Deploy** - Choose your preferred hosting platform
5. **Domain setup** - Point your domain to the hosting

## 💡 **Future Enhancements Ready:**

- **CMS Integration** - Easy to add Contentful, Strapi, etc.
- **E-commerce** - Add ticket booking for events
- **Blog Section** - Add news/articles component
- **Multi-language** - React i18n integration ready
- **PWA** - Progressive Web App features
- **Analytics** - Google Analytics/GA4 integration

## 🎉 **Why React is Perfect for This:**

Your "Song of the Stone" website now has:
- ✅ **Professional animations** that enhance the cultural aesthetic
- ✅ **Component modularity** for easy updates and maintenance
- ✅ **Modern development workflow** with hot reload and fast builds
- ✅ **Your actual images integrated** beautifully into the design
- ✅ **Mobile-first responsive design** that works on all devices
- ✅ **Production-ready build system** for easy deployment

The React version gives you significantly more flexibility while maintaining the same beautiful, culturally-inspired design. You can now easily add new features, update content, and maintain the site with modern development practices.

**Your cultural heritage website is now built with cutting-edge technology while honoring timeless traditions!** 🏛️✨

---

**Song of the Stone** - *Where heritage meets contemporary expression* 

Built with ❤️ using React, Vite, and Framer Motion

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
