import mod from './index.module.scss';
import { useState, useEffect,Fragment } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../../../components/spinner';
import Shady from '../../../components/shady';
import KeyboardInput from '../../../components/keyboard_input';
import TextBox from '../../../components/text_box';
import axios from 'axios';
import FabMine from '../../../components/floating_action_button';
import { connect } from 'react-redux';
import { actions } from '../../../redux'
import { moreData } from '../../../utils/infiniteScroll_data';
//temp plan
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { InfiniteScroll } from 'antd-mobile'

function Questions_pool(props) {
  const [isloading, setIsloading] = useState(true);      //whether is loaded or not
  const [popup, setPopup] = useState(false);      //whether to render the input box or not
  const [items, setItems] = useState([]);        //a storage for the hots
  const [questionid, setQuestionid] = useState();
  const [pushFlag, setPushFlag] = useState(false);
  const [ansnum, setAnsnum] = useState(null);
  const [item, setItem] = useState({})

  //get what`s hot
  useEffect(() => {
    axios.get('http://120.77.8.223:88/apques')
      .then(({ data }) => {
        const addList = (preList) => {
          const newList = preList.concat(data.msg);
          return newList;
        }
        setItems(addList(items));
        setIsloading(false);
      })
      .catch(console.error)
  }, [])

  //回答 --> <Keyboard_input/>
  const handlePushAns = (ans) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aphand_ans',
      data: {
        ans,
        username: "???",
        questionid,
      },
      headers: {
        'code': 'iknow'
      }
    }).then(() => {
      alert("提交成功(审核ing...)");
      setPopup(false);
      handleGetAnsnum(questionid);
    }).catch((error) => {
      console.log(error)
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

  //提问 --> <Keyboard_input/>
  const handlePushQues = (que) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aphand_que',
      data: {
        username: 'whooo',
        que,
      }
    }).then(() => {
      alert("提交成功(审核ing...)");
      setPushFlag(false);
      setPopup(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className={mod.background}>
      {
        popup
          ? <Fragment>
            <Shady onclick={() => {
              if (pushFlag) {
                setPushFlag(false);
              }
              setPopup(false);
            }} />
            <KeyboardInput
              header={pushFlag ? "提交问题" : "回答问题"}
              type={pushFlag ? true : false}
              btnOnclick={(inputValue) => {
                if (pushFlag) {
                  handlePushQues(inputValue);
                }
                else {
                  handlePushAns(inputValue);
                }
              }}
            />
          </Fragment>
          : <Fragment />
      }

      {
        isloading
          ? <Fragment>
            <Loading />
          </Fragment>
          :
          <Content
            content={items}
            handleItem={setItem}
            item={item}
            handleToCommentArea={props.sendAction}
            handlePushAns={(msg) => {
              setQuestionid(msg);
              setPopup(true);
            }}
            handlePushQues={() => {
              setPushFlag(true);
              setPopup(true);
            }}
            ansnum={{
              ansnum,
              questionid
            }}
          />
      }
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


function Content(props) {
  const nevigate = useNavigate();

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  const [flag,setFlag] = useState(0)

  async function loadMore() {
    const append = await moreData(props.content,flag);
    setFlag(flag+5);
    setData(val => [...val, ...append]);
    setHasMore(append.length > 0);
  }

  return (
    <div className={mod.list_wrapper}>
      <FabMine onclick={props.handlePushQues} />
      <ul>
        {
          data.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props.handleToCommentArea(item);
                  nevigate('/comment_area', { state: { props: item } });
                }}
                id={item.questionid}
              >
                <div
                  className={mod.profile_img_wrapper}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
                </div>
                <div
                  className={mod.username_wrapper}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  <span className={mod.span_0}>{item.username}</span>
                  <span className={mod.span_1}>最先提问</span>
                  <span className={mod.span_2}>三天前</span>
                </div>
                <div className={mod.text_wrapper}>
                  <TextBox text={item.que} type={false} />
                </div>
                <DataBar data={item} handleItem={props.handleItem} handlePushAns={props.handlePushAns} ansnum={props.ansnum} />
              </li>)
          })
        }
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </ul>
    </div>
  )
}

//动态更新的数据
function DataBar(props) {
  const item = props.data;
  const [ansnum, setAnsnum] = useState(item.ansnum);
  const [likes, setLikes] = useState(item.great);
  const ansnumMsg = props.ansnum;
  const [isLiked, setIsLiked] = useState(false);

  //检查是否为目标问题
  useEffect(() => {
    if (ansnumMsg?.questionid == item.questionid && ansnumMsg.ansnum != null) {
      setAnsnum(ansnumMsg.ansnum);
    }
  }, [props.ansnum])

  //获取点赞状态
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
    <div
      className={mod.bottom_data_wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <span className={mod.bottom_data_wrapper_ansnum}>已有{ansnum}人回答</span>
      <div className={mod.bottom_data_wrapper_great_wrapper}>
        <div>
          <ArrowDropUpIcon style={
            isLiked
              ? { backgroundColor: 'red' }
              : {}
          } />
          <span
            onClick={() => {
              isLiked
                ? handleCancleLike(item.questionid, 12306)
                : handleLike(item.questionid, 12306);
            }}
          >同问{likes}
          </span>
        </div>
        <div className={mod.bottom_data_wrapper_great_wrapper_blank}></div>
        <div>
          <TextsmsIcon />
          <span
            onClick={() => {
              props.handlePushAns(item.questionid);
            }}
          >回答</span>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    sendAction: (msg) => {
      dispatch(actions.loadCommentArea(msg));
    }
  }
}

export default connect(null, mapDispatchToProps)(Questions_pool);
