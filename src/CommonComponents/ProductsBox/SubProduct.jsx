import React from 'react';
import {Box, Grid, Badge, Typography, Button} from "@mui/material";
import newStyles from "../Styles";
import Images from "../Image/Images";

const SubProduct = ({value, currentValue}) => {
    return (
        <Box sx={{...newStyles.subProBox,border: value.id === currentValue ? '1px solid #367dfb' : '1px solid #EEE',
            boxShadow: value.id === currentValue && '1px 1px 4px 0px #367dfb78',}}>
            <Images src={value.image} style={newStyles.subProductImg}/>
            <Typography sx={{fontSize: '14px'}}>{value.variant}</Typography>
        </Box>
    );
};

export default SubProduct;
