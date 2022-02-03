import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'

export default function Home() {
    const skipToKnowledgeBase = useNavigate();
    const skipToQuestionsPool = useNavigate();

    // handle topbar switching
    const [navSwitch_0, setNavSwitch_0] = useState(true);
    const [navSwitch_1, setNavSwitch_1] = useState(false);

    const reflash_flag = localStorage.getItem('switch');

    function saveSwitch() {
        localStorage.setItem('switch', JSON.stringify({
            state_0: navSwitch_0,
            state_1: navSwitch_1
        }));
    }

    function getAndSetSwitch() {
        setNavSwitch_1(JSON.parse(localStorage.getItem('switch')).state_0);
        setNavSwitch_0(JSON.parse(localStorage.getItem('switch')).state_1);
    }

    function handleSwitch_0() {
        setNavSwitch_0(true);
        setNavSwitch_1(false);
        saveSwitch();
        getAndSetSwitch();
    }

    function handleSwitch_1() {
        setNavSwitch_1(true);
        setNavSwitch_0(false);
        saveSwitch();
        getAndSetSwitch();
    }

    useEffect(() => {
        if (reflash_flag) {
            getAndSetSwitch();
        }
    }, [])

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.background}>
                <div className={mod.navigator_wrapper}>
                    <ul>
                        <li
                            onClick={() => {
                                handleSwitch_1();
                                skipToQuestionsPool('/');
                            }}
                            id="questions_pool"
                            className={`${navSwitch_0 ? mod.li_show : mod.li_hidden}`}
                        ><span>问题池</span></li>
                        <li
                            onClick={() => {
                                handleSwitch_0();
                                skipToKnowledgeBase('/knowledge_base');
                            }}
                            id="knowledge_base"
                            className={`${navSwitch_1 ? mod.li_show : mod.li_hidden}`}
                        ><span>百事通</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={mod.hr}></div>
            <Outlet />
        </div>
    )
}
