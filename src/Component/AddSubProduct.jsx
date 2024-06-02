import React, {useState} from 'react';
import {Box, Typography, Stack, Grid, Button, styled} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloudUploadIcon from "@mui/material/SvgIcon/SvgIcon";
import ValueField from "../CommonComponents/Fields/ValueField";
import axios from "axios";
import ProductBuyButton from "../CommonComponents/Buttons/ProductBuyButton";
import newStyles from "./Styles"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
        const now = (new Date()).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
};
const initialSubProduct = {image: '', variants: '', productDetails: '', variantsValue: ''}
const AddSubProduct = () => {
    const [totalSubProduct, setTotalSubProduct] = useState([initialSubProduct])
    const [productData, setProductData] = useState({user_id: localStorage.getItem('adminUser'), product_id: ''})

    const uploadImage = async (event, indexes, key) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('images', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload/upload/multiple_files`, formData);
            const imageUrl = response.data.data[0].url;
            if (imageUrl) {
                const addNewVariants = totalSubProduct.map((value, index) => {
                    return index === indexes ? {...value, [key]: imageUrl} : {...value}
                })
                setTotalSubProduct(addNewVariants)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const addProduct = () => {
        setTotalSubProduct((prevTotal) => [...prevTotal, initialSubProduct]);
    };
    const addVariant = (e, indexes, name) => {
        const addNewVariants = totalSubProduct.map((value, index) => {
            return index === indexes ? {...value, [name]: e.target.value} : {...value}
        })
        setTotalSubProduct(addNewVariants)
    }
    const addProductData = (e) => {
        const {name, value} = e.target
        setProductData((prevTotal) => {
            return {...prevTotal, [name]: value}
        });

    }
    const uploadSubProduct = throttle(async () => {

        totalSubProduct.map(value => value.image)
        const payload = {
            user_id:localStorage.getItem('adminUser'),
            product_id: productData.product_id,
            images: totalSubProduct.map(value => value.image),
            variants: totalSubProduct.map(value => {
                return {[value.variants]: Number(value.variantsValue)}
            }),
            productDetails: totalSubProduct.map(value => value.productDetails)
        };

        await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/addSubProduct`, payload).then(res => {
            console.log(res)
            setTotalSubProduct([initialSubProduct])
        }).catch(err => {
            console.error(err)
        })
    }, 2000);

    return (
        <Box sx={{m: 3}}>
            <Typography sx={newStyles.subProductTitle}>SubProduct</Typography>
            <Grid container>
                <Grid item xs={12} md={6} sx={{m: 1}}>
                    <ValueField sx={{m: 1}}
                                fullWidth
                                name='product_id'
                                label='Product ID'
                                value={productData.product_id}
                                onChange={addProductData}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{m: 1}}>
                    <ValueField sx={{m: 1}}
                                fullWidth
                                name='user_id'
                                label='User ID'
                                value={productData.user_id}
                                onChange={addProductData}
                    />
                </Grid>
            </Grid>
            {totalSubProduct.map((value, index) => {
                return (<>
                        <Box sx={newStyles.subProFil}>
                            <Grid>
                                <Grid item xs={12} md={6} sx={{m: 0}}>
                                    <ValueField sx={{m: 1, mt: 2}}
                                                fullWidth
                                                name='variants'
                                                label='Variants'
                                                value={value.variants}
                                                onChange={(e) => addVariant(e, index, 'variants')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{m: 0}}>
                                    <ValueField sx={{m: 1, mt: 2}}
                                                fullWidth
                                                name='variants'
                                                type='number'
                                                label='Variants Value'
                                                value={value.variantsValue}
                                                onChange={(e) => addVariant(e, index, 'variantsValue')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        sx={{mt: 2, m: 2}}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon/>}
                                    >
                                        Upload file for Variants
                                        <VisuallyHiddenInput type="file" onChange={(e) => uploadImage(e, index, 'image')}/>
                                    </Button>
                                    <Button
                                        sx={{mt: 2, m: 2}}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon/>}
                                    >
                                        Upload file for Details
                                        <VisuallyHiddenInput type="file" onChange={(e) => uploadImage(e, index, 'productDetails')}/>
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </>
                )
            })}

            <Box sx={newStyles.addSubProBtn}><AddCircleRoundedIcon
                sx={newStyles.addSubProIcon} onClick={addProduct}/></Box>
            <Box sx={newStyles.addPro}>
                <ProductBuyButton name='Add Sub Product' onClick={uploadSubProduct}/>
            </Box>
        </Box>
    )
};
export default AddSubProduct;
