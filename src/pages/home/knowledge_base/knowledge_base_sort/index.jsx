import React, {useState} from "react";
import mod from './index.module.scss'
import { connect } from 'react-redux';
import axios from "axios";
import profileImg from "../../../../assets/images/ncuhome.jpg"
import Spinner from "../../../../components/spinner";

function Knowledge_base_sort(props) {
  const [ans, setAns] = useState();
  const [isLoading,setIsloading] = useState(true);

  axios({
    method: 'post',
    url: "http://120.77.8.223:88/ans",
    data: {
      questionid: props.questionid
    }
  }).then((res) => {
    setAns(res.data.msg[0].ans);
    setIsloading(false);
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
        ?<Spinner/>
        :<span dangerouslySetInnerHTML={{__html:`${ans}`}}></span>

      }
        {/* <span dangerouslySetInnerHTML={{__html:`${ans}`}}></span> */}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(Knowledge_base_sort);
