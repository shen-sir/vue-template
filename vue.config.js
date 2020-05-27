// vue.config.js
const path = require('path');
const mock = require('./mock/index.js');

module.exports = {
  // 选项...
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    open: true,
    host: 'localhost',
    // proxy: {
    //   '/': {
    //     target: 'http://www.test.com',
    //     ws: false,
    //     changeOrigin: true,
    //   },
    // },
    before(app, server) {
      mock.forEach(item => {
        if(!item.proxy) return
        app[item.method](item.url,(req, res) => {
          res.json(item.response);
        });
      })
    }
  },
  configureWebpack: config => {
    config.entry = './src/main.js';
    config.resolve = {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.vue',
        '.json',
        '.wasm',
        '.ts',
        '.tsx'
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    };
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}