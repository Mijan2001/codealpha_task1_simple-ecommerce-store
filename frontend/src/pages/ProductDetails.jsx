import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { dispatch } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `https://backend-558k.onrender.com/api/products/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                toast.error('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch({ type: 'ADD_TO_CART', payload: product });
            toast.success('Added to cart');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Product not found
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {product.title}
                    </h1>
                    <p className="mt-4 text-xl text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="mt-4 text-gray-600">{product.description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                        <ShoppingCart size={24} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
