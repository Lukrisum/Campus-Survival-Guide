import React from 'react';
import mod from './index.module.scss';
import Spinner from '../../../components/spinner';
import { useState, useEffect, Fragment, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Shady from '../../../components/shady';
import { useDebounce } from '../../../utils/debounce';
import { connect } from 'react-redux';
import { actions } from '../../../redux'
import profileImg from '../../../assets/images/ncuhome.jpg'

function Knowledge_base(props) {
  const [isloading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://120.77.8.223:88/hot')
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

  return (
    <div className={mod.background}>
      {
        isloading
          ? <Loading />
          : <Content content={items} handleToContent={props.sendAction} />
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
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [popup, setPopup] = useState(false);
  const [loadList, setLoadList] = useState(false);
  const inputElement = useRef();

  const handleOnFocus = () => {
    setLoadList(true);
    setPopup(true);
  }

  const handleOnBlur = () => {
    setSearchItems([]);
    setLoadList(false);
    setPopup(false);
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSearch = useDebounce((keywords) => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/search',
      data: {
        keywords,
      }
    }).then(res => {
      setSearchItems(res.data.search)
    }).catch(error => {
      console.log(error)
    })
  }, 300)

  useEffect(() => {
    if (inputValue && inputValue != 0) {
      handleSearch(inputValue);
    }
    else {
      setSearchItems([]);
    }
  }, [inputValue])

  const handleClear = () => {
    setInputValue('');
    setSearchItems([]);
  }

  return (
    <Fragment>
      {
        popup ? <Shady /> : <Fragment />
      }
      <div className={mod.main_content_wrapper}>
        <div className={mod.search_wrapper}>
          <div className={mod.search_input_wrapper}>
            <label
              className={mod.search_img_wrapper}
              htmlFor={"search_input"}
            >
              <SearchIcon style={{
                color: "rgba(79, 178, 255, 1)",
                width: "2.3rem",
                height: "2.3rem"
              }} />
            </label>
            <input
              type="text"
              placeholder={'请输入问题关键字搜索'}
              value={inputValue}
              onChange={handleInput}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              id={"search_input"}
              ref={inputElement}
            />
            <div
              className={mod.search_clear_wrapper}
              onClick={handleClear}
              onMouseDown={(event) => {
                event.preventDefault()
              }}
            >
              <ClearIcon style={{
                color: "#ABA7AF",
              }} />
            </div>
          </div>
          {
            loadList
              ? <ul className={mod.search_result_wrapper}>
                {
                  searchItems?.map((item, index) => {
                    if (item.que && item.que != 0) {
                      return (
                        <li
                          key={index}
                          onMouseDown={(event) => {
                            event.preventDefault()
                          }}
                          onClick={() => {
                            props.handleToContent(item);
                            navigate('/knowledge_base_content')
                          }}
                        >
                          <div className={mod.search_result_sign}></div>
                          <span>{item.que}</span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              : <Fragment />
          }
        </div>
        <div className={mod.section_nav_wrapper}>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img
                src=""
                alt="迎新"
                onClick={() => {
                  navigate('/knowledge_base_sorts', { state: { api: "/new/ques" } });
                }}
              />
            </div>
            <span>迎新</span>
          </div>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img src="" alt="学习" onClick={() => {
                navigate('/knowledge_base_sorts', { state: { api: "/study/ques" } });
              }} />
            </div>
            <span>学习</span>
          </div>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img src="" alt="生活" onClick={() => {
                navigate('/knowledge_base_sorts', { state: { api: "/life/ques" } });
              }} />
            </div>
            <span>生活</span>
          </div>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img src="" alt="行政" onClick={() => {
                navigate('/knowledge_base_sorts', { state: { api: "/admin/ques" } });
              }} />
            </div>
            <span>行政</span>
          </div>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img src="" alt="网址号码" onClick={() => {
                navigate('/knowledge_base_sorts');
              }} />
            </div>
            <span>网址号码</span>
          </div>
          <div className={mod.div}>
            <div className={mod.section_nav}>
              <img
                src=""
                alt="教学周历"
                onClick={() => {
                  navigate('/knowledge_base_sorts');
                }} />
            </div>
            <span>教学周历</span>
          </div>
        </div>
        <div className={mod.hr}></div>
      </div>
      <ContentAnsItems content={props.content} handleToContent={props.handleToContent} />
    </Fragment>
  )
}

function ContentAnsItems(props) {
  const navigate = useNavigate();
  return (
    <ul className={mod.hot_ques_wrapper}>
      <li className={mod.hot_icon_wrapper}>
        <img src="" alt="" />
        <span>热门问题</span>
      </li>
      {props.content.map((item, index) => {
        return (
          <Fragment>
            <li
              key={index}
              onClick={() => {
                props.handleToContent(item);
                navigate('/knowledge_base_content')
              }}>
              <div className={mod.hot_ques_top_info_wrapper}>
                <img src={profileImg} alt="profile_photo" />
                <span> {item.username}</span>
              </div>
              <div className={mod.hot_ques_text_wrapper}>
                <span className={mod.hot_ques_text_header}>{item.que}</span>
                <div className={mod.hot_ques_text_content_wrapper}>
                  <span className={mod.hot_ques_text_content}>
                    <ContentAnsText content={item.questionid} />
                  </span>
                </div>
              </div>
              <div className={mod.hot_ques_bottom_info_wrapper}></div>
            </li>
          </Fragment>
        )
      })}
      <div className={mod.hot_ques_bottom_blank}>
        <span>
          暂无更多
        </span>
      </div>
    </ul>
  )
}

function ContentAnsText(props) {
  const [answer, setAnswer] = useState();
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://120.77.8.223:88/ans',
      data: {
        questionid: props.content
      }
    }).then(({ data }) => {
      setAnswer(data.msg[0].ans);
    })
  }, [])

  return (
    <Fragment>
      <span dangerouslySetInnerHTML={{ __html: answer }} ></span>
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    sendAction: (msg) => {
      dispatch(actions.loadCommentArea(msg));
    }
  }
}

export default connect(null, mapDispatchToProps)(Knowledge_base);
