import axios from 'axios';
import Request from '../../utils/request';

class QuestionPoolApiMaker {

  constructor() {
    this.instance.interceptors.request.use(null, Request.axiosResError)
    this.instance.interceptors.response.use(Request.axiosResSuccess, Request.axiosResError)
  }

  instance = axios.create({
    baseURL: Request.baseUrl,
    timeout: 1000
  })

  urls = {
    pushQuestion: "/aphand_que",
    pushAnswer: '/aphand_ans',
    like: '/aplike',
    likeoff: '/aplikeoff'
  }

  /* 提问 */
  pushQuestion = async (questionid, question) => {
    return await this.instance.post(`${this.urls.pushQuestion}`, {
      questionid,
      question
    }, {
      headers: {
        'code': 'iknow'
      }
    }).then((res) => { console.log(res.data.msg) })
  }

  pushAnswer = async (ans, username, questionid) => {
    return await this.instance.post(`${this.urls.pushAnswer}`, {
      ans,
      username,
      questionid,
    }, {
      headers: {
        'code': 'iknow'
      }
    }).then(() => { })
  }

  handleLike = async (questionid, userid) => {
    return await this.instance.post(`${this.urls.like}`, {
      questionid,
      userid
    }).then(res => {
      return res.data.msg
    })
  }

  handleLikeoff = async (questionid, userid) => {
    return await this.instance.post(`${this.urls.likeoff}`, {
      questionid,
      userid
    }).then((res) => {
      return res.data.msg
    })
  }
}

const QuestionPoolApi = new QuestionPoolApiMaker()
export default QuestionPoolApi