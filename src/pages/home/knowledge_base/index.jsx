import mod from './index.module.scss';
import Spinner from '../../../components/spinner';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Knowledge_base() {
    const [isloading, setIsloading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://120.77.8.223:88/hot')
            .then(({ data }) => {
                const addList = (preList) => {
                    const newList = preList.concat(data.msg);
                    return newList;
                }
                setItems(addList(items))
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
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className={mod.main_content_wrapper}>
                <div className={mod.search_input_wrapper}>
                    <img src="" alt="搜索" />
                    <input type="text" placeholder={'请输入问题关键字搜索'} />
                    <img src="" alt="取消" />
                </div>
                <div className={mod.section_nav_wrapper}>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="迎新" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>迎新</span>
                    </div>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="学习" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>学习</span>
                    </div>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="生活" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>生活</span>
                    </div>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="行政" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>行政</span>
                    </div>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="网址号码" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>网址号码</span>
                    </div>
                    <div className={mod.div}>
                        <div className={mod.section_nav}>
                            <img src="" alt="教学周历" onClick={() => {
                                navigate('/');
                            }} />
                        </div>
                        <span>教学周历</span>
                    </div>
                </div>
                <div className={mod.hot_icon_wrapper}>
                    <img src="" alt="" />
                    <span>热门问题</span>
                </div>
            </div>

            <ul className={mod.hot_ques_wrapper}>
                {props.content.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                navigate('/comment_area')
                            }}>
                            <div className={mod.hot_ques_top_info_wrapper}>
                                <img src="" alt="profile_photo" />
                                <span> {item.username}</span>
                            </div>
                            <div className={mod.hot_ques_text_wrapper}>
                                <span className={mod.hot_ques_text_header}>{item.que}</span>
                                <div className={mod.hot_ques_text_content_wrapper}>
                                    <span className={mod.hot_ques_text_content}>{item.que}</span>
                                </div>
                            </div>
                            <div className={mod.hot_ques_bottom_info_wrapper}>
                                <span>点赞数:{item.great}</span>
                                <br />
                                <span>回复数:{item.ansnum}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    )
}
