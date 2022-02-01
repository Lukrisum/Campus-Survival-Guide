import React from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'

export default function Home() {
    const skipToKnowledgeBase = useNavigate();
    const skipToQuestionsPool = useNavigate();

    return (
        <div className={mod.background_wrapper}>
            <div className={mod.background}>
                <hr />
                <div className={mod.navigator_wrapper}>
                    <ul>
                        <li
                            className="parts"
                            onClick={() => {
                                skipToQuestionsPool('/');
                            }}
                        >问题池</li>
                        <li
                            className="parts"
                            onClick={() => {
                                skipToKnowledgeBase('/knowledge_base');
                            }}
                        >百事通</li>
                    </ul>
                </div>
            </div>
            <hr />
            <Outlet />
        </div>
    )
}
