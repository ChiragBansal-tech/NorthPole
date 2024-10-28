import React from 'react'
import { twMerge } from 'tailwind-merge';
const ButtonCompo= ({onclick, value, className, type}) => {
    return(
        <button
            onClick={onclick}
            type={type}
            className={twMerge('py-1 md:py-2 lg:py-2 ',className)}
        >
            {value}
            
        </button>
    );
};


export default ButtonCompo;