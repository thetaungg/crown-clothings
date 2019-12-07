import React from 'react';
import './formInput.styles.scss'

const FormInput = ({handleChange,label,...otherProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {label ?
            (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}> {/* 'shrink' prevents the overlapping of the text and the label when the input is not focused (check scss)*/}
                    {label}
                </label>
            )
            :null}
    </div>
);
export default FormInput;