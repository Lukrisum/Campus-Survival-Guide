import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import mod from './index.module.scss';
import Spinner from "../../../../components/spinner";
import KeyboardInput from "../../../../components/keyboard_input";
import Shady from "../../../../components/shady";
import TextBox from "../../../../components/text_box";
import { connect } from "react-redux";
import { useLocation } from 'react-router'
//
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const Comment_area = (props) => {
  const location = useLocation();
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState(location.state.props);
  const [ansnum, setAnsnum] = useState(null);
  //回答
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
      setPopup(false);
      handleGetAnsnum(msg.questionid);
    }).catch((error) => {
      console.log(error);
    })
  }

  //当前回答人数
  const handleGetAnsnum = (questionid) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/apans',
      data: {
        questionid,
      }
    }).then(({ data }) => {
      setAnsnum(data.msg.length);
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
          ansnumMsg={ansnum}
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
  const location = useLocation()
  const item = location.state.props;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.great);
  const [ansnum, setAnsnum] = useState(item.ansnum);

  //回答人数 动态变化
  useEffect(() => {
    setAnsnum(props.ansnumMsg);
  }, [props.ansnumMsg])

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aplikeoff',
      data: {
        questionid: item.questionid,
        userid: 12306
      }
    }).then(res => {
      if (res.data.msg === "取消点赞成功") {
        setIsLiked(true)
        axios({
          method: 'post',
          url: 'http://120.77.8.223:88/aplike',
          data: {
            questionid: item.questionid,
            userid: 12306
          }
        })
      }
    })
  }, [])

  //点赞
  const handleLike = (questionid, userid) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aplike',
      data: {
        questionid,
        userid,
      }
    }).then((res) => {
      if (res.data.msg === "点赞成功") {
        setIsLiked(true);
        setLikes(item.great + 1);
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  //取消点赞
  const handleCancleLike = (questionid, userid) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aplikeoff',
      data: {
        questionid,
        userid,
      }
    }).then((res) => {
      if (res.data.msg === "取消点赞成功") {
        setIsLiked(false);
        setLikes(likes - 1);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Fragment>
      <ul className={mod.content_text_wrapper}>
        <li id={item.questionid}>
          <div className={mod.profile_img_wrapper}>
            <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
          </div>
          <div className={mod.username_wrapper}>
            <span className={mod.span_0}>{item.username}</span>
            <span className={mod.span_1}>最先提问</span>
            <span className={mod.span_2}>三天前</span>
          </div>
          <div className={mod.text_wrapper}>
            <TextBox text={item.que} type={true} />
          </div>
          <div className={mod.bottom_data_wrapper}>
            <span className={mod.bottom_data_wrapper_ansnum}>已有{ansnum || item.ansnum}人回答</span>
            <div className={mod.bottom_data_wrapper_great_wrapper}>
              <div>
                <ArrowDropUpIcon style={
                  isLiked
                    ? { backgroundColor: 'red' }
                    : {}
                } />
                <span onClick={() => {
                  isLiked
                    ? handleCancleLike(item.questionid, 12306)
                    : handleLike(item.questionid, 12306)
                }} >同问{likes}</span>
              </div>
              <div className={mod.bottom_data_wrapper_great_wrapper_blank}></div>
              <div>
                <TextsmsIcon />
                <span
                  onClick={() => {
                    props.handlegetMsg(item);
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

function Comments() {
  const location = useLocation()
  const item = location.state.props;
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
