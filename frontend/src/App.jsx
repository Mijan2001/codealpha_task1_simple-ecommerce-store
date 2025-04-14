import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AddProduct } from './pages/AddProduct';
import { Cart } from './pages/Cart';
import { ProductDetails } from './pages/ProductDetails';

function App() {
    return (
        <Router>
            <CartProvider>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/add-product"
                                element={<AddProduct />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route
                                path="/product/:id"
                                element={<ProductDetails />}
                            />
                        </Routes>
                    </main>
                    <Toaster position="top-right" />
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
