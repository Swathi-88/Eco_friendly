import React from 'react';
import { ArrowLeft, Calendar, MapPin, Tag, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const { products, addToCart, currentUser } = useApp();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <button onClick={onBack} className="mt-4 text-green-600 hover:text-green-700">
          Go back
        </button>
      </div>
    );
  }

  const isOwnProduct = currentUser?.id === product.sellerId;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>{product.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  {product.condition}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{product.sellerName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">Listed on {formatDate(product.datePosted)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isOwnProduct && (
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <p className="text-xs text-gray-500 text-center">
                Items are added to your cart for later purchase
              </p>
            </div>
          )}

          {isOwnProduct && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>This is your listing</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}