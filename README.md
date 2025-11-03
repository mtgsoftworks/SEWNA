# SEWNA - Custom Fashion Platform

SEWNA is a platform that connects people with independent fashion designers to create unique, custom outfits. Upload inspiration images and get AI-powered design briefs.

## Features

- **AI-Powered Design Briefs**: Upload an inspiration image and let our AI analyze it to create a detailed design brief
- **Designer Discovery**: Browse and connect with talented fashion designers who match your style
- **Custom Requests**: Submit detailed design requests with your preferences and requirements
- **Designer Portfolios**: Designers can showcase their work and connect with potential clients
- **Advanced UI/UX**: Loading states, error handling, empty states, and skeleton loading
- **Responsive Design**: Mobile-first approach with dark mode support
- **Modern Styling**: Clean, professional interface with lime green (#00b67f) accent color

## Technology Stack

- **Frontend**: React 19.2.0, TypeScript, Vite, Tailwind CSS
- **AI**: Google Gemini 2.5 Flash for image analysis and design brief generation
- **Styling**: Clean, modern design with lime green (#00b67f) accent color
- **Icons**: Material Symbols for consistent iconography
- **State Management**: React hooks with TypeScript type safety

## UI/UX Features

### Loading States
- **Loading Spinner**: Animated spinner for async operations
- **Skeleton Loading**: Placeholder cards with pulse animation during data fetching
- **Progress Indicators**: Visual feedback for ongoing operations

### Error Handling
- **Error Messages**: Red-bordered error notifications with clear messaging
- **Form Validation**: Input validation with user-friendly error display
- **Error Boundaries**: Graceful error handling for component failures

### Empty States
- **No Results**: Friendly "No designers found" messages with search icon
- **Empty Forms**: Clear guidance for empty form states
- **Placeholder Content**: Helpful placeholder text and icons

### User Experience
- **Responsive Design**: Mobile, tablet, and desktop optimized layouts
- **Dark Mode**: Complete dark theme support with proper color contrast
- **Micro-interactions**: Hover effects, transitions, and smooth animations
- **Accessibility**: ARIA labels and keyboard navigation support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sewna.git
   cd sewna
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3001`

## Project Structure

```
sewna/
├── components/          # React components
│   ├── WelcomePage.tsx
│   ├── CustomRequestPage.tsx
│   ├── DesignerPortfolioUpload.tsx
│   ├── DesignerDiscoveryPage.tsx
│   ├── StarRating.tsx
│   ├── ProgressBar.tsx
│   ├── Breadcrumbs.tsx
│   └── Sidebar.tsx
├── services/           # API services
│   └── geminiService.ts
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.html         # HTML template
└── vite.config.ts     # Vite configuration
```

## Component Architecture

### Core Components
- **WelcomePage**: Landing page with hero section and feature highlights
- **CustomRequestPage**: 4-step custom request process with progress tracking
- **DesignerDiscoveryPage**: Designer browsing with advanced filtering and search
- **DesignerPortfolioUpload**: Portfolio creation with style tags and image upload

### Shared Components
- **StarRating**: Reusable star rating component with review count
- **ProgressBar**: Visual progress indicator for multi-step processes
- **Breadcrumbs**: Navigation breadcrumb component
- **Sidebar**: Navigation sidebar with current page highlighting

## Styling System

### Color Palette
- **Primary**: #00b67f (Lime Green)
- **Dark Background**: #0c1d18
- **Light Background**: #ffffff
- **Text Primary**: #0c1d18
- **Text Secondary**: #45a185
- **Border Light**: #e6f4f0
- **Border Dark**: #1a2e29

### Design Tokens
- **Spacing**: 4px base unit with 8px, 16px, 24px, 32px scales
- **Border Radius**: 8px (small), 12px (medium), 16px (large)
- **Typography**: Inter font with responsive sizing
- **Shadows**: Subtle shadow system for depth and hierarchy

## Development Workflow

### Local Development
1. Start development server: `npm run dev`
2. Make changes to components
3. Hot reload automatically updates the browser
4. TypeScript provides type safety and autocompletion

### Building for Production
1. Build the project: `npm run build`
2. Optimize assets and bundle size
3. Generate static files in `dist/` directory

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React rules
- **Prettier**: Code formatting (optional)
- **Git Hooks**: Pre-commit hooks for code quality

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build project:
   ```bash
   npm run build
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Set environment variables in Vercel dashboard:
   - Add `VITE_GEMINI_API_KEY` with your Gemini API key

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build project:
   ```bash
   npm run build
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Browser Support

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Firefox Mobile

## Performance

- **Bundle Size**: Optimized with code splitting
- **Loading**: Lazy loading for images and components
- **Caching**: Service worker support for offline functionality
- **Images**: Optimized loading with WebP support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and structure
- Use TypeScript for type safety
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License.
