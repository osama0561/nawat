import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProBonoPage from './pages/ProBonoPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isProBono = pathname === '/pro-bono';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pro-bono" element={<ProBonoPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {/* Don't show dark footer on light pro-bono page */}
      {!isProBono && <Footer />}
      {isProBono && (
        <footer className="py-6 text-center text-xs" style={{ background: '#EDE9E0', color: '#999' }}>
          © {new Date().getFullYear()} نواة القانون — جميع الحقوق محفوظة
        </footer>
      )}
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
