import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthForm } from './components/auth/AuthForm';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Cities } from './pages/Cities';
import { CityAnalysis } from './pages/CityAnalysis';
import { CityComparison } from './pages/CityComparison';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/signup" element={<AuthForm type="signup" />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cities" element={<Cities />} />
          <Route path="city/:cityName" element={<CityAnalysis />} />
          <Route path="compare" element={<CityComparison />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}