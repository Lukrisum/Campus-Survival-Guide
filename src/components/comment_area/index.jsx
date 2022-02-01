import React, { useEffect } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import { useState } from "react";
import Spinner from "../reusable_components/spinner_component";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://120.77.8.223:88/hot'
        }).then(data => {
            console.log(data.data.msg[0].Great);
            setIsLoading(false);
        })
    }, [])

    return (
        <div>
            {
                isLoading
                    ? <Spinner />
                    : <div>
                        123
                    </div>
            }
        </div>
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
