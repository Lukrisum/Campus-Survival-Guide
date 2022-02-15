import { Route, Routes } from "react-router-dom"
import Home from "./pages/home";
import Knowledge_base from "./pages/home/knowledge_base";
import Questions_pool from "./pages/home/questions_pool";
import Comment_area from "./pages/home/questions_pool/comment_area";
import { Provider } from "react-redux";
import store from "./store";
import App_0 from '../src/pages/test'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Questions_pool />}></Route>
            <Route path='/knowledge_base/' element={<Knowledge_base />}></Route>
          </Route>
          <Route path='/comment_area' element={<Comment_area />}></Route>
          <Route path='/test' element={<App_0/>}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
