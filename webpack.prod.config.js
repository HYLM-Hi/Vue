//用于生产环境的配置文件

const webpack = require('webpack');
//html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextplugin = require('extract-text-webpack-plugin');
//合并配置文件
const merge = require('webpack-merge');
//将上一个配置文件拿过来
const webpackBasseConfig = require('./webpack.config');

//先将它们清空
webpackBasseConfig.plugins=[];

//merge方法，基础的配置文件写在前面
module.exports = merge(webpackBasseConfig,{
  //出口，[hash]表示将入口文件命名为带有20位哈希值唯一的文件，可用做更新上线做实时缓存
  output:{
    publicPath:'/dist/',
    filename:[name].[hash].js
  },
  plugins:[
    new ExtractTextplugin({
      //true代表把所有分支里面的css都提取出来
      filename:'[name].[hash].css',
      allChunks:true
    }),
    //指定当前node运行的环境
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:'production'
      }
    }),
    //压缩js用的
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings:false
      }
    }),
    //通过html插件自动生成html文件
    new HtmlWebpackPlugin({
      //将会从index.ejs中读取模板，替换模板中css与js文件目录，最终保存在index_prod.html这个文件下
      filename:'../index_prod.html',
      template:'./index.ejs',
      inject:false
    })
  ]
})
