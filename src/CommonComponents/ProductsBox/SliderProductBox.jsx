import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import newStyles from "../Styles";
import RatingBox from "../RatingBox,jsx";
import ProductBuyButton from "../Buttons/ProductBuyButton";
import Images from "../Image/Images";

const SliderProductBox = ({productImg, productLabel, off, offPrice, price, rating, ratingValue, onClick}) => {
    return (
        <Box sx={newStyles.sliderProBox}>
            <Box sx={newStyles.proImgBox} style={{position: 'relative'}}>
                <Images src={productImg} style={newStyles.proImg}/>

                <div style={newStyles.sliderBox}>
                    <RatingBox rating={rating} ratingValue={ratingValue} showValue={false}/>
                </div>
            </Box>
            <Typography sx={newStyles.proLabelView}>{productLabel}</Typography>
            <div>
                <span style={{...newStyles.proOffPrice, ...newStyles.proOffLabel}}>₹{parseInt(offPrice)}</span>&nbsp;&nbsp;
                <span style={newStyles.proPriceBoxLabel}>₹{parseInt(price)}</span>
            </div>
            <span style={newStyles.proOffList}>{off}% Off</span>&nbsp;&nbsp;
            <Grid>

                <Box sx={newStyles.proBoxBtn}>
                    <Box sx={newStyles.proBoxBtnInside}>
                        <ProductBuyButton onClick={onClick}/>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default SliderProductBox;
