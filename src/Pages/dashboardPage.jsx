import React, { useState } from "react";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom"; 
const Dashboard = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/shop');
    }
    return (
        <MainLayout>
            <div className="grid grid-cols-1    ">
                <div className=" grid h-screen bg-cover bg-center bg-[url('../public/1.webp')]" >
                    <p className="text-7xl text-white justify-center items-center self-center text-center font-bold">
                        PLAN YOUR ADVENTURE
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    <div className="bg-black flex flex-col justify-center items-center ">
                        <p className="text-6xl text-white text-center mb-4">NEW ARRIVALS</p>
                        <button className="bg-transparent border-2 border-white text-white  py-2 p-5 text-xl" onClick={handleClick}>SHOP NOW</button>
                    </div>
                    <div className="bg-[url('../public/2.webp')] h-screen bg-cover bg-center"></div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="bg-[url('../public/3.jpg')] h-[500px] bg-cover bg-center"></div>
                    <div className="bg-[url('../public/3.jpg')] h-[500px] bg-cover bg-center"></div>
                    <div className="bg-[url('../public/3.jpg')] h-[500px] bg-cover bg-center"></div>
                </div>
                <div className="bg-black h-[550px] grid grid-cols-3 p-20">
                    <div className="bg-[url('../public/b-1.webp')]"></div>
                    <div className="bg-[url('../public/b-2.webp')]"></div>
                    <div className="bg-[url('../public/b-3.webp')]"></div>
                </div>
                <div className=" grid grid-cols-2 h-[650px] bg-[url('../public/4.webp')] bg-cover" id='about'>
                    <div className="bg-black opacity-70 flex flex-col justify-center items-center">
                        <p className="text-4xl text-white text-center mb-4">ABOUT US</p>
                        <p className="text-lg text-white text-left mx-20">I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.</p>
                    </div>
                    <div></div>
                </div>
                <div className=" grid grid-cols-2 h-[650px] bg-black" id='contact'>
                    <div className="mx-20 mt-20 pt-20">
                        <div className="flex flex-col">
                            <label className="text-white my-2">Full Name</label>
                            <input className="p-2 rounded"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white my-2">Email</label>
                            <input className="p-2 rounded"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white my-2">Subject</label>
                            <input className="p-2 rounded"></input>
                        </div>
                        <div className="flex flex-col">
                            <label for='message' className="text-white my-2">Message</label>
                            <textarea name="message" rows="4" cols="50" className="rounded"></textarea>
                        </div>
                        <button className="text-white border-2 border-white rounded px-4 py-2 p-5 mt-3">Send</button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-4xl text-white text-center mb-4">CONTACT</p>
                        <p className="text-lg text-white text-left mx-20 mb-4">I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.</p>
                        <p className="text-lg text-white text-left">info@my-domain.com</p>
                        <p className="text-lg text-white text-left ">Tel: 1-800-000-0000</p>
                    </div>
                </div>
                <div className="grid grid-rows-[70%_30%] h-[550px]">
                    <div className="bg-black opacity-90">
                        <div className="flex flex-col justify-center items-center mt-10">
                            <p className="text-5xl text-white text-center mb-4">JOIN OUR MAILING LIST</p>
                            <p className="text-2xl text-white text-left mx-20">AND NEVER MISS AN UPDATE</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col w-[35%]">
                                <label className="text-white my-2 text-xl mt-3">Email</label>
                                <input className="p-3 rounded"></input>
                                <button className="text-white border-2 border-white px-5 p-3 mt-2">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black opacity-85 flex flex-row justify-center items-center ">
                        <div className="mx-20"><p className="text-lg text-white text-center">© 2035 by NORTHPOLE. Powered and secured by SMAX</p></div>
                        <div className="grid grid-cols-4 ">
                            <div><p className="text-lg text-white text-center">FAQ</p></div>
                            <div><p className="text-lg text-white text-center">Groups</p></div>
                            <div><p className="text-lg text-white text-center">Shipping & Returns</p></div>
                            <div><p className="text-lg text-white text-center">T&C </p></div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
