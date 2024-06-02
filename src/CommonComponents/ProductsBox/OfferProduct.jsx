import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {asu} from "../../assets";
import ProductBuyButton from "../Buttons/ProductBuyButton";
import newStyles from "../Styles";
import RatingBox from "../RatingBox,jsx";
import Images from "../Image/Images";

const ProductBox = ({productImg, productLabel, off, offPrice, price, rating, ratingValue, onClick}) => {
    return (
        <>
            <Box sx={newStyles.proBox} >
                <Box sx={newStyles.proImgBox}>
                    <Images src={productImg} style={newStyles.proImg}/>
                </Box>
                <Typography sx={newStyles.proLabel}>{productLabel}</Typography>
                <Typography sx={newStyles.proOff}>
                    <span>{off||0} Off</span>&nbsp;&nbsp;
                    <span style={newStyles.proOffPrice}>₹{parseInt(price)||0}</span>
                </Typography>
                <Typography sx={newStyles.proPriceBox}>₹{parseInt(price-offPrice)||0}<Images src={asu} style={newStyles.proPriceImg}/></Typography>
                <RatingBox rating={rating} ratingValue={ratingValue}/>
                <Grid>

                    <Typography sx={newStyles.proTitleLimit}>Limited time deal</Typography>
                    <Box sx={newStyles.proBoxBtn}>
                        <Box sx={newStyles.proBoxBtnInside}>
                            <ProductBuyButton onClick={onClick}/>
                        </Box>
                    </Box>
                    <Typography sx={newStyles.proExtraLabel}>Free Delivery in Two Days</Typography>
                </Grid>
            </Box>
        </>
    );
};

export default ProductBox;
