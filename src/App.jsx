import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/LoginPage";
import Signup from "./Pages/SignupPage";
import Dashboard from "./Pages/dashboardPage";
// import AdminDashboard from "./Pages/adminPage";
import ShopPage from "./Pages/shopPage";
import ProductDetails from "./Pages/productDetails";
import CartPage from "./Pages/cartPage";
// import OtpPage from "./Pages/OtpPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/otp/:userId" element={<OtpPage/>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/shop" element={<ShopPage />} /> 
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}
