import React from 'react';
import { Package, Calendar, DollarSign } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function PurchaseHistory() {
  const { purchases } = useApp();

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
        <p className="text-gray-600">
          Your purchase history will appear here after you buy items
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
          <p className="text-gray-600 mt-1">
            {purchases.length} {purchases.length === 1 ? 'purchase' : 'purchases'} • Total spent: ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={purchase.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
                  alt={purchase.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{purchase.product.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>{purchase.product.category}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(purchase.purchaseDate)}</span>
                  </span>
                </div>
              </div>

              {/* Purchase Details */}
              <div className="text-right">
                <div className="flex items-center space-x-2 text-gray-600 text-sm mb-1">
                  <span>Qty: {purchase.quantity}</span>
                </div>
                <div className="flex items-center space-x-1 text-lg font-semibold text-green-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{purchase.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Purchased from <span className="font-medium">{purchase.product.sellerName}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}