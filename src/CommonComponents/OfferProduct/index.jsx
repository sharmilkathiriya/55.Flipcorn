import React from 'react';
import {Box, Grid, Badge, Typography, Button} from "@mui/material";
import ProductBuyButton from "../Buttons/ProductBuyButton";
import newStyles from "../Styles";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Images from "../Image/Images";

const OfferProduct = ({value, setLikeProduct}) => {
    return (
        <>
            <Box sx={{border: '1px solid rgba(0, 0, 0, .125) ', borderRadius: '0.25rem'}}>
                <Box sx={newStyles.proImgBox} style={{position: 'relative'}}>
                    <Images src={value.productImg} style={{width: '100%'}}/>
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        paddingRight: '20px',
                        paddingTop: '20px',
                    }}>
                        <Box sx={{border: '1px solid rgba(0, 0, 0, .125)', borderRadius: '25px', p: 0.5, display: 'flex'}} onClick={setLikeProduct}>
                            {value.like ? <FavoriteRoundedIcon style={{color: '#ff7575', fontSize: '2rem'}}/> :
                                <FavoriteBorderRoundedIcon style={{color: '#ff7575', fontSize: '2rem'}}/>}
                        </Box>
                    </div>
                </Box>
                <Box sx={{p: 1.5}}>
                    <Typography sx={{fontSize: '1rem', fontWeight: 500, lineHeight: '1.2', mb: 1}}>{value.title}</Typography>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <ProductBuyButton/>
                    </Box>
                </Box>
            </Box>

        </>
    );
};

export default OfferProduct;
