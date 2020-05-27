# template
单项目模板

### 目录结构
```
├── README.md
├── babel.config.js
├── mock
│   ├── config.js  //可配置baseUrl，方便与axios配置对应，可扩展其他配置
│   ├── index.js   
│   └── proxyMap.js  //代理字典配置文件
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets  
│   │   └── images
│   ├── components  //全局组件
│   │   └── topBar
│   │       └── index.vue
│   ├── http
│   │   ├── index.js    //axios配置文件
│   │   ├── list.js     //请求列表配置
│   │   └── interceptors.js    //axios拦截器函数,按数组顺序执行
│   ├── main.js
│   ├── router.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   ├── index.js
│   │   └── pages       //按业务模块划分的vuex
│   │       ├── index.js    
│   │       └── test.js  //业务文件
│   └── views
│       ├── index.vue
│       └── test        //按业务划分的组件文件夹
│           └── index.vue
├── tests
│   ├── e2e
│   │   ├── custom-assertions
│   │   │   └── elementCount.js
│   │   └── specs
│   │       └── test.js
│   └── unit
│       └── example.spec.ts
├── tsconfig.json
└── vue.config.js
```
## Project setup
```
npm install -g @vue/cli
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```
### http 请求
同一个地址的请求，当第二次请求时若第一次还在pending则自动取消上一次

##### 使用方式
```
import http from '@/http'

//并行请求多个
//new http()返回值
//result: promise数组
//cancel: 方法,取消本次所有请求
Promise.all(new http([{
    name:'request1',
    data: {}
},{
    name:'request2',
    data: {}
},{
    name:'request3',
    data: {}
}]).result)

//请求单个
//new http()返回值
//result: promise对象
const reqest = new http('request1',data).result;
//cancel: 方法,取消本次请求
reqest.cancel()
```
##### 配置请求字典  src/http/list
```
const list = [
  {
    name: 'request1',  //name为创建http实例的参数
    //其余字段均为axios config的配置项(不包含data、params字段)
    url: '/test',
    method: 'post',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  },
]
```
##### 配置axios拦截处理 src/http/interceptors.js
```
import qs from 'qs'
import { Message } from 'element-ui';

function addToken(config) {
  if(config.method === 'post') {
    if(config.data === undefined) {
      config.data = {
        token: 'eyJ'
      }
    }
    config.data.token = 'eyJ'
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
// 请求拦截器，函数第一个参数为请求config
export const requestMiddleware = [
  addToken,
]
// 返回拦截器，函数第一个参数为返回response
export const responseMiddleware = [
  errorMessage,
]
```
### 配置proxy
#### mock/config.js
```
//或扩展其他字段
{
    baseURL: '/StatAdmin'  //会拼接在proxyMap中所有url前，方便与axios配置配合使用
    status(){         //proxyMap所有返回值添加状态值
        return '100'
    },  
}
```
#### mock/proxyMap.js
```
//更改代理需重启server

const proxyMap = [
  {
    proxy: true,  //是否开启代理
    url: '/test',
    method: 'post',
    response: {
        data:{
            name: 'shenfengjiao',
            list: Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
                }]
            })
        }
    }
  },
]
```
### vuex
与视图无关的逻辑封装在action中，可以将逻辑模块化，方便复用、组合
```
import http from '@/http'

const state = {
  name:'',
}

const mutations = {
  setUserInfo(state,val){
    state.name = val.login.name;
  },
}

const actions = {
  async login({ commit }, val) {
    const login = new http('test',val);
    const data = await Promise.all([login.result])
    commit('setUserInfo', {
      login: data[0].data,
    })
    return data;
  },
  doSomeThing(){

  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
