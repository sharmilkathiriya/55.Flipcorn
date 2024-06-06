import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography, Stepper, Step, StepLabel, FormHelperText} from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import newStyles from "../CommonComponents/Styles";
import {useLocation, useNavigate} from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductBuyButton from "../CommonComponents/Buttons/ProductBuyButton";
import ValueField from "../CommonComponents/Fields/ValueField";
import PhonePe from "./PhonePe";
import OrderSummary from "./OrderSummary";
import axios from "axios";

const steps = ['Address', 'Order Summary', 'Payment'];
let buyProduct = {
    productData: {},
    userData: {name: '', number: '', pincode: '', city: '', state: '', addressOne: '', addressTwo: ''}
}
const Cart = () => {
    const [userData, setUserData] = useState(buyProduct);
    const [stepperValue, setStepperValue] = useState(0)
    const [errors, setErrors] = useState({
        name: '',
        number: '',
        pincode: '',
        city: '',
        state: '',
        addressOne: '',
        addressTwo: ''
    });
    const navigate = useNavigate();
    const {state} = useLocation();

    const stepperBtn = () => {
        stepperValue === 0 ? buyProductProcess() : setStepperValue(stepperValue + 1)
    }

    useEffect(() => {
        setUserData((prevState) => ({
            ...prevState,
            productData: state?.productData
        }));
    }, [state.productData])

    const buyProductProcess = async () => {

        let allErrors = {};
        Object.keys(userData.userData).forEach(key => {
            const error = handleValidation(key, userData.userData[key]);
            if (error && error.length) {
                allErrors[key] = error;
            }
        });

        if (Object.keys(allErrors)?.length > 0) {
            console.log("allErrors", allErrors)
            setErrors(allErrors)
        } else {
            const productFormate = {
                user_id: localStorage.getItem('adminUser') || "66560f8fd65181a223a59ee9",
                product_id: userData.productData._id,
                fullname: userData.userData.name,
                mobileNumber: Number(userData.userData.number),
                pinCode: Number(userData.userData.pincode),
                city: userData.userData.city,
                state: userData.userData.state,
                address: userData.userData.addressOne,
                subAddress: userData.userData.addressTwo,
            }
            console.log("productFormate", productFormate)
            await axios.post(`${import.meta.env.VITE_BASE_URL}/user/buyProduct`, productFormate).then(res => {
                setStepperValue(stepperValue + 1)
            }).catch(err => {
                console.error(err)
            });
        }

    }
    const handleValidation = (key, value) => {
        switch (key) {
            case 'name':
                if (!value) {
                    return "Name is Require"
                } else {
                    return ''
                }
            case 'number':
                if (!value) {
                    return 'Mobile number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    return 'Mobile number must be 10 digits';
                } else {
                    return '';
                }
            case 'pincode':
                if (!value) {
                    return 'PinCode is required';
                } else if (!/^\d{6}$/.test(value)) {
                    return 'PinCode must be 6 digits';
                } else {
                    return '';
                }
            case 'city':
                if (!value) {
                    return 'City is Require'
                } else {
                    return ''
                }
            case 'state':
                if (!value) {
                    return 'State is Require'
                } else {
                    return ''
                }
            case 'addressOne':
                if (value.length === 0) {
                    return 'Address - 1 is Require'
                } else {
                    return ''
                }
            case "addressTwo":
                if (!value) {
                    return "Address - 2 is require"
                } else {
                    return ''
                }
            default:
                return ''
        }
    };


    const trackNumber = (value) => {
        return value.replace(/\D/g, '');
    }
    const addUserValue = ({target: {value, name}}) => {
        setUserData((preProps) => {
            return {...preProps, userData: {...preProps.userData, [name]: ['number', 'pincode'].includes(name) ? trackNumber(value) : value}}
        })
    }


    return (
        <>
            <Box>
                <Box sx={newStyles.cartFirstLabel}>
                    <KeyboardBackspaceRoundedIcon sx={newStyles.cartBackIcon} onClick={() => navigate(-1)}/>
                    <Typography>Add delivery address</Typography>
                </Box>
                <Box sx={{width: '100%'}}>
                    <Stepper activeStep={stepperValue} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {stepperValue == 0 && <>
                    <Box sx={{...newStyles.cartField,m:1}}>
                        <ValueField error={errors.name} helperText={errors.name} fullWidth name='name' label='Full Name'
                                    value={userData.userData.name} onChange={addUserValue}/>
                    </Box>
                    <Box sx={{...newStyles.cartField,m:1}}>
                        <ValueField inputProps={{maxLength: 10}} error={errors.number} helperText={errors.number} name='number' label='Number'
                                    value={userData.userData.number} onChange={addUserValue}/>
                    </Box>
                    <Box sx={{...newStyles.cartField,m:1}}>
                        <ValueField error={errors.city} helperText={errors.city} name='city' label='City' value={userData.userData.city}
                                    sx={{mr: 1}}
                                    onChange={addUserValue}/>
                        <ValueField inputProps={{maxLength: 6}} error={errors.pincode} helperText={errors.pincode} name='pincode' label='Pincode'
                                    value={userData.userData.pincode} onChange={addUserValue}/>
                    </Box>
                    <Box sx={{...newStyles.cartField,m:1}}>
                        <FormControl fullWidth error={Boolean(errors.state)}>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userData.userData.state}
                                name="state"
                                label="State"
                                onChange={addUserValue}
                            >{indiaRegions.map((value, index) => {
                                    return <MenuItem key={index} value={value}>{value}</MenuItem>
                                }
                            )}
                            </Select>
                            {errors.state && <FormHelperText style={{color: 'red'}}>{errors.state}</FormHelperText>}
                        </FormControl>
                    </Box>
                    <Box sx={{p: 1, maxWidth: '50%'}}>
                        <ValueField error={errors.addressOne} helperText={errors.addressOne} fullWidth name='addressOne' label='Address 1'
                                    value={userData.userData.addressOne} onChange={addUserValue}/>
                    </Box>
                    <Box sx={{p: 1, maxWidth: '50%'}}>
                        <ValueField error={errors.addressTwo} helperText={errors.addressTwo} fullWidth name='addressTwo' label='Address 2'
                                    value={userData.userData.addressTwo} onChange={addUserValue}/>
                    </Box>
                </>}
                {stepperValue === 1 && <><OrderSummary userData={userData}/></>}
                {stepperValue === 2 && <><PhonePe userData={userData}/></>}
                <Box sx={newStyles.cartBtnTitle}>
                    <ProductBuyButton name={stepperValue === 2 ? 'Pay' : 'Save'} onClick={stepperBtn}/>
                </Box>
            </Box>
        </>
    );
};

export default Cart;

const indiaRegions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh"
];
