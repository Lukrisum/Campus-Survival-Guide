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
            url: 'http://120.77.8.223:88/aphand_ans',
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
            <div className={mod.hr}></div>
            <div className={mod.section_header_wrapper}>
                <span className={mod.section_header}>相关回答</span>
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
    const [store_item, setStore_item] = useState({});
    const enter_flag = item.que || item.que == '';
    const reflash_flag = localStorage.getItem('que_item');

    useEffect(() => {
        if (reflash_flag && !enter_flag) {
            setStore_item(JSON.parse(localStorage.getItem('que_item')));
        }
        else if (enter_flag) {
            localStorage.setItem('que_item', JSON.stringify(item));
            setStore_item(JSON.parse(localStorage.getItem('que_item')));
        }
    }, []);

    // (function () {
    //     if (reflash_flag && !enter_flag) {
    //         setStore_item(JSON.parse(localStorage.getItem('que_item')));
    //     }
    //     else if (enter_flag) {
    //         localStorage.setItem('que_item', JSON.stringify(item));
    //         setStore_item(JSON.parse(localStorage.getItem('que_item')));
    //     }
    // })();

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
                        <span>回答{enter_flag ? item.ansnum : store_item.ansnum}</span>
                        <span>同问{enter_flag ? item.great : store_item.great}</span>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}

function Comments() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://120.77.8.223:88/hot'
        }).then(({ data }) => {
            setItems(() => {
                const newarr = items.concat(data.msg);
                return newarr;
            })
            setIsLoading(false);
        })
    }, [])

    return (
        <div className={mod.comments_wrapper}>
            <ul>
                {
                    isLoading
                        ? <Loading />
                        : <Fragment>
                            {
                                items.map(item => {
                                    return (
                                        <li className={mod.comments_content_wrapper}>
                                            <div className={mod.profile_info_wrapper}>
                                                <img src="" alt="" />
                                                <span>username</span>
                                            </div>
                                            <div className={mod.comments_text_wrapper}>
                                                <span>{item.que}</span>
                                            </div>
                                            <div className={mod.great_icon_wrapper}>
                                                <div className={mod.great_icon_real_wrapper}>
                                                    <img src="" alt="" />
                                                    <img src="" alt="" />
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            <li className={mod.comments_end_wrapper}>
                                暂无更多
                            </li>
                        </Fragment>
                }
            </ul>
        </div>
    )
}

function Loading() {
    return (
        <div className={mod.loader}>
            <Spinner />
        </div>
    )
}
