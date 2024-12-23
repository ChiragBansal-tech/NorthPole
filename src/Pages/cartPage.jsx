import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout"; 
import axios from 'axios'; 

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/cart/cart/${user.id}`);
                    setCartItems(response.data.cart);
                    setLoading(false);
                    console.log(response.data.cart, 'response');
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    setLoading(false);
                }
            };
            fetchCartItems(); 
        }
    }, [user.id]);

    const handleRemoveFromCart = async (productId) => {
        try {
           const response = await axios.delete(`http://localhost:3000/cart/remove-from-cart`, {
                data: {
                    userId: user.id,
                    productId: productId,
                }
            });
            if(response.status == 200) {
                fetchCartItems(); 
            }
            setCartItems(cartItems.filter(item => item.productId._id !== productId));
            console.log('Item removed from cart');
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="bg-black h-screen text-gray-400">
                    <div className="border-b-2 border-gray-400 mx-20 pt-[120px] text-center pb-5">
                        <p className="text-gray-400 text-5xl">Loading...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (cartItems.length === 0) {
        return (
            <MainLayout>
                <div className="ABC bg-black h-screen text-gray-400">
                    <div className="border-b-2 border-gray-400 mx-20 pt-[120px] text-center pb-5">
                        <p className="text-gray-400 text-5xl">Your Cart Is Empty</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {cartItems.map((product) => (
                <div
                    key={product.productId._id}
                    className="bg-black h-screen grid grid-cols-2 text-white px-20 pt-20 justify-evenly"
                >
                    <div>
                        <img
                            src={`http://localhost:3000/${product.productId.productImage}`}
                            alt={product.productId.productName}
                        />
                    </div>
                    <div className="pt-20">
                        <p className="text-4xl mb-2">{product.productId.productName}</p>
                        <p className="text-xl mb-2">Type: {product.productId.type}</p>
                        <p className="text-lg mb-2">Price: ${product.productId.price}</p>
                        <p className="text-lg">Color: {product.productId.color}</p>
                        <p className="text-lg mb-2">Quantity: {product.quantity}</p>
                        <div className="grid grid-cols-2 justify-between">
                            <div>
                                <button
                                    className="transparent border-2 text-lg border-white text-white py-2 px-5"
                                    onClick={() => handleRemoveFromCart(product.productId._id)}
                                >
                                    Remove
                                </button>
                            </div>
                            <div>
                                <p className="text-2xl">
                                    Total: ${product.productId.price} * {product.quantity} = $
                                    {(product.productId.price * product.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </MainLayout>
    );
};

export default CartPage;
