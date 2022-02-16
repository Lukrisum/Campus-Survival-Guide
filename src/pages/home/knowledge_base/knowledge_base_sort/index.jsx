import React, { useMemo, useState } from "react";
import mod from './index.module.scss'
import { connect } from 'react-redux';
import { useEffect } from "react";
import axios from "axios";

function Knowledge_base_sort(props) {
  console.log(props);
  const [a, seta] = useState();

  axios({
    method: 'post',
    url: "http://120.77.8.223:88/ans",
    data: {
      questionid: props.questionid + 5
    }
  }).then((res) => {
    // seta(data.msg.ans);
    seta(res.data.msg[0].ans)
  })

  return (
    <div className={mod.main_wrapper}>
      <div className={mod.header_wrapper}>
        <span>{props.que}</span>
      </div>
      <div className={mod.profile_wrapper}>
        <img src="" alt="小家园" />
        <span>{props.username + ":"}</span>
      </div>
      <div className={mod.text_wrapper}>
        <span>
          {a}
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(Knowledge_base_sort);
