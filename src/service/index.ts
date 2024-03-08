/*
 * @LastEditors: yanfan
 * @LastEditTime: 2024-03-08 21:21:18
 */
import { BASE_URL, TIME_OUT } from './config'
import YFRequest from './request'

const yfRequest = new YFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 对另外的实例进行精准拦截请求与响应
export const yfRequest2 = new YFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('单独的响应成功拦截器')
      return config
    },
    requestFailureFn: (err) => {
      console.log('单独的响应失败拦截器')
      return err
    },
    responseSuccessFn: (res) => {
      console.log('单独的请求成功拦截器')
      return res
    },
    responseFailureFn: (err) => {
      console.log('单独的请求失败拦截器')
      return err
    }
  }
})

export default yfRequest
