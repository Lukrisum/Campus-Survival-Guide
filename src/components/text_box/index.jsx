import React from 'react';
import mod from './index.module.scss'

export default function TextBox(props) {
  return (
    <div className={mod.text_box_wrapper}>
      <div className={mod.shadow}></div>
      <div className={mod.triangle}></div>
      <div className={props.type ? mod.text_box_showall : mod.text_box_hidden}>
        <span>{props.text}</span>
      </div>
    </div>
  )
}
