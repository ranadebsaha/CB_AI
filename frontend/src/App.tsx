import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import LiveDetectionPage from './pages/LiveDetectionPage';
import Navbar from './components/Navbar';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/live" element={<LiveDetectionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;