import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputCompo = ({ type , placeholder , inputLabel , inputStyle, name, value, onChange}) =>{
    
    return(
        <div className='text-sm md:text-base lg:text-lg'>
            <label className='text-gray-900'>{inputLabel}</label>
            <input
                type={type}
                className={twMerge(' w-full md:w-full lg:full border-1 rounded p-1 md:p-2 lg:p-2  font-heading gap-8 text-gray-900 border-gray-500 border-2 my-1 ',inputStyle)}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name} 
            /> 
        </div>
    )
} 

export default InputCompo;


