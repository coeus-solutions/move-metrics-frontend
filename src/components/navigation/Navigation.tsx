import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart2, ArrowLeftRight, Building2 } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { NavLink } from './NavLink';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MoveMetrics</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" icon={Home}>
                Dashboard
              </NavLink>
              <NavLink to="/cities" icon={Building2}>
                Cities
              </NavLink>
              <NavLink to="/compare" icon={ArrowLeftRight}>
                Compare
              </NavLink>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}