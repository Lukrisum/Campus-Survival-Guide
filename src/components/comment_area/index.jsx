import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import Spinner from "../reusable_components/spinner_component";
import MsgContext from "../../context_manege";
import Keyboard_input from "../reusable_components/input_component";
import Shady from "../reusable_components/shady_component";
import Text_box from "../reusable_components/text_box_component";

export default function Comment_area() {
    //handle popup
    const [popup, setPopup] = useState(false);
    const [msg, setMsg] = useState({});

    //handle answering
    const handleSubmit = (inputValue) => {
        axios({
            url: 'http://120.77.8.223:88/hand_ans',
            method: 'post',
            headers: {
                'code': 'iknow',
            },
            data: {
                'ans': inputValue,
                'username': '???',
                'questionid': msg.questionid
            }
        }).then((res) => {
            alert('提交成功(待审核...)');
            console.log(res.data.answerid)
            setPopup(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.h_wrapper}>
                <span className={mod.h1}>问题详情</span>
            </div>
            <div className={mod.hr}></div>
            <div className={mod.content_wrapper}>
                <Content
                    func_getMsg={setMsg}
                    func_setPop={setPopup}
                />
            </div>
            <div className={mod.comments_wrapper}>
                <Comments />
            </div>

            {
                popup
                    ? <Fragment>
                        <Shady
                            func={() => {
                                setPopup(false);
                            }}
                        />
                        <Keyboard_input
                            btnOnclick={handleSubmit}
                        />
                    </Fragment>
                    : <Fragment />
            }

        </div>
    )
}

function Content(props) {
    const item = useContext(MsgContext);

    // ...  change this block to that based on network request
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
        <Fragment>
            <ul className={mod.content_text_wrapper}>
                <li id={enter_flag ? item.questionid : store_item.questionid}>
                    <div className={mod.profile_img_wrapper}>
                        <img src="" alt="" />
                    </div>
                    <div className={mod.username_wrapper}>
                        <span className={mod.span_0}>{enter_flag ? item.username : store_item.username}</span>
                        <span className={mod.span_1}>最先提问:</span>
                        <span className={mod.span_2}>三天前</span>
                    </div>
                    <div className={mod.text_wrapper}>
                        <Text_box text={enter_flag ? item.que : store_item.que} />
                    </div>
                    <div className={mod.bottom_data_wrapper}>
                        <span
                            onClick={() => {
                                props.func_getMsg(enter_flag ? item : store_item);
                                props.func_setPop(true);
                            }}>我要回答</span>
                        <span>同问{enter_flag ? item.great : store_item.great}</span>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}

function Comments() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://120.77.8.223:88/hot'
        }).then(({ data }) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    isLoading
                        ? <Spinner />
                        : <Fragment>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </Fragment>
                }
            </ul>
        </div>
    )
}
