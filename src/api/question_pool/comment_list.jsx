import Request from "../../utils/request";
import axios from "axios";

class CommentApiMaker {

  constructor() {
    this.instance.interceptors.request.use(null, Request.axiosReqError)
    this.instance.interceptors.response.use(Request.axiosResSuccess, Request.axiosResError)
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
    },{
      timeout:7000
    }).then(res => {
      return res.data.msg
    }).catch((error) => {
      throw error
    })
  }

}

const CommentApi = new CommentApiMaker()
export default CommentApi;
