import React from 'react';
import { Heart, MapPin, Calendar, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  showActions?: boolean;
}

export function ProductCard({ product, onClick, showActions = true }: ProductCardProps) {
  const { addToCart, currentUser } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOwnProduct = currentUser?.id === product.sellerId;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.condition}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
            {product.title}
          </h3>
          <span className="text-lg font-bold text-green-600 ml-2">
            ${product.price}
          </span>
        </div>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{product.sellerName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(product.datePosted)}</span>
          </div>
        </div>

        {showActions && !isOwnProduct && (
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}