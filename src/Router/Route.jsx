import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "../Component/Dashboard";
import Product from "../Component/Product";
import Cart from "../Component/Cart";
import AdminLogin from "../Component/AdminLogin";
import AddProduct from "../Component/AddProduct";
import AddSubProduct from "../Component/AddSubProduct";
import Banner from "../Component/Banner";

const AllRoute = () => {
    return (<>
        <div style={newStyle.coverRoute}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/login" element={<AdminLogin/>}/>
                    <Route path="/addProduct" element={<AddProduct/>}/>
                    <Route path="/addSubProduct" element={<AddSubProduct/>}/>
                    <Route path="/addBanner" element={<Banner/>}/>
                </Routes>
            </Router>
        </div>
    </>);
};

export default AllRoute;
const newStyle = {
    coverRoute: {height: '100dvh'}
};
