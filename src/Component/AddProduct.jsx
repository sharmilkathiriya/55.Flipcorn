import React, {useEffect, useState} from 'react';
import {Box, Typography, Stack, Button} from "@mui/material";
import {styled} from '@mui/material/styles';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Switch from '@mui/material/Switch';
import ValueField from "../CommonComponents/Fields/ValueField";
import ProductBuyButton from "../CommonComponents/Buttons/ProductBuyButton";
import {useNavigate} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Images from "../CommonComponents/Image/Images";
import newStyles from "./Styles"

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

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const AntSwitch = styled(Switch)(({theme}) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

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

const AddProduct = () => {
    const [mainProductData, setMainProductData] = useState({
        name: '',
        offer: "",
        price: '',
        image: '',
        isShowSlider: false
    });
    const [productId, setProductId] = useState('');
    const [allProduct, setAllProduct] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getProduct`);
            console.log("response", response.data.data);
            setAllProduct(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const addUserValue = ({target: {value, name}}) => {
        setMainProductData((preProps) => {
            return {...preProps, [name]: value};
        });
    };

    const showSlider = () => {
        setMainProductData((preProps) => {
            return {...preProps, isShowSlider: !preProps.isShowSlider};
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('images', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload/upload/multiple_files`, formData);
            const imageUrl = response.data.data[0].url;
            setMainProductData((preProps) => {
                return {...preProps, image: imageUrl};
            });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const addProduct = throttle(async () => {
        setProductId('')
        const payload = {
            image: mainProductData.image,
            name: mainProductData.name,
            offer: mainProductData.offer,
            price: mainProductData.price,
            isShowSlider: mainProductData.isShowSlider
        };
        await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/addMainProduct`, payload).then(res => {
            setMainProductData({
                name: '',
                offer: "",
                price: '',
                image: '',
                isShowSlider: false
            })
            fetchData()
        }).catch(err => {
            console.error('Error adding product:', err);
        })
    }, 2000);

    const addNewSubProduct = () => {
        navigate(`/addSubProduct`);
    }
    const addNewBanner = () => {
        navigate(`/addBanner`);
    }
    const logout = () => {
        localStorage.removeItem('adminUser')
        navigate(`/login`);
    }

    return (
        <div>
            <Typography sx={newStyles.addProductTitle}>
                Add Product
            </Typography>
            <Box sx={{m: 1}}>
                <Box sx={{width: '100%'}}>
                    <ValueField
                        fullWidth
                        sx={{m: 1, maxWidth: '50%'}}
                        name='name'
                        label='Name'
                        value={mainProductData.name}
                        onChange={addUserValue}
                    />
                </Box>
                <Box sx={{width: '100%'}}>
                    <ValueField
                        fullWidth
                        sx={{m: 1, maxWidth: '10%'}}
                        name='offer'
                        type='number'
                        label='Offer'
                        value={mainProductData.offer}
                        onChange={addUserValue}
                    />
                </Box>
                <Box sx={{width: '100%'}}>
                    <ValueField
                        fullWidth
                        sx={{m: 1, maxWidth: '20%'}}
                        name='price'
                        label='Price'
                        type='number'
                        value={mainProductData.price}
                        onChange={addUserValue}
                    />
                </Box>
                <Stack sx={{mt: 2}} direction="row" spacing={1} alignItems="center">
                    <Typography>ShowSlider :- </Typography>
                    <Typography>Off</Typography>
                    <AntSwitch
                        checked={mainProductData.isShowSlider}
                        onClick={showSlider}
                        inputProps={{'aria-label': 'ant design'}}
                    />
                    <Typography>On</Typography>
                </Stack>
                <Button
                    sx={{mt: 2}}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={uploadImage}/>
                </Button>
                <Box sx={newStyles.addProBtn}>
                    <ProductBuyButton name='Add' onClick={addProduct} style={{maxWidth: '30%'}}/>
                </Box>
                <Box sx={newStyles.addProBtn}>
                    <Button variant="contained" size="small" onClick={addNewSubProduct}>
                        Add Sub Product
                    </Button> &nbsp;
                    <Button variant="contained" size="small" onClick={addNewBanner}>
                        Add Banner
                    </Button>&nbsp;
                    <Button variant="contained" size="small" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID </TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Offer</TableCell>
                                <TableCell align="right">MRP</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allProduct.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell style={{cursor: 'pointer'}} component="th" scope="row"
                                               onClick={() => navigator.clipboard.writeText(row._id)}>
                                        {row._id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.offer}</TableCell>
                                    <TableCell align="right">{row.mrp}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">
                                        <Images src={row.image} style={{maxHeight: '85px'}}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default AddProduct;
