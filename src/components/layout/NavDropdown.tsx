import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items: Array<{
    to: string;
    label: string;
  }>;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-[#777A55] hover:text-[#777A55]/80 px-4 py-2">
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EBEBDA] hover:text-[#777A55]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
