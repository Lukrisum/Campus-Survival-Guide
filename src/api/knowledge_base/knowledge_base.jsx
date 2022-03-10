import axios from "axios";
import Request from "../../utils/request";

class KnowledgeApiMaker {

  constructor(){
    this.instance.interceptors.request.use(null,Request.axiosReqError)
    this.instance.interceptors.response.use(Request.axiosResSuccess,Request.axiosResError)
  }

  instance = axios.create({
    baseURL: Request.baseUrl,
    timeout: 10000
  })

  urls = {
    getKnowledgeList: '/ques',
  }

  getKnowledgeList = async () => {
    return await this.instance.get(`${this.urls.getKnowledgeList}`)
      .then(res => {
        return res.data.msg
      })
      .catch(error => {
        throw error
      })
  }
}

const KnowledgeApi = new KnowledgeApiMaker()
export {KnowledgeApi}
