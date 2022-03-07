import Request from "../../utils/request";
import axios from "axios";

class CommentApiMaker {

  constructor() {
    this.instance.interceptors.request.use(null, Request.axiosReqError)
    this.instance.interceptors.response.use(Request.axiosrResSuccess, Request.axiosrResError)
  }

  instance = axios.create({
    baseURL: Request.baseUrl,
    timeout: 10000
  })

  urls = {
    getCommentList: "/apans",
  }

  /* 两用（后续改） */
  getCommentList = async (questionid) => {
    return await this.instance.post(`${this.urls.getCommentList}`, {
      questionid,
    }).then(res => {
      return res.data.msg
    })
  }

}

const CommentApi = new CommentApiMaker()
export default CommentApi;