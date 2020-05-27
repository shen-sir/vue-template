import axios from 'axios'
import _ from 'lodash'
import list from './list'
import {requestMiddleware,responseMiddleware} from './interceptors'

const cancelCache = {};
const httpInstance = axios.create({
  timeout: 300000,
  baseURL: '/StatAdmin'
})
httpInstance.interceptors.request.use(function (config) {
  // 执行中间件队列,中间件函数只允许修改参数
  for (const middleware of requestMiddleware) {
    middleware(config)
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

httpInstance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  for (const middleware of responseMiddleware) {
    middleware(response)
  }
  return response.data;
}, function (error) {
  if (axios.isCancel(error)) {
    return Promise.reject(error)
  }
  
  // 对响应错误做点什么
  return Promise.reject(error);
});

function generate(name,data,context={}) {
  const config = _.find(list,{name})
  const CancelToken = axios.CancelToken;
  if(cancelCache[name]) {
    cancelCache[name]({
      name,
      text: 'From cancelCache'
    })
  }
  if(['put','post', 'patch'].includes(config.method)) {
    config.data = data;
  } else {
    config.params = data;
  }
  config.cancelToken = new CancelToken((c) => {
    context.cancel = c;
  })
  const request = httpInstance(config);
  context.result = request;
  cancelCache[name] = context.cancel;
  return context;
}
export default class http {
  constructor(request,data){
    if(typeof request === 'string') {
      generate(request,data,this)
    }else if(request instanceof Array) {
      this.requestList = []
      for (const item of request) {
        this.requestList.push(generate(item.name,item.data))
      }
      this.result = this.requestList.map(item => item.result)
    }
  }
  cancel(name) {
    if(this.requestList){
      this.requestList.forEach(item => item.cancel())
      return
    }
    this.cancel()
  }
}