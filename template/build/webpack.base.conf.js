'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 获取绝对路径
function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

// eslint的规则
// const createLintingRule = () => ({
// 	// 对.js和.vue结尾的文件进行eslint检查
// 	test: /\.(js|vue)$/,
// 	// 使用eslint-loader
// 	loader: 'eslint-loader',
// 	// enforce的值可能是pre和post。其中pre有点和webpack@1中的preLoader配置含义相似。
// 	// post和v1中的postLoader配置含义相似。表示loader的调用时机
// 	// 这里表示在调用其他loader之前需要先调用这个规则进行代码风格的检查
// 	enforce: 'pre',
// 	// 需要进行eslint检查的文件的目录存在的地方
// 	include: [resolve('src'), resolve('test')],
// 	// eslint-loader配置过程中需要指定的选项
// 	options: {
// 		// 文件风格的检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
// 		formatter: require('eslint-friendly-formatter'),
// 		// 是否需要eslint输出警告信息
// 		emitWarning: !config.dev.showEslintErrorsInOverlay
// 	}
// })

// webpack基本的配置信息（开发环境和生产环境公共的配置）
module.exports = {
	// webpack解析文件时候的根目录(如果把webpack.config.js)放在了项目的根目录下面，这个配置可以省略
	context: path.resolve(__dirname, '../'),
	// webpack入口文件
	entry: {
		app: ['./src/main.js']
	},
	// webpack输出路径和命名规则
	output: {
		// webpack输出的目标文件夹路径（例如：/dist）
		path: config.build.assetsRoot,
		// webpack输出bundle文件命名格式
		filename: '[name].js',
		// webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
		// 输出解析文件的目录，url 相对于 HTML 页面(生成的html文件中，css和js等静态文件的url前缀)
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	// 模块resolve的规则
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		modules: [
			resolve('src'),
			resolve('node_modules')
		],
    	// 别名，方便引用模块，例如有了别名之后，
    	// import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
	},
	// 不同类型模块的处理规则
	module: {
		rules: [
			// ...(config.dev.useEslint ? [createLintingRule()] : []),
			{// 对所有.vue文件使用vue-loader进行编译
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig,
				include: [resolve('src')],
      			exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
			},
			{// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
				test: /\.js$/,
				// loader: 'babel-loader',
				//把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
				loader: 'happypack/loader?id=happyBabel',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
				//排除node_modules 目录下的文件
				exclude: /node_modules/
			},
			{// 对图片资源文件使用url-loader
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					// 小于10K的图片转成base64编码的dataURL字符串写到代码中
					limit: 10000,
					// 其他的图片转移到静态资源文件夹
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{// 对多媒体资源文件使用url-loader
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					// 小于10K的资源转成base64编码的dataURL字符串写到代码中
					limit: 10000,
					// 其他的资源转移到静态资源文件夹
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{// 对字体资源文件使用url-loader
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					// 小于10K的资源转成base64编码的dataURL字符串写到代码中
					limit: 10000,
					// 其他的资源转移到静态资源文件夹
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},

	plugins: [
		new HappyPack({
			//用id来标识 happypack处理那里类文件
		  id: 'happyBabel',
		  //如何处理  用法和loader 的配置一样
		  loaders: [{
			loader: 'babel-loader?cacheDirectory=true',
		  }],
		  //共享进程池
		  threadPool: happyThreadPool,
		//   cache: true,
		  //允许 HappyPack 输出日志
		  verbose: true,
		}),
		
		// 提取公共库
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./vendor-manifest.json')
		})
	],

	// 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
	// 这可以使最初为nodejs编写的代码可以在浏览器端运行
	node: {
		// 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
		// false表示什么都不提供。如果获取此对象的代码，可能会因为获取不到此对象而触发ReferenceError错误
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		// 设置成empty则表示提供一个空对象
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}
