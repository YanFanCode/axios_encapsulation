/*
 * @LastEditors: yanfan
 * @LastEditTime: 2024-03-08 21:45:44
 */
import { yfRequest2 } from '..'

interface Ikun {
  data: any
  code: number
  success: boolean
}
// 传入类型 表明返回的res的类型具体是什么
yfRequest2
  .request<Ikun>({
    url: '/entire/list',
    params: {
      offset: 20,
      size: 20
    }
  })
  .then((res) => {
    console.log(res)
  })
