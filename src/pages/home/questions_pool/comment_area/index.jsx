import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import MsgContext from "../../../../context_manege";
import Spinner from "../../../../components/spinner";
import KeyboardInput from "../../../../components/keyboard_input";
import Shady from "../../../../components/shady";
import Text_box from "../../../../components/text_box";

export default function Comment_area() {


  //handle popup
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState({});

  //handle answering
  const handleSubmit = (inputValue) => {
    axios({
      url: 'http://120.77.8.223:88/aphand_ans',
      method: 'post',
      headers: {
        'code': 'iknow',
      },
      data: {
        'ans': inputValue,
        'username': '???',
        'questionid': msg.questionid
      }
    }).then((res) => {
      alert('提交成功(待审核...)');
      console.log(res.data.answerid)
      setPopup(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className={mod.background_wrapper}>
      <div className={mod.h_wrapper}>
        <span className={mod.h1}>问题详情</span>
      </div>
      <div className={mod.hr}></div>
      <div className={mod.content_wrapper}>
        <Content
          handlegetMsg={setMsg}
          handleSetPop={setPopup}
        />
      </div>
      <div className={mod.hr}></div>
      <div className={mod.section_header_wrapper}>
        <span className={mod.section_header}>相关回答</span>
      </div>
      <div className={mod.comments_wrapper}>
        <Comments />
      </div>

      {
        popup
          ? <Fragment>
            <Shady
              func={() => {
                setPopup(false);
              }}
            />
            <KeyboardInput
              header={"回答问题"}
              btnOnclick={handleSubmit}
            />
          </Fragment>
          : <Fragment />
      }

    </div>
  )
}

function Content(props) {
  const item = useContext(MsgContext);

  // ...  change this block to that based on network request
  const [storeItems, setstoreItems] = useState({});
  const enterFlag = item.que || item.que === '';
  const reflash_flag = localStorage.getItem('que_item');

  useEffect(() => {
    if (reflash_flag && !enterFlag) {
      setstoreItems(JSON.parse(localStorage.getItem('que_item')));
    }
    else if (enterFlag) {
      localStorage.setItem('que_item', JSON.stringify(item));
      setstoreItems(JSON.parse(localStorage.getItem('que_item')));
    }
  }, []);

  return (
    <Fragment>
      <ul className={mod.content_text_wrapper}>
        <li id={enterFlag ? item.questionid : storeItems.questionid}>
          <div className={mod.profile_img_wrapper}>
            <img src="" alt="" />
          </div>
          <div className={mod.username_wrapper}>
            <span className={mod.span_0}>{enterFlag ? item.username : storeItems.username}</span>
            <span className={mod.span_1}>最先提问:</span>
            <span className={mod.span_2}>三天前</span>
          </div>
          <div className={mod.text_wrapper}>
            <Text_box text={enterFlag ? item.que : storeItems.que} />
          </div>
          <div className={mod.bottom_data_wrapper}>
            <span
              onClick={() => {
                props.handlegetMsg(enterFlag ? item : storeItems);
                props.handleSetPop(true);
              }}>我要回答</span>
            <span>回答{enterFlag ? item.ansnum : storeItems.ansnum}</span>
            <span>同问{enterFlag ? item.great : storeItems.great}</span>
          </div>
        </li>
      </ul>
    </Fragment>
  )
}

function Comments() {
  const item = useContext(MsgContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const enterFlag = item.questionid || item.questionid === 0;
  const questionid = enterFlag ? item.questionid : JSON.parse(localStorage.getItem('que_item')).questionid

  useEffect(() => {
    axios({
      url: 'http://120.77.8.223:88/apans',
      method: 'post',
      data: {
        questionid,
      }
    }).then((res) => {
      const addList = (preList) => {
        const newList = preList.concat(res.data.msg);
        return newList;
      }
      setItems(addList(items));
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className={mod.comments_wrapper}>
      <ul>
        {
          isLoading
            ? <Loading />
            : <Fragment>
              {
                items.map((item, index) => {
                  return (
                    <li className={mod.comments_content_wrapper} key={index}>
                      <div className={mod.profile_info_wrapper}>
                        <img src="" alt="" />
                        <span>{item.username}</span>
                      </div>
                      <div className={mod.comments_text_wrapper}>
                        <span>{item.ans}</span>
                      </div>
                      <div className={mod.great_icon_wrapper}>
                        <div className={mod.great_icon_real_wrapper}>
                          <img src="" alt="点赞icon" />
                          <span>{item.great}</span>
                          <img src="" alt="点踩icon" />
                          <span>{item.bad}</span>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
              <li className={mod.comments_end_wrapper}>
                暂无更多
              </li>
            </Fragment>
        }
      </ul>
    </div>
  )
}

function Loading() {
  return (
    <div className={mod.loader}>
      <Spinner />
    </div>
  )
}
