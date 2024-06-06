import React from 'react';
import {BrowserRouter as Router, Routes, Navigate, Route} from 'react-router-dom';
import Dashboard from "../Component/Dashboard";
import Product from "../Component/Product";
import Cart from "../Component/Cart";
import AdminLogin from "../Component/AdminLogin";
import AddProduct from "../Component/AddProduct";
import AddSubProduct from "../Component/AddSubProduct";
import Banner from "../Component/Banner";

const AllRoute = () => {

    const WithToken = ({children}) => {
        const checkToken = localStorage.getItem("adminUser")
        return checkToken ? children : <Navigate to="/login"/>
    };

    return (<>
        <div style={newStyle.coverRoute}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/login" element={localStorage.getItem("adminUser") ? <Navigate to="/addProduct"/> : <AdminLogin/>}/>
                    <Route path="/addProduct" element={<WithToken><AddProduct/></WithToken>}/>
                    <Route path="/addSubProduct" element={<WithToken><AddSubProduct/></WithToken>}/>
                    <Route path="/addBanner" element={<WithToken><Banner/></WithToken>}/>
                </Routes>
            </Router>
        </div>
    </>);
};

export default AllRoute;
const newStyle = {
    coverRoute: {height: '100dvh'}
};
