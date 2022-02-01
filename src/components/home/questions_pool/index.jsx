import mod from './index.module.scss';
import Spinner from '../../reusable_components/spinner_component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Knowledge_base() {
    const [isloading, setIsloading] = useState(true);
    const [items, setItems] = useState([{
        great: 10,
        username: 'wxs',
        que: ''
    }]);

    useEffect(() => {
        axios.get('http://120.77.8.223:88/hot')
            .then(({ data }) => {
                setItems(() => {
                    const newarr = items.concat(data.msg);
                    console.log(newarr);
                    return newarr;
                })
                setIsloading(false);
            })
            .catch(console.error)
    }, [])

    return (
        <div className={mod.background}>
            {
                isloading
                    ? <Loading />
                    : <Content content={items} />
            }
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

function Content(props) {
    const skipTo = useNavigate()

    return (
        <ul>
            {
                props.content.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                skipTo('/comment_area')
                            }}>
                            <div
                                className={mod.profile_img_wrapper}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                <img src="" alt="" />
                            </div>
                            <div
                                className={mod.username_wrapper}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                <span className={mod.span_0}>{item.username}</span>
                                <span className={mod.span_1}>最先提问：</span>
                                <span className={mod.span_2}>三天前</span>
                            </div>
                            <div className={mod.text_wrapper}>
                                {item.que}
                            </div>
                            <div
                                className={mod.bottom_data_wrapper}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                <span>我要回答</span>
                                <span>同问{item.great}</span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
