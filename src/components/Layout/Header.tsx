import React from 'react';
import { ShoppingCart, User, Leaf, Search, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  title?: string;
}

export function Header({ onSearch, showSearch = false, title }: HeaderProps) {
  const { currentUser, logout, cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoFinds</h1>
              {title && <p className="text-sm text-gray-600">{title}</p>}
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.username}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}