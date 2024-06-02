import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import newStyles from "../Styles";
import Images from "../Image/Images";

const SectionProduct = ({label,type,off,img}) => {
    return (
        <Box sx={newStyles.sectionProductBox}>
            <Box sx={newStyles.sectionProductImageBox}>
                <Images src={img} style={newStyles.sectionProductImg}/>
            </Box>
            <Box>
                <Typography sx={newStyles.sectionProductLabel}>{label}</Typography>
                <Typography sx={newStyles.sectionProductType}>{type || `Min. ${off}% Off`}</Typography>
            </Box>
        </Box>
    );
};

export default SectionProduct;
