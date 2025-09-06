import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Cart() {
  const { cartItems, removeFromCart, completePurchase } = useApp();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    completePurchase();
    alert('Purchase completed! Check your order history.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">
          Add some items to your cart to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <span className="text-lg text-gray-600">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.product.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{item.product.category}</p>
                <p className="text-green-600 font-medium mt-1">${item.product.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between text-lg font-semibold mb-4">
          <span>Total:</span>
          <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <CreditCard className="h-5 w-5" />
          <span>Complete Purchase</span>
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          This is a demo - no actual payment will be processed
        </p>
      </div>
    </div>
  );
}