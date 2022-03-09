import axios from "axios";
import Request from "../../utils/request";

class ContentApiMaker {

  constructor() {
    this.instance.interceptors.request.use(null, Request.axiosResError)
    this.instance.interceptors.response.use(Request.axiosResSuccess, Request.axiosResError)
  }

  instance = axios.create({
    timeout: 10000,
    baseURL: Request.baseUrl
  })

  urls = {
    getContent: '/ans'
  }

  getKnowledgeContent = async (questionid) => {
    return await this.instance.post(`${this.urls.getContent}`, {
      questionid,
    }).then(res => {
      return res.data.msg[0].ans
    }).catch(error => {
      throw error
    })
  }

}

const ContentApi = new ContentApiMaker()
export default ContentApi