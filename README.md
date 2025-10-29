# Carrotly Provider Onboarding MVP

A React + TypeScript prototype for the Carrotly Provider Onboarding Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── onboarding/      # Onboarding wizard components
│   ├── dashboard/       # Dashboard components
│   └── profile/         # Profile components
├── data/                # Mock data and dropdown options
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component with routing
└── main.tsx             # Entry point

```

## 🎨 Features

- ✅ Multi-step onboarding wizard (4 required steps + 1 optional)
- ✅ Multi-select provider types
- ✅ Standardized service selection
- ✅ Photo upload with preview
- ✅ Optional fields (collapsed by default)
- ✅ Profile preview (patient view)
- ✅ Dashboard with mock stats
- ✅ localStorage persistence

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **Recharts** - Charts

## 📝 Usage

### Onboarding Flow

1. **Start** → Landing page
2. **Step 1: Basics** → Practice name, provider types, contact info
3. **Step 2: Location** → Address (+ optional suite/website)
4. **Step 3: Photos** → Upload 1-5 photos
5. **Step 4: Services** → Select from standardized lists
6. **Step 5: Optional** → Licensing, certifications, insurance (skippable)
7. **Complete** → Celebration screen
8. **Preview** → See patient view of profile
9. **Dashboard** → Control center with stats

### Testing

Try different provider types to see different service lists:
- Medical → Annual Physical, Sick Visit, etc.
- Dental → Cleaning, Filling, Crown, etc.
- Cosmetic → Botox, Fillers, etc.
- Fitness → Personal Training, Group Classes, etc.
- Massage → Swedish, Deep Tissue, etc.
- Mental Health → Therapy, Counseling, etc.
- Skincare → Facials, Treatments, etc.

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (auto-detects Vite)
4. Done! Get shareable link

### Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
```

## 💾 Data Persistence

All data is saved to browser localStorage:
- Key: `carrotly_provider`
- Persists between sessions
- Clear with: `localStorage.clear()`

## 🎯 MVP Scope

**What's Real:**
- ✅ All forms work
- ✅ Photo upload and preview
- ✅ Navigation and routing
- ✅ Data validation
- ✅ Responsive design

**What's Mocked:**
- 🎭 Dashboard stats (fake numbers)
- 🎭 Appointments (sample data)
- 🎭 Reviews (sample data)
- 🎭 No real backend
- 🎭 No real authentication
- 🎭 No real payment processing

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5173
kill -9 $(lsof -ti:5173)
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
npm run build -- --mode development
```

## 📄 License

MIT - Built for Carrotly
