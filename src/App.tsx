import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import SchedulePage from './pages/SchedulePage';
import PageTransition from './components/common/PageTransition';

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/services" element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          } />
          <Route path="/schedule" element={
            <PageTransition>
              <SchedulePage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
