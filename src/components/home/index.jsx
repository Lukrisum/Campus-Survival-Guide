import React from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'

export default function Home() {
    const skipToKnowledgeBase = useNavigate();
    const skipToQuestionsPool = useNavigate();

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.background}>
                <div className={mod.navigator_wrapper}>
                    <ul>
                        <li
                            className="parts"
                            onClick={() => {
                                skipToQuestionsPool('/');
                            }}
                        ><span>问题池</span></li>
                        <li
                            className="parts"
                            onClick={() => {
                                skipToKnowledgeBase('/knowledge_base');
                            }}
                        ><span>百事通</span></li>
                    </ul>
                </div>
            </div>
            <div className={mod.hr}></div>
            <Outlet />
        </div>
    )
}
