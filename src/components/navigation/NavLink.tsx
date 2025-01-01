import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function NavLink({ to, icon: Icon, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
        isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      <Icon className="h-5 w-5 inline-block mr-1" />
      {children}
    </Link>
  );
}