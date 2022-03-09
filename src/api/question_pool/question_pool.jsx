import axios from 'axios';
import Request from '../../utils/request';

class QuestionPoolApiMaker {

  constructor() {
    this.instance.interceptors.request.use(null, Request.axiosResError)
    this.instance.interceptors.response.use(Request.axiosResSuccess, Request.axiosResError)
  }

  instance = axios.create({
    baseURL: Request.baseUrl,
    timeout: Request.timeout
  })

  urls = {
    getQuestionList: '/apques',
    pushQuestion: '/aphand_que',
    pushAnswer: '/aphand_ans',
    like: '/aplike',
    likeoff: '/aplikeoff'
  }

  getQuestionList = async () => {
    return await this.instance.get(`${this.urls.getQuestionList}`)
      .then(res => {
        return res.data.msg
      })
      .catch(error => {
        throw error
      })
  }

  /* 提问 */
  pushQuestion = async (username, que) => {
    return await this.instance.post(`${this.urls.pushQuestion}`, {
      username,
      que
    }).then(() => { })
      .catch(error => {
        throw error
      })
  }

  pushAnswer = async (ans, username, questionid) => {
    return await this.instance.post(`${this.urls.pushAnswer}`, {
      ans,
      username,
      questionid,
    }, {
      headers: {
        'code': 'iknow'
      },
    }).then(() => { })
      .catch(error => {
        throw error
      })
  }

  handleLike = async (questionid, userid) => {
    return await this.instance.post(`${this.urls.like}`, {
      questionid,
      userid
    }).then(res => {
      return res.data.msg
    }).catch(error => {
      throw error
    })
  }

  handleLikeoff = async (questionid, userid) => {
    return await this.instance.post(`${this.urls.likeoff}`, {
      questionid,
      userid
    }).then((res) => {
      return res.data.msg
    }).catch(error => {
      throw error
    })
  }
}

const QuestionPoolApi = new QuestionPoolApiMaker()
export default QuestionPoolApi
