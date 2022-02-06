import { Route, Routes } from "react-router-dom"
import Home from "./components/home";
import Knowledge_base from "./components/home/knowledge_base";
import Questions_pool from "./components/home/questions_pool";
import Comment_area from "./components/home/questions_pool/comment_area";
import MsgContext from "./context_manege";
import { useState } from "react";

function App() {
  const [msg, setMsg] = useState({});

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' element={
            <MsgContext.Provider value={setMsg}>
              <Questions_pool />
            </MsgContext.Provider>
          }></Route>
          <Route path='/knowledge_base/' element={<Knowledge_base />}></Route>
        </Route>
        <Route path='/comment_area' element={
          <MsgContext.Provider value={msg}>
            <Comment_area />
          </MsgContext.Provider>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
