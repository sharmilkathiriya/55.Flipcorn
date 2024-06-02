import React from 'react';
import {Grid, TextField} from "@mui/material";

const ValueField = ({value, label,name, onChange, ...rest}) => {
    return (
        <>
            <TextField id="outlined-basic" label={label}{ ...rest} name={name} value={value} variant="outlined" onChange={onChange}/>
        </>
    );
};

export default ValueField;
