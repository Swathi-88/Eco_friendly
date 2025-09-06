import React from 'react';
import { Home, Package, ShoppingCart, User, History } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'feed', label: 'Browse', icon: Home },
    { id: 'my-listings', label: 'My Items', icon: Package },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'purchases', label: 'Orders', icon: History },
    { id: 'dashboard', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:w-64 md:bg-gray-50">
      <div className="flex md:flex-col md:h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start space-x-0 md:space-x-3 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}