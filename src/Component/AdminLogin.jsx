import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import ValueField from "../CommonComponents/Fields/ValueField";
import ProductBuyButton from "../CommonComponents/Buttons/ProductBuyButton";
import newStyles from "./Styles"
import axios from 'axios';

const AdminLogin = () => {
    const [adminData, setAdminData] = useState({email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const addUserValue = ({target: {value, name}}) => {
        setAdminData((prevData) => {
            return {...prevData, [name]: value};
        });
    };
//     useEffect(() => {
//         const token = localStorage.getItem('adminUser')
// if(token)navigate('/addProduct')
//     }, [])

    const loginUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/loginUser`, adminData);
            if (response.data.data._id) {
                localStorage.setItem('adminUser', response.data.data._id)
                navigate('/addProduct');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Box sx={newStyles.loginPage}>
            <Box sx={newStyles.loginPageFields}>
                <Typography sx={newStyles.loginPageTitle}>Admin Login</Typography>
                <ValueField
                    sx={{mb: 2, mt: 4}}
                    fullWidth
                    name='email'
                    label='Email'
                    value={adminData.email}
                    onChange={addUserValue}
                />
                <ValueField
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    value={adminData.password}
                    onChange={addUserValue}
                />
                {errorMessage && (
                    <Typography color="error" sx={newStyles.loginPsError}>
                        {errorMessage}
                    </Typography>
                )}
                <Typography sx={newStyles.loginBtn}>
                    <ProductBuyButton onClick={loginUser} name={'Login'}/>
                </Typography>
            </Box>
        </Box>
    );
};

export default AdminLogin;
