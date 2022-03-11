import { Route, Switch } from "react-router-dom"
import Home from "./pages/home";
import Comment_area from "./pages/home/questions_pool/comment_area";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import Content from "./pages/home/knowledge_base/content";
import Sorts from "./pages/home/knowledge_base/sorts";
import Picture from "./pages/home/knowledge_base/picture_area";
import App_0 from "./pages/home/test";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import Knowledge_base from "./pages/home/knowledge_base";
import Questions_pool from "./pages/home/questions_pool";
import { AliveScope } from 'react-activation'
import KeepAlive from "react-activation";
// import { AliveScope } from 'react-activation'

if (process.env.NODE_ENV === 'development') {
  import('mincu-debug').then(({ default: debugModule }) => {
    debugModule.applyConsole()
  })
}

function App() {
  return (
    <ReduxProvider store={store}>
      <CacheSwitch>
        <AliveScope>
          <Route path='/comment_area' component={Comment_area} />
          <Route path='/knowledge_base_content' component={Content} />
          <Route path='/knowledge_base_sorts' component={Sorts} />
          <Route path='/knowledge_base_picture' component={Picture} />
          <Route path='/test' component={App_0} />
          <Route path='/' component={Home} />
        </AliveScope>
      </CacheSwitch>
    </ReduxProvider>
  );
}

export default App
