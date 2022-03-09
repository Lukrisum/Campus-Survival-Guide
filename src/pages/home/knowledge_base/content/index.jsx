import React, { useEffect, useState } from "react";
import mod from './index.module.scss'
import { connect } from 'react-redux';
import axios from "axios";
import profileImg from "../../../../assets/images/ncuhome.jpg"
import ContentApi from "../../../../api/knowledge_base/content";

function Content(props) {
  const [ans, setAns] = useState();
  const [isLoading, setIsloading] = useState(true);

  // axios({
  //   method: 'post',
  //   url: "http://120.77.8.223:88/ans",
  //   data: {
  //     questionid: props.questionid
  //   }
  // }).then((res) => {
  //   setAns(res.data.msg[0].ans);
  //   setIsloading(false);
  // })

  useEffect(() => {
    ContentApi.getKnowledgeContent(props.questionid)
      .then(res => {
        setAns(res)
        setIsloading(false)
      })
      .catch(error => {
        alert(error)
      })
  })

  return (
    <div className={mod.main_wrapper}>
      <div className={mod.header_wrapper}>
        <span>{props.que}</span>
      </div>
      <div className={mod.profile_wrapper}>
        <img src={profileImg} alt="小家园" />
        <span>{props.username + "："}</span>
      </div>
      <div className={mod.text_wrapper}>
        {
          isLoading
            ? <span className={mod.loading}>加载中...</span>
            : <span dangerouslySetInnerHTML={{ __html: `${ans}` }}></span>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(Content);
