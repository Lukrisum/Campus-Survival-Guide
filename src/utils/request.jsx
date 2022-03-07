class RequestMaker {
  baseUrl = 'http://120.77.8.223:88'

  axiosReqError = async () => {
    throw '请求超时，请检查网络后重试'
  }

  /* 请求成功 */
  axiosResSuccess = async (response) => {
    if (response?.data?.msg === undefined&&response?.data !== '') {
      throw '服务器未知错误'
    }
    return response
  }

  /* 返回错误 */
  axiosResError = async (error) => {
    if (error?.message === 'Network Error') {
      throw '请求错误，请检查网络后重试'
    }
    throw error?.response?.data?.msg || '服务器错误'
  }

}

const Request = new RequestMaker();
export default Request;
