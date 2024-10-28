import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


const ProductDetails = () => {
    const { productId } = useParams();  
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/productdetails/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            alert('Please login to add items to the cart.');
            return;
        }
        try{
            await axios.post('http://localhost:3000/cart/add-to-cart', {
                userId: user.id,
                productId: product._id,
                quantity: 1
            });
             
            alert('Product added to cart!!');
        } catch(error) {
            console.error('Error adding to cart!', error);
        }
    };

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <MainLayout>
            <div className="bg-black grid grid-cols-2 text-white px-20 pt-[111px] justify-between">
                <div>
                    <p>Home / All Products / {product.productName}</p>
                </div>
                <div className="text-right">
                    <button>P</button>
                    <span> Prev | Next </span>
                    <button>N</button>
                </div>
            </div>
            <div className="bg-black grid grid-cols-2 text-white px-20  justify-evenly">
                <div className="grid grid-rows-1">
                    <div>
                        <img
                            src={`http://localhost:3000/${product.productImage}`}
                            alt={product.productName}
                        />
                    </div>
                    
                </div>
                <div className=" pt-[100px]">
                    <p className="text-4xl mb-2">{product.productName}</p>
                    <p className="text-2xl mb-2">{product.type}</p>
                    <p className="text-lg">${product.price}</p>
                    <p className="text-lg">Color: {product.color}</p>
                    <div>
                        <button 
                            className="transparent border-2 text-lg border-white text-white px-2 mt-2 mr-3 rounded"
                            onClick={handleAddToCart}
                        >Add to Cart</button>
                        <button className="bg-white border-2 text-lg border-white text-black px-2 rounded">Buy Now</button>
                    </div>
                    <div>
                        <p className="mt-5">{product.productDescription}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductDetails;
