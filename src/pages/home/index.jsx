import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import mod from './index.module.scss'
import { useLocation } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // handle topbar switching
  const location = useLocation();
  const [navSwitch_0, setNavSwitch_0] = useState(true);
  const [navSwitch_1, setNavSwitch_1] = useState(false);
  const [hr, setHr] = useState(true);

  useEffect(() => {
    if (location.state) {
      setNavSwitch_0(location.state.switch_0);
      setNavSwitch_1(location.state.switch_1);
      setHr(location.state.hr);
    }
  });

  return (
    <div className={mod.background_wrapper}>
      <div className={mod.background}>
        <div className={mod.navigator_wrapper}>
          <ul>
            <li
              onClick={() => {
                navigate('/', { state: { switch_0: 1, switch_1: 0, hr: 1 } });
              }}
              id="questions_pool"
              className={`${navSwitch_0 ? mod.li_show : mod.li_hidden}`}
            ><span>问题池</span></li>
            <li
              onClick={() => {
                navigate('/knowledge_base', { state: { switch_0: 0, switch_1: 1, hr: 0 } });
              }}
              id="knowledge_base"
              className={`${navSwitch_1 ? mod.li_show : mod.li_hidden}`}
            ><span>百事通</span>
            </li>
          </ul>
          <div onClick={()=>{navigate('/test')}}>跳转</div>
        </div>
      </div>
      <div className={hr ? mod.hr : mod.hr_hidden}></div>
      <Outlet />
    </div>
  )
}
