import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import SideBarCompo from "../Components/sidebarComp";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts =  async() => {
            try{
                const response = await axios.get('http://localhost:3000/product/list');
                console.log(response)
                setProducts(response.data);
                setLoading(false);
            }
            catch(error){
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);
    
    const handleProductClick = (productId) => {
        navigate(`/productdetails/${productId}`);
    };
    

    if(loading){
        return <div>Loading products...</div>
    }

    return (
        <MainLayout>
            <div className="bg-black grid grid-cols-[20%_80%] text-white py-[90px]">
                <div><SideBarCompo /></div>
                <div className="px-10 pt-10">
                    <p className="text-6xl mb-5">All Products</p>
                    <p className="text-base">This is your category description. It’s a great place to tell customers what this category is about, connect with your audience and draw attention to your products.</p>
                    <div className="grid grid-cols-2 justify-between my-5">
                        <div>
                            <p>{products.length} products</p>
                        </div>
                        <div>
                            <p className="text-right">Sort by: Recommended</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-around">
                        {products.map((product) => (
                            <div
                                key={product._id} 
                                className="flex flex-col justify-center items-center text-white cursor-pointer"
                                onClick={() => handleProductClick(product._id)} 
                            >
                                <img
                                    src={`http://localhost:3000/${product.productImage}`}
                                    alt={product.productName}
                                    // className="w-full h-48 object-cover mb-4"
                                />
                                <p>{product.productName}</p>
                                <p className="text-lg mt-2">
                                    ${product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ShopPage;
