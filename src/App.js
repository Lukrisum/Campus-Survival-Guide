import { Provider } from "react-redux";
import {Route,Routes} from "react-router-dom"
import Home from "./components/home";
import Knowledge_base from "./components/home/knowledge_base";
import Questions_pool from "./components/home/questions_pool";
import Comment_area from "./components/comment_area";
import store from "./state_manage/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='/' element={<Questions_pool/>}></Route>
            <Route path='/knowledge_base' element={<Knowledge_base/>}></Route>
          </Route>
          <Route path='/comment_area' element={<Comment_area/>}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
