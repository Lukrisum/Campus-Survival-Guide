import React from 'react';
import mod from './index.module.scss'

export default function Text_box(props){
    return(
        <div className={mod.text_box_wrapper}>
            <div className={mod.shadow}></div> 
            <div className={mod.triangle}></div>
            <div className={mod.text_box}>
                <span>{props.text}</span>
            </div>
        </div>
    )
}
