# CB-AI Frontend

Modern React TypeScript web application for debris and garbage detection. Provides an intuitive interface for uploading images/videos and analyzing live streams with real-time AI detection results.

## About

The frontend provides a user-friendly interface for interacting with the CB-AI detection system. Built with React 18 and TypeScript, it features a responsive design with dark/light theme support, drag-and-drop uploads, and real-time processing feedback.

Key features:
- Image and video upload with drag-and-drop
- Live stream detection interface
- Real-time processing status and statistics
- Dark/light theme toggle
- Responsive design for all devices
- Download processed media
- Material-UI components
- TypeScript for type safety

## Built With

- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- React Router DOM 7.6.2
- Material-UI (MUI) 7.2.0
- Emotion (styled components)
- Tailwind CSS 3.4.1
- Lucide React 0.344.0
- PostCSS 8.4.35
- Autoprefixer 10.4.18

## Getting Started

### Prerequisites

```bash
node --version  # v18 or higher
npm --version   # v9 or higher
```

### Installation

1. Navigate to the frontend directory
   ```bash
   cd cb-ai/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure backend API URL (if needed)
   
   Update API endpoints in component files if backend is not running on `http://localhost:5000`

4. Start the development server
   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

5. Build for production (optional)
   ```bash
   npm run build
   ```

   Production build will be in the `dist/` directory.

## Usage

### Development Server

```bash
npm run dev
# Server starts at http://localhost:5173
# Hot Module Replacement (HMR) enabled
```

### Building for Production

```bash
npm run build
# Output: dist/
# Optimized and minified build ready for deployment
```

### Preview Production Build

```bash
npm run preview
# Preview production build locally before deployment
```

### Code Quality

```bash
npm run lint
# Run ESLint to check code quality and style
```

## Features

### Upload Page (`/`)
- Upload images (JPG, JPEG, PNG)
- Upload videos (MP4, AVI, MOV)
- Drag-and-drop file upload
- Preview uploaded media
- View annotated results with bounding boxes
- Download processed images/videos
- Detection statistics display
- Progress indicators during processing

### Live Detection Page (`/live`)
- Connect to RTSP/HTTP streams
- Webcam integration support
- Real-time detection statistics
- Stream status monitoring
- Connection management

### UI/UX Features
- Dark/light theme toggle
- Responsive navigation
- Loading animations
- Error handling with user feedback
- Smooth transitions
- Accessible components
- Mobile-optimized layouts

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar with theme toggle
│   │   └── Loader.tsx          # Loading spinner component
│   ├── pages/
│   │   ├── UploadPage.tsx      # Image/video upload and processing
│   │   └── LiveDetectionPage.tsx  # Live stream detection
│   ├── assets/                 # Static assets (images, icons)
│   ├── App.tsx                 # Main application component with routing
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles and Tailwind imports
│   └── vite-env.d.ts           # Vite type definitions
├── public/                     # Static public assets
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node-specific TypeScript config
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
└── README.md                   # This file
```

## Components

### Navbar
Navigation component with:
- Home link (Upload page)
- Live Detection link
- Dark/light theme toggle
- Responsive mobile menu
- Smooth transitions

### Loader
Reusable loading indicator:
- Animated spinner
- Centered display
- Theme-aware styling
- Used during processing states

### UploadPage
Main upload interface:
- File selection (click or drag-and-drop)
- File type validation
- Upload progress tracking
- Result display with annotations
- Download functionality
- Detection statistics

### LiveDetectionPage
Live stream interface:
- Stream URL input
- Connection management
- Real-time detection stats
- Status indicators
- Error handling

## API Integration

### Backend Endpoints

```typescript
// Image upload
POST http://localhost:5000/upload/image
Content-Type: multipart/form-data

// Video upload
POST http://localhost:5000/upload/video
Content-Type: multipart/form-data

// Live stream
POST http://localhost:5000/stream/live
Content-Type: application/x-www-form-urlencoded

// Get processed media
GET http://localhost:5000/get_image/<filename>
GET http://localhost:5000/get_video/<filename>

// Download media
GET http://localhost:5000/download_image/<filename>
GET http://localhost:5000/download_video/<filename>
```

### Example API Call

```typescript
// Image upload example
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:5000/upload/image', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  // Handle response
};
```

## Styling

### Tailwind CSS
Custom configuration with:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Utility classes

### Theme Implementation
```typescript
// App.tsx
const [theme, setTheme] = useState('light');

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);
```

### Dark Mode Classes
```tsx
// Example usage
<div className="bg-white dark:bg-black text-black dark:text-white">
  Content
</div>
```

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### tailwind.config.js
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

### tsconfig.json
TypeScript configuration with strict mode enabled for type safety.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript interfaces for props
- Keep components under 300 lines
- Use meaningful variable names
- Add comments for complex logic

### TypeScript
```typescript
// Define props interface
interface UploadPageProps {
  onUploadComplete?: (result: DetectionResult) => void;
}

// Use interface in component
const UploadPage: React.FC<UploadPageProps> = ({ onUploadComplete }) => {
  // Component logic
};
```

### State Management
```typescript
// Use useState for local state
const [file, setFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);

// Use refs for DOM access
const fileInputRef = useRef<HTMLInputElement>(null);
```

### Error Handling
```typescript
try {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Upload failed');
  const data = await response.json();
  // Handle success
} catch (error) {
  console.error(error);
  alert('Error: ' + error.message);
}
```

## Deployment

### Build for Production
```bash
npm run build
# Output: dist/ directory
```

### Deploy to Static Hosting
```bash
# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3
# - Any static hosting service
```

### Environment Variables
Create `.env` file for environment-specific configuration:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=CB-AI
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Browser Compatibility

Supports modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading for heavy components
- Memoization with useMemo/useCallback
- Virtual scrolling for large lists (if needed)

## Troubleshooting

**Issue: CORS errors**
- Solution: Ensure backend has CORS enabled and is running

**Issue: File upload fails**
- Solution: Check file size limits and format compatibility

**Issue: Build errors**
- Solution: Clear node_modules and reinstall dependencies
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Issue: Type errors**
- Solution: Update TypeScript definitions
  ```bash
  npm install --save-dev @types/react @types/react-dom
  ```

## Roadmap

- [ ] User authentication and authorization
- [ ] Detection history dashboard
- [ ] Real-time webcam detection in browser
- [ ] Batch file upload
- [ ] Advanced filtering and sorting
- [ ] Export detection data (CSV/JSON)
- [ ] Video trimming and editing
- [ ] Annotation tools
- [ ] Mobile application

## Contributing

Follow the main project contributing guidelines. For frontend-specific contributions:

1. Follow TypeScript strict mode
2. Use functional components
3. Write meaningful commit messages
4. Test thoroughly before PR
5. Update documentation

## License

This project is available for use under standard open-source practices.

## Contact

For frontend-specific issues, refer to the main project repository.

## Acknowledgments

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Material-UI](https://mui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icon library
