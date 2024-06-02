import React from 'react';
import {Box, Grid, Badge, Avatar, Stack} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import {useLocation, useNavigate} from 'react-router-dom'
import newStyles from "./Styles";
import {headerLogo} from "../assets/index"
import Images from "./Image/Images";


const Header = () => {
    const {pathname}= useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <Box sx={newStyles.cover}>

                <Box sx={newStyles.leftHeader}>
                    {pathname === '/' ? <MenuRoundedIcon sx={newStyles.menuIcon}/> :
                        <KeyboardBackspaceRoundedIcon sx={newStyles.menuBackIcon}
                                                      onClick={() => navigate(-1)}/>}
                    <Images src={headerLogo} style={newStyles.headerLogo}/>
                </Box>

                <Box sx={newStyles.rightHeader}>
                    <Stack direction="row">
                        <Badge overlap="circular" anchorOrigin={newStyles.badgePosition}
                               badgeContent={<div style={newStyles.headerCartBadge}>1</div>}>
                            <ShoppingCartRoundedIcon sx={newStyles.cartIcon}/>
                        </Badge>
                    </Stack>
                </Box>

            </Box>
        </div>
    );
};

export default Header;
