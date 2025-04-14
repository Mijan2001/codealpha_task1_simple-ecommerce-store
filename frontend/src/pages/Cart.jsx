import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const orderSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone number is required')
});

export const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(orderSchema)
    });

    const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleQuantityChange = (id, change) => {
        const item = state.items.find(item => item._id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
                dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id, quantity: newQuantity }
                });
            } else {
                dispatch({ type: 'REMOVE_FROM_CART', payload: id });
            }
        }
    };

    const handleRemoveItem = id => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        toast.success('Item removed from cart');
    };

    const onSubmit = async data => {
        try {
            const orderData = {
                ...data,
                items: state.items,
                totalAmount
            };

            await axios.post(
                'https://backend-558k.onrender.com/api/orders',
                orderData
            );
            dispatch({ type: 'CLEAR_CART' });
            toast.success('Order placed successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to place order');
        }
    };

    if (state.items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Your cart is empty
                </h2>
                <p className="mt-2 text-gray-600">
                    Add some products to your cart to continue shopping
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                <div className="space-y-4">
                    {state.items.map(item => (
                        <div
                            key={item._id}
                            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(item._id, -1)
                                    }
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="w-8 text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(item._id, 1)
                                    }
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <Plus size={20} />
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <div className="text-xl font-semibold">
                        Total: ${totalAmount.toFixed(2)}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6">Order Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register('fullName')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            {...register('address')}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            {...register('phone')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};
