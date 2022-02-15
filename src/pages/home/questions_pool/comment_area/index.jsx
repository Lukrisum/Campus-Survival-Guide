import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import Spinner from "../../../../components/spinner";
import KeyboardInput from "../../../../components/keyboard_input";
import Shady from "../../../../components/shady";
import TextBox from "../../../../components/text_box";
import { connect } from "react-redux";
//
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const Comment_area = (props) => {

  //handle popup
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState(props);
  const [questionid, setQuestionid] = useState();

  //handle answering
  const handleSubmit = (ans) => {
    axios({
      url: 'http://120.77.8.223:88/aphand_ans',
      method: 'post',
      headers: {
        'code': 'iknow',
      },
      data: {
        ans,
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

  const handleLike = (questionid) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aplike',
      data: {
        questionid,
      }
    }).then((res) => {
      alert(res.data.msg);
    }).catch((error) => {
      console.log(error)
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
          handleAddLike={handleLike}
          answerItems={props}
        />
      </div>
      <div className={mod.hr}></div>
      <div className={mod.section_header_wrapper}>
        <span className={mod.section_header}>相关回答</span>
      </div>
      <div className={mod.comments_wrapper}>
        <Comments answerItemText={props} />
      </div>

      {
        popup
          ? <Fragment>
            <Shady
              onclick={() => {
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
  const item = props.answerItems;

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

  useEffect(() => {
    localStorage.setItem('que_item', JSON.stringify(storeItems));
  }, [storeItems])

  return (
    <Fragment>
      <ul className={mod.content_text_wrapper}>
        <li id={enterFlag ? item.questionid : storeItems.questionid}>
          <div className={mod.profile_img_wrapper}>
            {/* <img src="" alt="" /> */}
            <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
          </div>
          <div className={mod.username_wrapper}>
            <span className={mod.span_0}>{enterFlag ? item.username : storeItems.username}</span>
            <span className={mod.span_1}>最先提问</span>
            <span className={mod.span_2}>三天前</span>
          </div>
          <div className={mod.text_wrapper}>
            <TextBox text={enterFlag ? item.que : storeItems.que} type={true}/>
          </div>
          <div className={mod.bottom_data_wrapper}>
            <span className={mod.bottom_data_wrapper_ansnum}>已有{enterFlag ? item.ansnum : storeItems.ansnum}人回答</span>
            <div className={mod.bottom_data_wrapper_great_wrapper}>
              <div>
                <ArrowDropUpIcon />
                <span onClick={() => {
                  props.handleAddLike(enterFlag ? item.questionid : storeItems.questionid);
                  setstoreItems({
                    ...storeItems,
                    great: storeItems.great + 1
                  });
                }} >同问{enterFlag ? item.great : storeItems.great}</span>
              </div>
              <div className={mod.bottom_data_wrapper_great_wrapper_blank}></div>
              <div>
                <TextsmsIcon />
                <span
                  onClick={() => {
                    props.handlegetMsg(enterFlag ? item : storeItems);
                    props.handleSetPop(true);
                  }}>回答</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Fragment>
  )
}

function Comments(props) {
  const item = props.answerItemText;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const enterFlag = item.que || item.que === '';
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
                          {/* <img src="" alt="" /> */}
                          <div className={mod.profile_info_wrapper_img}>
                            <AccountCircleIcon style={{ width: "100%", height: "100%" }} />
                          </div>
                          <span>{item.username}</span>
                        </div>
                        <div className={mod.comments_text_wrapper}>
                          <span>{item.ans}</span>
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
  )
}

function Loading() {
  return (
    <div className={mod.loader}>
      <Spinner />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(Comment_area);
