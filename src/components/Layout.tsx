import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, LogOut, User, ArrowLeftRight } from 'lucide-react';
import { Navigation } from './navigation/Navigation';
import { UserMenu } from './navigation/UserMenu';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}