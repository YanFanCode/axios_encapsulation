/*
 * @LastEditors: yanfan
 * @LastEditTime: 2024-03-08 21:34:40
 */
import yfRequest from '..'

yfRequest
  .request({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
