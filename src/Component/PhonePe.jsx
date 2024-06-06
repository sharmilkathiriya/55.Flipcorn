import React, {useState} from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import newStyles from "./Styles";


const PhonePe = ({userData}) => {
    const [formData, setFormData] = useState({
        name: userData.productData.name,
        mobile: userData.userData.number,
        amount: Number(userData.productData.price - userData.productData.mrp),
        muid: 'nuid-909090',
    });

   const navigate = useNavigate();

    const makePayment = async () => {
        const transactionId = 'Tr-' + uuidv4().toString(36).slice(-6);
        const payload = {
            merchantId: import.meta.env.VITE_PREPROD_MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            amount: formData.amount * 100,
            redirectUrl: `http://localhost:5173/`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:5173/`,
            mobileNumber: formData.mobile,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
            // merchantId: import.meta.env.VITE_MERCHANT_ID,
            // merchantTransactionId: transactionId,
            // merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            // amount: parseInt(formData.amount)*100,
            // redirectUrl: import.meta.env.VITE_BASE_URL,
            // redirectMode: 'REDIRECT',
            // callbackUrl: import.meta.env.VITE_BASE_URL,
            // mobileNumber: formData.mobile,
            // paymentInstrument: {
            //     type: 'PAY_PAGE',
            // },
        };

        const dataPayload = JSON.stringify(payload);


        const dataBase64 = btoa(unescape(encodeURIComponent(dataPayload)));

        const fullURL =
            dataBase64 + "/pg/v1/pay" + '96434309-7796-489d-8924-ab56988a6076';
        const dataSha256 = sha256(fullURL);

        const checksum = dataSha256 + "###" + 1;


        // const dataPayload = JSON.stringify(payload);
        // const dataBase64 = btoa(unescape(encodeURIComponent(dataPayload)));
        // const fullURL = dataBase64 + '/pg/v1/pay' + import.meta.env.VITE_SALT_KEY;
        // const dataSha256 = sha256(fullURL).toString();
        // const checksum = dataSha256 + '###' + import.meta.env.VITE_SALT_INDEX;
        // console.log("dataBase64",dataBase64,"dataSha256",dataSha256," checksum", checksum,"dataPayload",dataPayload)


        const response = await axios.post(
            import.meta.env.VITE_PREPROD_PHONEPE_URL,
            {
                request: dataBase64,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
            }
        );

        console.log("response", response)
        // navigate('/')
        window.location = response.data.data.instrumentResponse.redirectInfo.url

        // try {
        //     const response = await axios.post(
        //         'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'
        //         // import.meta.env.VITE_PAY_API_URL
        //         ,
        //         {request: dataBase64,},
        //         {
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'X-VERIFY': checksum,
        //             },
        //         }
        //     );
        //     const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        //     console.log("redirect", redirect)
        //     navigate(redirect);
        // } catch (error) {
        //     console.error('Error making payment:', error);
        //     // Handle error
        // }
    };

    return (<>
        <Typography sx={{textAlign: 'center'}}>Pay :- {formData.amount} for {formData.name} </Typography>

        <div>
            <button
                onClick={makePayment}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Pay
            </button>
        </div>
    </>);
};

export default PhonePe;
