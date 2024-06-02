import React from 'react';
import newStyles from "../Styles";
import {Box, Typography} from "@mui/material";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

const RatingBox = ({rating, ratingValue,showValue}) => {
    return (
        <>
            <Box sx={newStyles.proRationBox}>
                <Box sx={newStyles.proRatingCont}>{rating}&nbsp;<StarOutlinedIcon sx={newStyles.proStarRating}/></Box>
                {showValue&&<Typography sx={newStyles.proRatingValue}> {ratingValue} Ratings</Typography>}
            </Box>
        </>
    );
};

export default RatingBox;
