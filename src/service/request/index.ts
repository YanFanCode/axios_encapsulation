/*
 * @LastEditors: yanfan
 * @LastEditTime: 2024-03-08 21:52:04
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { YFRequestConfig } from './type'

class YFRequest {
  instance: AxiosInstance
  constructor(config: YFRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功拦截器')
        return config
      },
      (err) => {
        console.log('全局请求失败拦截器')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功拦截器')
        return res.data
      },
      (err) => {
        console.log('全局响应失败拦截器')
        return err
      }
    )
    // 针对额外实例判断 interceptors 属性是否存在
    if (config.interceptors) {
      this.instance.interceptors.request.use(config.interceptors.requestSuccessFn, config.interceptors.requestFailureFn)
      this.instance.interceptors.response.use(config.interceptors.responseSuccessFn, config.interceptors.responseFailureFn)
    }
  }

  // 接收一个 泛型参数 表明当前返回值类型并且赋值给 Promise 返回结果后 res可以直接推导出对应类型,默认是any
  request<T = any>(config: YFRequestConfig<T>) {
    // 类型“InternalAxiosRequestConfig<any>”的参数,属性“headers”的类型不兼容。 单次请求出现了类型不兼容问题，后续修改
    // 单次请求成功拦截器
    // if (config.interceptors?.requestSuccessFn) {
    //   // 自行调用后修改config为最新值
    //   // 此处不可以使用 this.instance 来注册 会影响所有该实例的请求，下面响应拦截同理
    //   config = config.interceptors.requestSuccessFn(config)
    // }
    return new Promise<T>((reslove, reject) => {
      // request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
      // 参阅源码instance中request可以决定类型，传入泛型
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          reslove(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 实现具体请求类型方法
  get<T = any>(config: YFRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: YFRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  put<T = any>(config: YFRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete<T = any>(config: YFRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default YFRequest
