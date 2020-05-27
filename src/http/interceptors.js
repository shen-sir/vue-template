import qs from 'qs'
import { Message } from 'element-ui';
function addToken(config) {
  if(config.method === 'post') {
    if(config.data === undefined) {
      config.data = {
        token: 'eyJhcHBJZCI6IjkiLCJ1c2VyVG9rZW4iOiIwMGM5YWI3OGJkYmE5YzZmNDg2NmM0Y2Y5NjhkYjIyNCJ9'
      }
    }
    config.data.token = 'eyJhcHBJZCI6IjkiLCJ1c2VyVG9rZW4iOiIwMGM5YWI3OGJkYmE5YzZmNDg2NmM0Y2Y5NjhkYjIyNCJ9'
    config.data = qs.stringify(config.data)
  }
}
function errorMessage(response) {
  if(response.data.status !== 100){
    Message({
      showClose: true,
      message: response.msg,
      type: 'error'
    });
  }
}

// 请求拦截器
export const requestMiddleware = [
  addToken,
]
// 返回拦截器
export const responseMiddleware = [
  errorMessage,
]