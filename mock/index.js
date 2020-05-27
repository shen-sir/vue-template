const proxyMap = require('./proxyMap.js')
const config = require('./config.js')


function generator(list) {
  return list.map(item => {
    item.url = config.baseURL + item.url;
    item.response.status = config.status();
    return item
  })
}
module.exports = generator(proxyMap);