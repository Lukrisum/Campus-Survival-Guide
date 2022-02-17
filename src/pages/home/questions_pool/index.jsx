import mod from './index.module.scss';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../../../components/spinner';
import Shady from '../../../components/shady';
import KeyboardInput from '../../../components/keyboard_input';
import TextBox from '../../../components/text_box';
import axios from 'axios';
import FabMine from '../../../components/floating_action_button';
import { connect } from 'react-redux';
import { actions } from '../../../redux'
//temp plan
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

function Questions_pool(props) {
  const [isloading, setIsloading] = useState(true);      //whether is loaded or not
  const [popup, setPopup] = useState(false);      //whether to render the input box or not
  const [items, setItems] = useState([]);        //a storage for the hots
  const [questionid, setQuestionid] = useState();
  const [pushFlag, setPushFlag] = useState(false);

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

  //push an answer (a function added into the component <Keyboard_input/>)
  const handleSubmit = (ans) => {
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
    }).then((res) => {
      alert("提交成功(待审核...)");
      setPopup(false);
    }).catch((error) => {
      console.log(error)
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

  const handlePushQues = (que) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aphand_que',
      data: {
        username: 'whooo',
        que,
      }
    }).then(() => {
      alert("提交成功(待审核...)");
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
                  handleSubmit(inputValue);
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
            handleAddLike={handleLike}
            handleAddAns={(msg) => {
              setQuestionid(msg);
              setPopup(true);
            }}
            handlePushQues={() => {
              setPushFlag(true);
              setPopup(true);
            }}
            handleToCommentArea={props.sendAction}
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

  return (
    <div className={mod.list_wrapper}>
      <FabMine onclick={props.handlePushQues} />
      <ul>
        {
          props.content.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props.handleToCommentArea(item);
                  nevigate('/comment_area');
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
                <div
                  className={mod.bottom_data_wrapper}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  <span className={mod.bottom_data_wrapper_ansnum}>已有{item.ansnum}人回答</span>
                  <div className={mod.bottom_data_wrapper_great_wrapper}>
                    <div>
                      <ArrowDropUpIcon />
                      <LikeSpan great={item.great} questionid={item.questionid} handleAddLike={props.handleAddLike} />
                    </div>
                    <div className={mod.bottom_data_wrapper_great_wrapper_blank}></div>
                    <div>
                      <TextsmsIcon />
                      <span
                        onClick={() => {
                          props.handleAddAns(item.questionid);
                        }}
                      >回答</span>
                    </div>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

function LikeSpan(props) {
  const [likes, setLikes] = useState(props.great);
  return (
    <span
      onClick={() => {
        props.handleAddLike(props.questionid);
        setLikes(likes + 1);
      }}
    >同问{likes}</span>
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