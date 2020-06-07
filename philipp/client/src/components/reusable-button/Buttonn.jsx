import React from 'react'
import './Styles/btn.scss'


const STYLES = [

    "btn-primaryy",
    "btn-warningg",
    "btn-secondaryy",
    "btn-successs",
    "btn-primary-outlinee",
    "btn-warning-outlinee",
    "btn-danger-outlinee",
    "btn-success-outlinee",   
];

const SIZES = ['btn-medium', 'btn-small', 'btn-large'];

export const Buttonn = ({children, type, onClick, buttonStyle, buttonSize}) => {


    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]


    return(
        <button className={`btnn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type= {type}>
            {children}
        </button>
    )


}
