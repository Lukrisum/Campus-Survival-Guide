import React, { useState } from 'react';
import mod from './index.module.scss';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function KeyboardInput(props) {

  const [inputValue, setInputValue] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [overflowFlag, setOverflowFlag] = useState(false);
  const [scollFlag,setScoll] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleType = () => {
    const type = props.type;
    if (type) {
      return 75;
    }
    return 500;
  }

  const handleMaximun = (e) => {
    const str = String(e.target.value);
    if (str.length > handleType()) {
      setInputValue(str.slice(0, handleType()));
      setOverflowFlag(true);
    }
    if (str.length <= handleType()) {
      setOverflowFlag(false);
      setTextLength(str.length);
    }
  }

  const handleScoll = () => {
    setTimeout(()=>setScoll(true),300);
  }

  const handleUnScoll = () => {
    setScoll(false);
  }

  return (
      <div className={scollFlag?mod.scoll:mod.keyboard_input_wrapper}>
        <span>{props.header}</span>
        <hr />
        <textarea
          placeholder='请输入你的具体回答...'
          cols="20" rows="4"
          onChange={(e) => {
            handleInput(e);
            handleMaximun(e);
          }}
          value={inputValue}
          onFocus={handleScoll}
          onBlur={handleUnScoll}
          autoFocus></textarea>
        <div className={mod.bottom_section}>
          <span className={overflowFlag ? mod.text_alert : mod.text_length}>{overflowFlag ? "超过字数限度..." : textLength + "/" + handleType()}</span>
          <div
            onClick={() => {
              props.btnOnclick(inputValue)
            }}
            className={mod.submit}
          >
            <CheckCircleOutlineIcon style={{
              width: "3.7rem",
              height: "3.7rem",
              color: "rgba(79, 178, 255, 1)"
            }} />
          </div>
        </div>
      </div>
  )
}
