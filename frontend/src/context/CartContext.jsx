import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialCartState = {
    items: []
};

// Create Context
const CartContext = createContext(null);

// Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(
                item => item._id === action.payload._id
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item._id === action.payload._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case 'CLEAR_CART':
            return { items: [] };

        default:
            return state;
    }
};

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
