import mod from './index.module.scss';
import { useState, useEffect, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../../../components/spinner';
import Shady from '../../../components/shady';
import KeyboardInput from '../../../components/keyboard_input';
import Text_box from '../../../components/text_box';
import axios from 'axios';
import MsgContext from '../../../context_manege';

export default function Knowledge_base() {
  const [isloading, setIsloading] = useState(true);      //whether is loaded or not
  const [popup, setPopup] = useState(false);      //whether to render the input box or not
  const [items, setItems] = useState([]);        //a storage for the hots
  const [questionid, setQuestionid] = useState();
  // const skipToSubmiited = useNavigate();

  const toApp = useContext(MsgContext);

  //get what`s hot
  useEffect(() => {
    axios.get('http://120.77.8.223:88/apques')
      .then(({ data }) => {
        const addList = (preList) => {
          const newList = preList.concat(data.msg);
          return newList;
        }
        setItems(addList(items))
        setIsloading(false);
      })
      .catch(console.error)
  }, [])

  //get question id from the child component
  const getQuestionid = (msg) => {
    setQuestionid(msg);
  }

  //push an answer (a function added into the component <Keyboard_input/>)
  const handleSubmit = (inputValue) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/aphand_ans',
      data: {
        "ans": inputValue,
        "username": "???",
        questionid
      },
      headers: {
        'code': 'iknow'
      }
    }).then((res) => {
      alert("提交成功(待审核...)");
      console.log(res.data.answerid)
      setPopup(false);
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleLike = () => {
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
    <div className={mod.background}>
      {
        popup
          ? <Fragment>
            <Shady func={() => {
              setPopup(false);
            }} />
            <KeyboardInput
              header={"回答问题"}
              btnOnclick={handleSubmit}
            />
          </Fragment>
          : <Fragment />
      }

      {
        isloading
          ? <Loading />
          : <Content
            content={items}
            handleAddAns={(msg) => {
              setPopup(true);
              getQuestionid(msg);
            }}
            handleAddLike={(msg) => {
              getQuestionid(msg);
              handleLike();
            }}
            handleGetMsg={(msg) => {
              toApp(msg);
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
  return (
    <ul>
      {
        props.content.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                props.handleGetMsg(item);
                nevigate('/comment_area');
              }}
              id={item.questionid}
            >
              <div
                className={mod.profile_img_wrapper}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <img src="" alt="" />
              </div>
              <div
                className={mod.username_wrapper}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <span className={mod.span_0}>{item.username}</span>
                <span className={mod.span_1}>最先提问:</span>
                <span className={mod.span_2}>三天前</span>
              </div>
              <div className={mod.text_wrapper}>
                <Text_box text={item.que} />
              </div>
              <div
                className={mod.bottom_data_wrapper}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <span
                  onClick={() => {
                    props.handleAddAns(item.questionid);
                  }}
                >我要回答</span>
                <span>回答{item.ansnum}</span>
                <span
                  onClick={() => {
                    props.handleAddLike(item.questionid);
                  }}
                >同问{item.great}</span>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
