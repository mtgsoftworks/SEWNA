# SEWNA - Custom Fashion Platform

<div align="center">
<img width="1200" height="475" alt="SEWNA Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

SEWNA is a platform that connects people with independent fashion designers to create unique, custom outfits. Upload inspiration images and get AI-powered design briefs.

## Features

- **AI-Powered Design Briefs**: Upload an inspiration image and let our AI analyze it to create a detailed design brief
- **Designer Discovery**: Browse and connect with talented fashion designers who match your style
- **Custom Requests**: Submit detailed design requests with your preferences and requirements
- **Designer Portfolios**: Designers can showcase their work and connect with potential clients

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **AI**: Google Gemini 2.5 Flash for image analysis and design brief generation
- **Styling**: Clean, modern design with lime green (#00b67f) accent color

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
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build the project:
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

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Set environment variables in Netlify dashboard:
   - Add `VITE_GEMINI_API_KEY` with your Gemini API key

## API Keys

To use the AI features, you'll need a Google Gemini API key:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables as `VITE_GEMINI_API_KEY`

## Project Structure

```
sewna/
├── components/          # React components
│   ├── WelcomePage.tsx
│   ├── CustomRequestPage.tsx
│   ├── DesignerPortfolioUpload.tsx
│   ├── DesignerDiscoveryPage.tsx
│   └── icons/           # Icon components
├── services/           # API services
│   └── geminiService.ts
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.html         # HTML template
└── vite.config.ts     # Vite configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).
