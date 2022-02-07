import React from "react";

export default function Shady(props) {
    const style = {
        'height': '100%',
        'width': '100%',
        'backgroundColor': 'rgba(0,0,0,.29)',
        'position': 'fixed',
        'top': '0rem',
        'zIndex': '1',
    }

    return (
        <div style={style} onClick={
            props.func
        }>

        </div>
    )
} 
