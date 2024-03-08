/*
 * @LastEditors: yanfan
 * @LastEditTime: 2024-03-08 21:48:44
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 抽取interceptors类型
interface YFInterceptor<T = AxiosResponse> {
  // 在使用拦截器时，使用InternalAxiosRequestConfig而不使用AxiosRequestConfig
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 继承自AxiosRequestConfig类型扩展自己的类型
//原先axios.create中CreateAxiosDefaults类型的改变影响不大，继续使用它的父类AxiosRequestConfig。
export interface YFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YFInterceptor<T>
}
