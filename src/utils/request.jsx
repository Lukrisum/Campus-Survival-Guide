class RequestMaker {

  baseUrl = 'http://120.77.8.223:88'
  timeout = 10000

  /* 自定义配置 */
  constructor(baseurl = 'http://120.77.8.223:88', timeout = 10000) {
    this.timeout = timeout
    this.baseUrl = baseurl
  }

  /* token（再说）*/

  /* 请求错误 */
  axiosReqError = async () => {
    throw '请求发生错误，请检查网络后重试'
  }

  /* 返回成功 */
  axiosResSuccess = async (response) => {
    return response
  }

  /* 返回错误 */
  axiosResError = async (error) => {
    if (error?.message === 'Network Error'||error?.message?.includes('timeout')) {
      throw '请求错误，请检查网络后重试'
    }
    throw '服务器错误'
  }

}

const Request = new RequestMaker()
export default Request
