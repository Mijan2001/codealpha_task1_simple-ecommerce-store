import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const { state } = useCart();
    const itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold text-gray-800"
                        >
                            SimpleStore
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/add-product"
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                        >
                            <PlusCircle size={20} />
                            <span>Add Product</span>
                        </Link>

                        <Link
                            to="/cart"
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 relative"
                        >
                            <ShoppingCart size={20} />
                            <span>Cart</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
