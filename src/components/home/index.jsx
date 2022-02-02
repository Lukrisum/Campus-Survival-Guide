import React from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'

export default function Home() {
    const skipToKnowledgeBase = useNavigate();
    const skipToQuestionsPool = useNavigate();

    // handle topbar switching
    const handleSwitch = (e) => {
        if (e.target.id === "question_pool") {
            e.className =
                e.target.ch
        }
        if (e.target.id === "knowledge_base") {
            ;
        }
    }

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.background}>
                <div className={mod.navigator_wrapper}>
                    <ul>
                        <li
                            className="parts"
                            onClick={(e) => {
                                skipToQuestionsPool('/');
                                handleSwitch(e);
                            }}
                            id="questions_pool"
                        ><span>问题池</span></li>
                        <li
                            className="parts"
                            onClick={(e) => {
                                skipToKnowledgeBase('/knowledge_base');
                                handleSwitch(e);
                            }}
                            id="knowledge_base"
                        ><span>百事通</span></li>
                    </ul>
                </div>
            </div>
            <div className={mod.hr}></div>
            <Outlet />
        </div>
    )
}
