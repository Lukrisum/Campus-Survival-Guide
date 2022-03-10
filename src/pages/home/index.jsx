import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router";
import mod from './index.module.scss'
import { useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Questions_pool from "./questions_pool";
import Knowledge_base from "./knowledge_base";

export default function Home() {
  const history = useHistory()
  const match = useRouteMatch()

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
                history.push({ pathname: '/', state: { switch_0: 1, switch_1: 0, hr: 1 } });
              }}
              id="questions_pool"
              className={`${navSwitch_0 ? mod.li_show : mod.li_hidden}`}
            ><span>问题池</span></li>
            <li
              onClick={() => {
                history.push({ pathname: '/knowledge_base', state: { switch_0: 0, switch_1: 1, hr: 0 } });
              }}
              id="knowledge_base"
              className={`${navSwitch_1 ? mod.li_show : mod.li_hidden}`}
            ><span>百事通</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={hr ? mod.hr : mod.hr_hidden}></div>
      <Switch>
        <Route path={`${match.path}knowledge_base`}>
          <Knowledge_base />
        </Route>
        <Route exact path={`${match.path}`} >
          <Questions_pool />
        </Route>
      </Switch>
    </div>
  )
}
