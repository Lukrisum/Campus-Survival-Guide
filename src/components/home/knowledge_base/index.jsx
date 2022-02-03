import mod from './index.module.scss';
import Spinner from '../../reusable_components/spinner_component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Knowledge_base() {
    const [isloading, setIsloading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://120.77.8.223:88/hot')
            .then(({ data }) => {
                setItems(() => {
                    const newarr = items.concat(data.msg);
                    return newarr;
                })
                setIsloading(false);
            })
            .catch(console.error)
    },[])

    return (
        <div className={mod.background}>
            {
                // isloading
                //     ? <Loading />
                //     : <Content content={items} />
                <Content content={items} />
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
            {props.content.map((item, index) => {
                return (
                    <li key={index} onClick={() => {
                        skipTo('/comment_area')
                    }}>
                        <span>
                            {item.UserName}
                        </span>
                        <div>
                            <blockquote>
                                {item.QUE}
                            </blockquote>
                        </div>
                        <div className={mod.action_data_wrapper}>
                            <span>点赞数:{item.Great}</span>
                            <br />
                            <span>回复数:{item.AnsNum}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
