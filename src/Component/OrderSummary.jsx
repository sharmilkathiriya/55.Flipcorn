import React from 'react';
import {Box, Typography} from "@mui/material";
import newStyles from "./Styles";

const OrderSummary = ({userData}) => {
    const {offer, price, mrp} = userData.productData
    return (
        <>
            <Box sx={newStyles.osDetails}>
                <Typography sx={newStyles.osDetailsDel}>Delivered to:</Typography>
                <Typography>{userData?.userData?.addressOne}</Typography>
                <Typography>{userData?.userData?.addressTwo}</Typography>
                <Box>
                    <Box>
                        <img/>
                        <Typography>Qty: 1</Typography>
                    </Box>
                    <Box>
                        <Typography sx={newStyles.osProData}>
                            <span style={newStyles.osOffData}>{offer}% Off</span>&nbsp;&nbsp;
                            <span style={newStyles.osFullPrice}>{price}</span>&nbsp;&nbsp;
                            <span>₹{Number(price)-Number(mrp)}</span></Typography>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Typography sx={newStyles.allDetails}>Price Details:</Typography>
                        <Box sx={newStyles.detailsLine}>
                            <Typography sx={newStyles.detailsTitle}>Price (1 item)</Typography>
                            <Typography sx={newStyles.detailsTitle}>₹{price}</Typography></Box>
                        <Box sx={newStyles.detailsLine}><Typography sx={newStyles.detailsTitle}>Discount</Typography>
                            <Typography sx={{...newStyles.detailsTitle, color: '#008c00'}}>-₹{mrp}</Typography></Box>
                        <Box sx={newStyles.detailsLine}><Typography sx={newStyles.detailsTitle}>Delivery Charges</Typography>
                            <Typography sx={{...newStyles.detailsTitle, color: '#008c00'}}>FREE Delivery</Typography></Box>
                        <Box sx={{...newStyles.detailsLine, mt: 3}}><Typography sx={newStyles.detailsTitle}>Total Amount</Typography>
                            <Typography sx={newStyles.detailsTitle}>₹{Number(price)-Number(mrp)}</Typography></Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default OrderSummary;
