import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const VersePage = lazy(() => import('./pages/VersePage').then((m) => ({ default: m.VersePage })));

function PageLoader() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/verse/:id" element={<VersePage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
