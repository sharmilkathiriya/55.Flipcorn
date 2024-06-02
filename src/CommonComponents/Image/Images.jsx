import React from 'react';
import {defaultImg} from "../../assets"

const Images = ({...rest}) => {
    return (
        <img {...rest}    onError={(e)=> e.target.src = defaultImg} />
    );
};

export default Images;
