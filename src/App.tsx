import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import PropertiesSale from './pages/PropertiesSale';
import PropertiesRent from './pages/PropertiesRent';
import PropertyDetail from './pages/PropertyDetail';
import Auth from './pages/Auth';
import VerifyEmail from './pages/VerifyEmail';
import RegisterSuccess from './pages/RegisterSuccess';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ban" element={<PropertiesSale />} />
            <Route path="/cho-thue" element={<PropertiesRent />} />
            <Route path="/chi-tiet/:id" element={<PropertyDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/verify" element={<VerifyEmail />} />
            <Route path="/auth/register-success" element={<RegisterSuccess />} />
            {/* Fallback → Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
