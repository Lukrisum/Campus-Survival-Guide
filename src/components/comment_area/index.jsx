import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import Spinner from "../reusable_components/spinner_component";
import MsgContext from "../../context_manege";

export default function Comment_area() {
    return (
        <div className={mod.background_wrapper}>
            <div className={mod.h_wrapper}>
                <span className={mod.h1}>问题详情</span>
            </div>
            <div className={mod.hr}></div>
            <div className={mod.content_wrapper}>
                <Content />
            </div>
            <div className={mod.comments_wrapper}>
                <Comments />
            </div>
        </div>
    )
}

function Content() {
    const item = useContext(MsgContext);

    // ... planing to change this block into which based on network request
    let store_item;
    const enter_flag = item.que || item.que == '';
    const reflash_flag = localStorage.getItem('que_item');
    (function () {
        if (reflash_flag && !enter_flag) {
            store_item = JSON.parse(localStorage.getItem('que_item'));
        }
        else if (enter_flag) {
            localStorage.setItem('que_item', JSON.stringify(item));
            store_item = JSON.parse(localStorage.getItem('que_item'));
        }
    })();

    return (
        <ul className={mod.content_text_wrapper}>
            {/* {
                <div>
                    {enter_flag ? item.que : store_item.que}
                </div>
            } */}
            <li id={item.questionid}>
                <div className={mod.profile_img_wrapper}>
                    <img src="" alt="" />
                </div>
                <div className={mod.username_wrapper}>
                    <span className={mod.span_0}>{item.username}</span>
                    <span className={mod.span_1}>最先提问:</span>
                    <span className={mod.span_2}>三天前</span>
                </div>
                <div className={mod.text_wrapper}>
                    {item.que}
                </div>
                <div className={mod.bottom_data_wrapper}>
                    <span>我要回答</span>
                    <span>同问{item.great}</span>
                </div>
            </li>
        </ul>
    )
}

function Comments() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://120.77.8.223:88/hot'
        }).then(({ data }) => {
            console.log(data.msg[0].Great);
            setIsLoading(false);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    isLoading
                        ? <Spinner />
                        : <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                }
            </ul>
        </div>
    )
}
