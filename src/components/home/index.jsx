import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'
import { useLocation } from "react-router-dom";

export default function Home(props) {
    const skipToKnowledgeBase = useNavigate();
    const skipToQuestionsPool = useNavigate();

    // handle topbar switching
    const switch_state = useLocation();
    const [navSwitch_0, setNavSwitch_0] = useState(true);
    const [navSwitch_1, setNavSwitch_1] = useState(false);

    useEffect(() => {
        if (switch_state.state) {
            setNavSwitch_0(switch_state.state.switch_0);
            setNavSwitch_1(switch_state.state.switch_1);
        }
    });

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.background}>
                <div className={mod.navigator_wrapper}>
                    <ul>
                        <li
                            onClick={() => {
                                skipToQuestionsPool('/', { state: { switch_0: 1, switch_1: 0 } });
                            }}
                            id="questions_pool"
                            className={`${navSwitch_0 ? mod.li_show : mod.li_hidden}`}
                        ><span>问题池</span></li>
                        <li
                            onClick={() => {
                                skipToKnowledgeBase('/knowledge_base', { state: { switch_0: 0, switch_1: 1 } });
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
