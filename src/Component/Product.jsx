import React, {useEffect, useState} from 'react';
import Header from "../CommonComponents/Header";
import OfferProduct from "../CommonComponents/OfferProduct";
import {Box, Grid, Typography} from "@mui/material";
import {offerImg, prd, purple, blue, white, Rating} from "../assets/index"
import newStyles from "./Styles"
import SubProduct from "../CommonComponents/ProductsBox/SubProduct";
import {useLocation, useNavigate} from "react-router-dom";
import RatingBox from "../CommonComponents/RatingBox,jsx";
import Images from "../CommonComponents/Image/Images";
import axios from "axios";

const subProduct = [
    {variant: 'Black', image: prd, id: 1, storage: ['30 Hr Battery', '60  Hr Battery'], size: ['120W', '200W', '260W']},
    {variant: 'Blue', image: purple, id: 2, storage: ['30 Hr Battery', '60  Hr Battery'], size: ['150W', '180W', '210W']},
    {variant: 'Purple', image: blue, id: 2, storage: ['50 Hr Battery', '40  Hr Battery'], size: ['120W', '140W', '230W']},
    {variant: 'White', image: white, id: 2, storage: ['90 Hr Battery', '80  Hr Battery'], size: ['150W', '200W', '260W']},
]
const offerProductData = [
    {productImg: offerImg, title: 'boAt Airdopes 141 Bluetooth TWS Earbuds', id: 1, like: false},
    {productImg: offerImg, title: 'boAt Airdopes 141 Bluetooth TWS Earbuds', id: 2, like: false},
]

const Product = () => {
    const [productData, setProductData] = useState({})
    const [subProducts, setSubProducts] = useState([{variant: '', image: '', price: '', id: 0}])
    const [currentProduct, setCurrentProduct] = useState(0)
    // const [currentProductStorage, setCurrentProductStorage] = useState(currentProduct.storage[0])
    // const [currentProductSize, setCurrentProductSize] = useState(currentProduct.size[0])
    const [likeProduct, setLikeProduct] = useState(offerProductData)
    const navigate = useNavigate();
    const {state} = useLocation();

    const buyProduct = () => {
        navigate(`/cart`, {
            state: {productData},
        })
    };

    useEffect(() => {
        setProductData(state.value)
        getSubProduct(state.value)
    }, [state.value]);
    const calculateDiscountedPrice=(originalPrice, discountPercentage)=> {
        const discountAmount = (originalPrice * discountPercentage) / 100;
        return  originalPrice - discountAmount

    }
    const getSubProduct = async (value) => {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/user/getSubProductById`, {
            product_id: value?._id
        }).then(res => {
            if (res.data.data[0].variants) {
                const subData = res.data.data[0].variants.map((value, index) => {
                    return {variant: Object.keys(value)[0], price: Object.values(value)[0], image: res.data.data[0].images[index], id: index}
                })
                setProductData((prevTotal) => {
                    return {...prevTotal, image: subData[0].image, price: subData[0].price}
                });(state.value)
                setSubProducts(subData)
            }

        }).catch(err => {
            console.error(err)
        });
    }

    const likeNewProduct = (newValue) => {
        const makeData = likeProduct.map((value) => {
            return value.id === newValue.id ? {...value, like: !value.like} : value
        })
        setLikeProduct(makeData)
    }
    return (
        <>
            <Header/>
            <Box sx={newStyles.screenStyle}>

                <Box sx={newStyles.productView}>
                    <Box sx={newStyles.productViewArea}>
                        <Images src={productData.image} style={newStyles.dashboardBanner}/>
                        {subProducts[0].variant && <><Typography sx={newStyles.productFirstDetails}>Select Color</Typography>
                            <Grid container>
                                {subProducts?.map((value, index) => {
                                    console.log("subProducts",subProducts)
                                    return (<Grid key={index} item onClick={() => {
                                        setCurrentProduct(index)
                                        setProductData((prevTotal) => {
                                            return {...prevTotal, image: value.image, price: value.price}
                                        });
                                    }}>
                                        <SubProduct value={value} currentValue={currentProduct}/>
                                    </Grid>)
                                })}
                            </Grid></>}

                        <Box>
                            <Typography>{productData.name}</Typography>
                            <RatingBox rating={4.4}/>
                            <Typography sx={{fontWeight: 700, fontSize: '1.2rem'}}>
                                <span style={{color: 'green'}}>{productData.offer}% Off</span>&nbsp;&nbsp;
                                <span style={{textDecoration: 'line-through', color: 'rgb(113, 116, 120)'}}>{productData.price}</span>&nbsp;&nbsp;
                                <span>₹{calculateDiscountedPrice(productData.price,productData.offer)}</span></Typography>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Images src={Rating} style={{width: '-webkit-fill-available'}}/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Box>


                <Grid container spacing={2}>
                    {likeProduct.map((value, index) => {
                        return (<Grid key={index} item xs={6}>
                            <OfferProduct value={value} setLikeProduct={() => likeNewProduct(value)}/>
                        </Grid>)
                    })}

                </Grid>
                <Box>
                    <div style={newStyles.footerComponent}/>
                    <div style={newStyles.footerBtn}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box sx={newStyles.footerLeftBtn} onClick={buyProduct}>Add to Cart</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={newStyles.footerRightBtn} onClick={buyProduct}>Buy Now</Box>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Product;
