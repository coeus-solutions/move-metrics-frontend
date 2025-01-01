import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Cities } from './pages/Cities';
import { CityAnalysis } from './pages/CityAnalysis';
import { CityComparison } from './pages/CityComparison';
import { Profile } from './pages/Profile';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthRoute } from './components/auth/AuthRoute';
import { useState, useEffect } from 'react';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={
          token ? <Navigate to="/" replace /> : <Landing />
        } />
        
        {/* Auth routes - redirect to dashboard if logged in */}
        <Route path="/login" element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        } />
        <Route path="/signup" element={
          <AuthRoute>
            <SignupPage />
          </AuthRoute>
        } />

        {/* Protected routes - require authentication */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="cities" element={<Cities />} />
          <Route path="city/:cityName" element={<CityAnalysis />} />
          <Route path="compare" element={<CityComparison />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Redirect unmatched routes */}
        <Route path="*" element={
          token ? <Navigate to="/" replace /> : <Navigate to="/landing" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}