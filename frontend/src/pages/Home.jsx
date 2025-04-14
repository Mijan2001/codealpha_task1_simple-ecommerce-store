import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dispatch } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'https://backend-558k.onrender.com/api/products'
                );
                setProducts(response.data);
            } catch (error) {
                toast.error('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = product => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        toast.success('Added to cart');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                        />
                    </Link>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {product.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            ${product.price.toFixed(2)}
                        </p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart size={20} />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
