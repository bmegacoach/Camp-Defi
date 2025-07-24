# CAMP Elite Frontend

A modern, responsive React application for the CAMP Elite DeFi strategy platform built with Vite, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- 🎨 **Beautiful UI**: Custom components with Radix UI and Framer Motion
- 🔗 **Web3 Integration**: RainbowKit, Wagmi, and Viem for wallet connectivity
- 📊 **Data Visualization**: Charts.js and Recharts for market analytics
- 🔄 **Real-time Data**: TanStack Query for efficient data fetching
- 🎯 **Type Safety**: Full TypeScript support with strict type checking
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- Git

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd camp-elite-frontend
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_API_BASE_URL=https://your-backend-api.railway.app

# Optional
VITE_ANALYTICS_ID=your_analytics_id
VITE_DEFAULT_CHAIN_ID=1
VITE_ENABLE_TESTNETS=false
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy via Vercel dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

### Environment Variables for Vercel

Add these environment variables in your Vercel dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_WALLET_CONNECT_PROJECT_ID`
- `VITE_API_BASE_URL`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Dashboard/      # Dashboard components
│   ├── Market/         # Market analysis components
│   ├── Portfolio/      # Portfolio management
│   ├── LabAI/          # AI chat interface
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configs
├── App.tsx             # Main app component
└── main.tsx           # Application entry point
```

## Performance Optimizations

- **Code splitting**: Automatic route-based splitting
- **Asset optimization**: Vite's built-in optimization
- **Caching**: Vercel edge caching for static assets
- **Bundle analysis**: Use `npm run build` to analyze bundle size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is proprietary and confidential.
