import React from 'react';
import {Box} from "@mui/material";
import newStyles from "../Styles";

const ProductBuyButton = ({onClick,name,...rest}) => {
    return (
        <>
            <Box sx={newStyles.proBuyBtn}{...rest} onClick={onClick}>
                {name||'Buy Now'}
            </Box>
        </>
    );
};

export default ProductBuyButton;
