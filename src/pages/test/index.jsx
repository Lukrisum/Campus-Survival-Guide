import React from "react";
import { useAppReady } from 'mincu-hooks'

const App_0 = () => {
  const { isReady } = useAppReady()
  
  if (!isReady) {
    return <div>加载中</div>
  }
  
  return <div>已进入 mincu 容器</div>
}

export default App_0;
