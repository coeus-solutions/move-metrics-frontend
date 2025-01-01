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
import { Provider } from 'react-redux';
import { store } from './store';
import { authService } from './services/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Landing page - accessible when not authenticated */}
          <Route path="/landing" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />
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
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/city/:cityName" element={<CityAnalysis />} />
            <Route path="/compare" element={<CityComparison />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Root redirect */}
          <Route path="/" element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />
          } />

          {/* Catch all route */}
          <Route path="*" element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}