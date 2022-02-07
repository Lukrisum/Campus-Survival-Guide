import React, { useState } from 'react';
import mod from './index.module.scss';

export default function KeyboardInput(props) {
    const [inputValue, setInputValue] = useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className={mod.keyboard_input_wrapper}>
            <span>{props.header}</span>
            <hr />
            <textarea
                placeholder='请输入你的具体回答...'
                cols="20" rows="4"
                onChange={handleInput}
                value={inputValue}
                autoFocus></textarea>
            <button
                onClick={() => {
                    props.btnOnclick(inputValue)
                }}
            >submit</button>
        </div>
    )
}
