import { Route, Switch } from "react-router-dom"
import Home from "./pages/home";
import Comment_area from "./pages/home/questions_pool/comment_area";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import Content from "./pages/home/knowledge_base/content";
import Sorts from "./pages/home/knowledge_base/sorts";
import Picture from "./pages/home/knowledge_base/picture_area";
import App_0 from "./pages/home/test";
// import { AliveScope } from 'react-activation'

if (process.env.NODE_ENV === 'development') {
  import('mincu-debug').then(({ default: debugModule }) => {
    debugModule.applyConsole()
  })
}

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <Switch>
          <Route path='/' component={Home} />
          <Route exact path='/comment_area' component={Comment_area} />
          <Route exact path='/knowledge_base_content' component={Content} />
          <Route exact path='/knowledge_base_sorts' component={Sorts} />
          <Route exact path='/knowledge_base_picture' component={Picture} />
          <Route exact path='/test' component={App_0} />
        </Switch>
      </div>
    </ReduxProvider>
  );
}

export default App;
