const path=require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config ={
  //1、入口
    entry: {
      main:'./main'
    },
  //2、出口
    output:{
      path:path.join(__dirname,'./dist'),
      publicPath:'/dist/',
      filename:'main.js'
    },
  //3、模块配置，比如css，js，html。是否提取出来
    module:{
      rules:[
        {
          test:/\.vue$/,
          loader:'vue-loader',
          options:{
            loaders:{
              css:ExtractTextPlugin.extract({
                use:'css-loader',
                fallback:'vue-style-loader'
              })
            }
          }
        },
        {
          test:/\.js$/,
          loader:'babel-loader',
          exclude:/node_modules/
        },
        {
          test:/\.css$/,
          use:ExtractTextPlugin.extract({
              use:"css-loader",
              fallback:"style-loader"
          })
        },
        {
          //提取图片，小于1MB的自动打包为一个文件，减小请求次数
          test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader:'url-loader?limit=1024'
        }
      ]
    },
  //4、插件配置
    plugins:[
      new ExtractTextPlugin('main.css')
    ]
};

module.exports = config;


// 这四个点是webpack的基本配置，高级玩法也就是在这基础之上做文章
