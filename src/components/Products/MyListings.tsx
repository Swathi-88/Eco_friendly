import React from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProductCard } from './ProductCard';

interface MyListingsProps {
  onAddProduct: () => void;
  onEditProduct: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

export function MyListings({ onAddProduct, onEditProduct, onProductClick }: MyListingsProps) {
  const { products, currentUser, deleteProduct } = useApp();
  
  const myProducts = products.filter(product => 
    currentUser && product.sellerId === currentUser.id
  );

  const handleDelete = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(productId);
    }
  };

  const totalValue = myProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600 mt-1">
            {myProducts.length} items • Total value: ${totalValue.toFixed(2)}
          </p>
        </div>
        <button
          onClick={onAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      {myProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-6">
            Start selling by listing your first item
          </p>
          <button
            onClick={onAddProduct}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            List Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myProducts.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard
                product={product}
                onClick={() => onProductClick(product.id)}
                showActions={false}
              />
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(product.id);
                  }}
                  className="bg-blue-600 text-white p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors"
                  title="Edit listing"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => handleDelete(product.id, e)}
                  className="bg-red-600 text-white p-2 rounded-full shadow-sm hover:bg-red-700 transition-colors"
                  title="Delete listing"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}