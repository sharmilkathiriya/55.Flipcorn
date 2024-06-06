import React, {useEffect, useState} from 'react';
import {Box, Grid, Badge, Typography, Button} from "@mui/material";
import Header from "../CommonComponents/Header";
import newStyles, {BootstrapInput} from "./Styles"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useNavigate} from "react-router-dom";
import Carousel from 'react-multi-carousel';
import axios from "axios";
import 'react-multi-carousel/lib/styles.css';
import {offer, sale, smart, pdOne, dashThree, dashFour, dashFive, dashSix} from "../assets/index"
import ProductBox from "../CommonComponents/ProductsBox/OfferProduct";
import {LGAC, fun, smwc, cam, trm, pb, lap, tv, bn1, bn2, bn3, bn4, defaultImg} from "../assets/index"
import SectionProduct from "../CommonComponents/ProductsBox/SectionProduct";
import SliderProductBox from "../CommonComponents/ProductsBox/SliderProductBox";
import Images from "../CommonComponents/Image/Images";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 3
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2.5
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2.5
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 2.5
    }
};
const responsiveBanner = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 1,
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1,
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1,
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
    },
};


const sectionData = [{label: 'Inverter Air Conditioner Brand New', type: 'Specials', id: 1, img: LGAC},
    {label: 'DSLR & Mirrorless', type: 'Grab Now', id: 2, img: fun},
    {label: 'Cameras', type: 'Popular', id: 3, img: smwc},
    {label: 'Smart Watches', type: 'Specials', id: 4, img: cam},
    {label: 'Stainless Steel Trimmer', off: '50', id: 5, img: trm},
    {label: 'Laptops', off: '50', id: 6, img: pb},
    {label: 'Power Banks', off: '50', id: 7, img: lap},
    {label: 'Bluetooth Televisions', off: '30', id: 8, img: tv},]
const bannerData = [bn1, bn2, bn3, bn4];

const Dashboard = () => {
    const [sliderImage, srtSliderImage] = useState([])
    const [productData, setProductData] = useState([])
    // const [bannerData, setBannerData] = useState([])

    const [time, setTime] = useState(20 * 60);
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        getProduct();
        getBanner()
    }, []);

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getSliderImage`).then(res => {
            srtSliderImage(res.data.data)
        }).catch(err => {
            console.error(err)
        });

    };
    const getProduct = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getProduct`).then(res => {
            setProductData(res.data.data)
        }).catch(err => {
            console.error(err)
        });
    };
    const getBanner = async () => {
        // await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getBannerImage`).then(res => {
        //     // res&&    setBannerData(res.data.data.images)
        // }).catch(err => {
        //     console.error(err)
        // });
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const addCart = (value) => {
        navigate(`/product`, {
            state: {value},
        })
    }
    return (
        <div style={newStyles.cover}>
            <Header/>
            <Box sx={newStyles.searchArea}>
                <BootstrapInput placeholder='search for Products, Brands and More' fullWidth id="bootstrap-input"/>
            </Box>
            <Box><Images src={sale} style={newStyles.dashboardBanner}/></Box>
            <Box><Images src={offer} style={newStyles.dashboardBanner}/></Box>
            <Box><Images src={smart} style={newStyles.dashboardBanner}/></Box>

            <Box><Grid container sx={{p: 2}}>
                <Grid item xs={0} sm={4}></Grid>
                <Grid item xs={12} sm={4} sx={newStyles.dealsCount}>
                    <Box>
                        <Typography sx={newStyles.dealsLabel}>Deals of the day</Typography>
                        <Typography sx={newStyles.dealsTitle}>
                            <TimerOutlinedIcon sx={newStyles.countTime}/>{formatTime(time)}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} sx={newStyles.saleLabel}>
                    <Box sx={newStyles.saleBtn}>SALE IS LIVE</Box>
                </Grid>
            </Grid>
            </Box>

            <Box>
                <Grid container>
                    {sliderImage.slice(0, sliderImage.length / 2)?.map((value, index) => {
                        return index < 3 && (<>
                            <Grid item xs={6} sm={3} sx={{p: 0.6}} key={index}>
                                <SectionProduct label={value.name} off={value.offer} img={value.image || defaultImg}/>
                            </Grid>
                        </>)
                    })}
                </Grid>
                <Box sx={{pt: 1, pb: 1}}>
                    {bannerData?.length && <Carousel
                        responsive={responsiveBanner}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        showDots={false}
                        arrows={false}
                    >
                        {bannerData?.map((value, index) => {
                            return <div className="carousel-item" key={index} onClick={() => addCart(value)}>
                                <Images src={value || defaultImg} style={newStyles.dashboardBanner}/>
                            </div>
                        })}
                    </Carousel>}
                </Box>
                <Grid container>
                    {sliderImage.slice(sliderImage.length / 2, sliderImage.length)?.map((value, index) => {
                        return index < 3 && (<>
                            <Grid item xs={6} sm={3} sx={{p: 0.6}} key={index}>
                                <SectionProduct label={value.name} off={value.offer} img={value.image}/>
                            </Grid>
                        </>)
                    })}
                </Grid>
            </Box>
            <Box sx={newStyles.horizontalCard}>
                {sliderImage && <Carousel responsive={responsive} arrows={false}>
                    {sliderImage.filter(value => {
                        return !!value.isShowSlider
                    })?.map((value, index) => {
                        return (<>
                            <SliderProductBox
                                key={index}
                                onClick={() => addCart(value)}
                                productImg={value.image}
                                productLabel={value.name}
                                off={value.offer}
                                offPrice={value.mrp}
                                price={value.price}
                                rating={'4.8'}
                                ratingValue={'9777'}
                            />

                        </>)
                    })}
                </Carousel>}
            </Box>
            <Box sx={{pt: 1, pb: 1}}>
                {bannerData.length && <Carousel
                    responsive={responsiveBanner}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    showDots={false}
                    arrows={false}
                >
                    {bannerData?.map((value, index) => {
                        return <div key={index} className="carousel-item">
                            <Images src={value || defaultImg} style={newStyles.dashboardBanner}/>
                        </div>
                    })}
                </Carousel>}
            </Box>
            {/*sliderImage.filter(value =>{ return !!value.isShowSlider})*/}
            <Box sx={newStyles.verticalCard}>
                <Grid container>
                    {sliderImage.filter(value => {
                        return !value.isShowSlider
                    })?.map((value, index) => {
                        return (<>
                            <Grid item xs={6} sm={6} key={index}>
                                <ProductBox
                                    onClick={() => addCart(value)}
                                    productImg={value.image || defaultImg}
                                    productLabel={value.name}
                                    off={`${value.offer}%`}
                                    offPrice={value.mrp}
                                    price={value.price}
                                    rating={'4.8'}
                                    ratingValue={'9777'}
                                />
                            </Grid>
                        </>)
                    })}
                </Grid>
            </Box>
            <Box sx={newStyles.verticalCard}>
                <Grid container>
                    {productData?.map((value, index) => {
                        return (<>
                            <Grid item xs={6} sm={6} key={index} sx={newStyles.vCardBox}>
                                <ProductBox
                                    onClick={() => addCart(value)}
                                    productImg={value.image || defaultImg}
                                    productLabel={value.name}
                                    off={`${value.offer}%`}
                                    offPrice={value.mrp}
                                    price={value.price}
                                    rating={'4.8'}
                                    ratingValue={'9777'}
                                />
                            </Grid>
                        </>)
                    })}
                </Grid>
            </Box>
            <img src={dashThree} style={newStyles.dashboardBanner}/>
            <Grid container>
                <Grid item xs={4}><Images src={dashFour} style={newStyles.dashboardBanner}/></Grid>
                <Grid item xs={4}><Images src={dashFive} style={newStyles.dashboardBanner}/></Grid>
                <Grid item xs={4}><Images src={dashSix} style={newStyles.dashboardBanner}/></Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
