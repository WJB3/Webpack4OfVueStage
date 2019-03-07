# Webpack4OfVueStage
>Created By **JishuBao** on **2019-03-06 12:38:22**  
>Recently revised in **2019-03-08 12:38:22**

&nbsp;

　　**欢迎大家来到技术宝的掘金世界,您的star是我写文章最大的动力！[GitHub地址](https://github.com/WJB2/Webpack4OfVueStage)**
　　
&nbsp;

　　**开篇点题:**
　　<br />
　　这是一篇使用webpack4搭建vue/react环境的文章，会详细的介绍每个插件的作用等...
　　<br />
　  　感觉不错的小伙伴，点赞star走一波;
　  <br />
　  　感觉文章有误的小伙伴，评论区、[QQ群](http://qm.qq.com/cgi-bin/qm/qr?k=BhM60jsO8NjCWBAVkUKJmAcjTy6iJLyY)走一波；
　  <br />
　  　虚心求教，不胜感激~
　  
# 一、Webpack概述
&emsp;**webpack是模块化管理工具，使用webpack可以对模块进行压缩、预处理、按需打包、按需加载等。**

# 二、webpack基本概念
&emsp;**在深入了解webpack之前我们先来了解几个相关概念(知道大家懒得看，就粗略的介绍下)：**
<br />
+ <font color=#A52A2A size=3 >Entry</font>:入口，Webpack执行构建的第一步将从Entry开始，可抽象成输入。
+ <font color=#A52A2A size=3>Module</font>:模块，在Webpack里一切皆模块，一个模块对应着一个文件。webpack会从配置的Entry开始递归找出所有依赖的模块。
+ <font color=#A52A2A size=3>Chunk</font>:代码块，一个Chunk由多个模块组合而成，用于代码合并与切割。
+ <font color=#A52A2A size=3>Loader</font>:模块转换器，用于把模块原内容按照需求转换成新内容。
+ <font color=#A52A2A size=3>Plugin</font>:扩展插件,在Webpack构建流程中的特定时机会广播出对应的时间，插件可以监听这些事件的发生,在特定时机做对应的事情。

# 三、webpack实操(小白入门级别)
&emsp;**肯定有小伙伴们百度过其他的文章，也肯定遇到过只夸夸而谈而不实际操作的博主，或者一些博主只是粗略的一笔带过，导致大家啥也没有收获，越看越迷糊，本文与那些不负责任的博主是不一样的(开个玩笑)，本文真刀真枪，实际操作，带小伙伴从零开始手动搭建一个webpack的开发环境，精细到新建文件夹级别(手动滑稽)，争取每一行代码大家看的见、理解的透彻！！**
## 新建个文件夹
&emsp;**首先新建一个文件夹，技术宝喜欢在E盘的MyProject目录下新建文件夹，取名叫做WebpackofVueStage，如下图所示：
![](https://user-gold-cdn.xitu.io/2019/3/6/16951a5d82288074?w=1087&h=675&f=png&s=70476)**

## 用编辑器打开文件夹
&emsp;**使用编辑器打开文件夹，我在这里使用的是VSCODE,这是微软推出的一款编辑器，非常好用，建议小伙伴们都可以来试试看哦~，如下图所示：**

![](https://user-gold-cdn.xitu.io/2019/3/6/16951b06008d2167?w=1528&h=943&f=png&s=175108)

## 在vscode终端中打开这个文件夹，即在这个文件夹下打开所在命令行，输入```npm init```，会生成一个```package.json```文件

![](https://user-gold-cdn.xitu.io/2019/3/6/16951b9b7aa85466?w=1528&h=943&f=png&s=187672)

## 内容如下

![](https://user-gold-cdn.xitu.io/2019/3/6/16951bb84d15ce31?w=613&h=270&f=png&s=24266)

# 四、在目录下新建文件
&emsp;**在主目录下新建build目录存放webpack相关配置文件、src目录存放源码目录包括资源文件、js、css文件等...,目录结构入下图所示，文件均为空，技术宝将带着大家一行行代码实现这"宏伟"的项目。**

![](https://user-gold-cdn.xitu.io/2019/3/6/16951c3b8c86c1ea?w=294&h=413&f=png&s=30393)

# 五、磨刀霍霍敲起来

**webpack相关文件的代码编写：此处将webpack文件分为三个文件**

## 1.webpack.base.conf.js(基础代码的编写)
```js
const path=require('path');
//利用require导入了node中path模块,path模块了一些处理文件路径的小工具，由于webpack是基于Node环境下的工具，所以可以直接使用node原生模块path
```

```js 
const SRC_PATH=path.resolve(__dirname,"../src")
//path.resolve()方法可以将路径或者路径片段解析成绝对路径，具体可以结合官方文档进行查看,综合来看，path.resolve()是一个修改和整合文件路径的方法，dirname是directory+name的缩写，故名思义，是文件名的意思。总的来说就是将绝对路径提取出来
```

```js
entry:{
    main:'./src/index.js'
}
//入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
```

&emsp;**本文以vue为例，首先安装需要安装的依赖包**
```js 
npm install vue -S
//-S即-save的缩写，包会写入dependencies，-D或者--save-d会写入devDepencies中
```
```js 
npm install webpack webpack-cli webpack-dev-server webpack-merge --save-dev
//webpack-cli是 webpack 的命令行工具。让我们可以不用写打包脚本，只需配置打包配置文件，然后在命令行输入 webpack-cli --config webpack.config.js 来使用 webpack, 简单很多。webpack 4 之前命令行工具是集成在 webpack 包中的，4.0 开始 webpack 包本身不再集成 cli。webpack-dev-server用于开发调试，它提供了web服务、热更新、接口代理等支持。webpack-merge提供了一个merge连接数组并合并创建新对象的对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值包装在函数中。
```

```js
resolve:{
        extensions:['.vue','.js'],
        alias:{
            '@':SRC_PATH
        }
},
//Resolve 配置 Webpack 如何寻找模块所对应的文件,extensions:在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。alias: 配置项通过别名来把原导入路径映射成一个新的导入路径。 
```
```js
module:{
        rules:[
            {
                test:/\.vue$/,//通过loader来预处理文件 允许你打包除了js之外的任何静态资源
                use:'vue-loader'
            },
            {
                test:/\.js?$/,
                use:'babel-loader',
                //排除node_modules目录下的文件
                exclude:/node_modules/,
                include:SRC_PATH
            },
            {
                test:/\.(woff|svg|eot|woff2|tff)$/,
                use:[
                    {
                        loader:'url-loader',
                        include: [resolve('src')],
                        options:{
                            limit:10000
                        }
                    }
                ],
                exclude:/node_modules/,
            }
        ]
    },
```
**如上：需要安装图示对应的loader**
```js
 npm install vue-loader babel-loader url-loader --save-dev
//rules是module的属性，指定模块解析规则，而use是每一个rule的属性，指定要用什么loader。vue-loader：解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。babel-loader用于将ES6转化为ES5等功能。url-loader他可以将html以及css中的图片打包成base64，但是js中如果有图片url并不能编译成功。用于减少http请求实现性能优化。
```

## 当使用vue-loader时，请确保您已经引入vue的插件
```js 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
plugins:[
        new VueLoaderPlugin(),
        //它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
]
```
### 至此基础webpack文件已经搭建好，以下是webpack.base.conf.js的完整代码：
```
const path=require('path');
//path是node.js的一个模块，提供了一些用于处理文件路劲的小工具
const SRC_PATH=path.resolve(__dirname,"../src");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
    entry:{
        main:"./src/index.js"//入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
    },
    resolve:{
        extensions:['.vue','.js'],
        alias:{
            '@':SRC_PATH
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,//通过loader来预处理文件 允许你打包除了js之外的任何静态资源
                use:'vue-loader'
            },
            {
                test:/\.js$/,
                use:'babel-loader',
                //排除node_modules目录下的文件
                exclude:/node_modules/,
                include:SRC_PATH
            },
            {
                test:/\.(woff|svg|eot|woff2|tff)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000
                        }
                    }
                ],
                exclude:/node_modules/,
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        //它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    ]

}
```
## 2.webpack.dev.conf.js的编写(开发环境)
```js
const webpack=require('webpack');
//require工作原理:首先确定是否是一个原生的模块,如果不是就进入node_modules查找,再看是否在package.json的main里面定义。
```
```js
const merge=require('webpack-merge');
//webpack-merge提供了一个merge连接数组并合并创建新对象的函数。
```
```js
const baseWebpackConfig=require('./webpack.base.conf.js');
//引入基础webpack设置。
```
```js
const HtmlWebpackPlugin=require('html-webpack-plugin');
//这是一个webpack插件，可以简化HTML文件的创建，为您的webpack捆绑服务提供服务。这对于webpack在文件名中包含哈希的包很有用，这些哈希值会更改每个编译。基本作用就是生成HTML。
```
```js
const derServerPort=10000;
//开发环境的端口号。
```
```js
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。(友好的提示插件)。
```
```js
npm install friendly-errors-webpack-plugin html-webpack-plugin --save-dev
//安装上述代码所需要的依赖
```
```js
mode:'development'
//开发环境,会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
```
```js
devtool:'cheap-module-eval-source-map'
//不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。.
```
```js
module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(sc|sa)ss$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"sass-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"less-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                        }
                    }
                ]
            }
        ]
    },
//直接来说是把对应后缀名转化为css文件
```
```js
npm install style-loader css-loader sass-loader less-loader postcss-loader file-loader --save-dev
//使用style-loader通过注入<style>标记将CSS添加到DOM。css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。sass-loader:将 Sass 编译成 CSS。less-loader:将less转化为css。postcss-loadercss3属性已经给加上了浏览器前缀,file-loader与file-loader类似。
```
```
devServer:{
        port:derServerPort,//指定要监听请求的端口号
        overlay:{//当编译器存在错误或警告时,将浏览器显示全屏覆盖
            warnings:false,
            errors:true,
        },
        host:"localhost",
        open:true,//开发服务器将打开浏览器
        noInfo:true,//那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        https:false,
        hot:true,//启用webpack的模块热更新
        compress:true,//一切服务都启用gzip压缩
        progress:true,//将任务进度输出到控制台
        quiet:true,
        useLocalIp:false,//此选项允许浏览器使用你的本地ip打开
        proxy:{//代理服务器
            "/api":{
                target:"http://localhost:8080",
                changeOrigin:true,
                pathRewrite:{"^api":"/api"}
            }
        }
    },
    //以上为webpack开发模式下的代码片段
```
```js
plugins:[
        //处理html
        new HtmlWebpackPlugin({
            template:'src/public/index.html',//开发环境需要路径
            inject:'body',//所有javascript资源将被放置在body元素的底部
            minify:{
                html5:true,
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            title:'基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(development开发环境)',
            hash:true,
            favicon:'src/assets/favicon-shield.ico',//将给定的favicon路径添加到输出HTML
            showErrors:true,
        }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${derServerPort}`],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function (severity, errors) {},
            clearConsole: true,
            additionalFormatters: [],
            additionalTransformers: []
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
            }
        })
    ]
    //开发环境下的插件配置
```
### 至此开发环境下的webpack已搭好，webpack.dev.conf.js文件完整代码如下：
```js
const webpack=require('webpack');
//require工作原理:首先确定是否是一个原生的模块,如果不是就进入node_modules查找,再看是否在package.json的main里面定义。
const merge=require('webpack-merge');
//webpack-merge提供了一个merge连接数组并合并创建新对象的函数
const baseWebpackConfig=require('./webpack.base.conf.js');
//引入基础webpack设置
const HtmlWebpackPlugin=require('html-webpack-plugin');
const derServerPort=10000;
//基本作用就是生成html文件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//友好的提示

module.exports=merge(baseWebpackConfig,{
    mode:'development',//开发环境,会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
    devtool:'cheap-module-eval-source-map',//不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(sc|sa)ss$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"sass-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"less-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        port:derServerPort,//指定要监听请求的端口号
        overlay:{//当编译器存在错误或警告时,将浏览器显示全屏覆盖
            warnings:false,
            errors:true,
        },
        host:"localhost",
        open:true,//开发服务器将打开浏览器
        noInfo:true,//那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        https:false,
        hot:true,//启用webpack的模块热更新
        compress:true,//一切服务都启用gzip压缩
        progress:true,//将任务进度输出到控制台
        quiet:true,
        useLocalIp:false,//此选项允许浏览器使用你的本地ip打开
        proxy:{//代理服务器
            "/api":{
                target:"http://localhost:8080",
                changeOrigin:true,
                pathRewrite:{"^api":"/api"}
            }
        }
    },
    plugins:[
        //处理html
        new HtmlWebpackPlugin({
            template:'src/public/index.html',//开发环境需要路径
            inject:'body',//所有javascript资源将被放置在body元素的底部
            minify:{
                html5:true,
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            title:'基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(development开发环境)',
            hash:true,
            favicon:'src/assets/favicon-shield.ico',//将给定的favicon路径添加到输出HTML
            showErrors:true,
        }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${derServerPort}`],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function (severity, errors) {},
            clearConsole: true,
            additionalFormatters: [],
            additionalTransformers: []
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                // postcss:[
                //     require('postcss-plugin-px2rem')({
                //         rootValue:75,
                //         selectorBlackList:['html'],
                //         mediaQuery:true,
                //         propBlackList:['75px']
                //     })
                // ],
            }
        })
    ]
});
```

## 3.webpack.prod.conf.js代码的编写(生产环境)
**与上文中代码相同不再赘述**
```js
const path=require('path');
const DIST_PATH=path.resolve(__dirname,"../dist");
const CleanWebpackPlugin=require('clean-webpack-plugin');
//打包之前清除文件
```
```js
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//分析打包后的包体积大小等
```
```js
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
//分离css
```
```js
 mode:"production"
 //会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
```
```js
output:{
        filename:"js/[name].[hash].js",
        path:DIST_PATH
},
```
```js
module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(sc|sa)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:"sass-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:'less-loader'},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                            name:"[hash].[ext]",
                            outputPath:"images/"
                        }
                    }
                ]
            }
        ]
    },
    //与开发模式下基本相同,MiniCssExtraPlugin插件分离css文件
```
```js
plugins:[
        new CleanWebpackPlugin(['dist'],{root:path.resolve(__dirname,'../'),verbose:true}),//每次打包前清除dist
        new HtmlWebpackPlugin({
            //将目录下的index.html引进生成的dist中的index.html
            template:'src/public/index.html',
            title:'基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(product生产环境)',
            favicon:'src/assets/favicon-shield.ico',
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            },
            
        }),
        new BundleAnalyzerPlugin({//打包分析
            analyzerPort:10000,
            openAnalyzer:true,
        }),
        new MiniCssExtractPlugin({//分离css
            filename:"css/[name].[chunkhash:8].css",
            chunkFilename:"css/[id].[hash]css"
        })
    ]
```

### 至此webpack生产环境已经搭建完成，完整代码如下：
```js
const merge=require('webpack-merge');
const baseWebpackConfig=require('./webpack.base.conf.js');
const webpack=require('webpack');
const path=require('path');
const DIST_PATH=path.resolve(__dirname,"../dist");
//打包之前清除文件
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
//打包的时候分析包大小等
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//分离css
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports=merge(baseWebpackConfig,{
    mode:"production",//会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    devtool:'cheap-module-source-map',//不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。
    output:{
        filename:"js/[name].[hash].js",
        path:DIST_PATH
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(sc|sa)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:"sass-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:'less-loader'},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                            name:"[hash].[ext]",
                            outputPath:"images/"
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist'],{root:path.resolve(__dirname,'../'),verbose:true}),//每次打包前清除dist
        new HtmlWebpackPlugin({
            //将目录下的index.html引进生成的dist中的index.html
            template:'src/public/index.html',
            title:'基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(product生产环境)',
            favicon:'src/assets/favicon-shield.ico',
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            },
            
        }),
        new BundleAnalyzerPlugin({//打包分析
            analyzerPort:10000,
            openAnalyzer:true,
        }),
        new MiniCssExtractPlugin({//分离css
            filename:"css/[name].[chunkhash:8].css",
            chunkFilename:"css/[id].[hash]css"
        })
    ]
});
```

## src相关文件的代码编写
&emsp;**如上述，我们已经完成了与webpack相关的代码编写。接下来就是源码相关的编写了在上面敲的代码中我们会发现例如index.js、index.html等都未进行代码的编写，接下来我们就要完善这部分的代码。Are you ready?**

### 1.首先准备css图标图片favicon-shield.ico(ico后缀是图表图片格式),放入assets文件夹

![](https://user-gold-cdn.xitu.io/2019/3/6/169526178d64fd6d?w=45&h=44&f=png&s=1586)

### 2.index.html模板文件的编写，放入public文件夹下
```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
        <title>
            <%= htmlWebpackPlugin.options.title %>
        </title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### 3.入口文件index.js的编写，放入src根目录下：
```js
import Vue from 'vue';
//在import Vue的过程中Vue主要是在原型上完成方法的挂载，并且初始化了全局的API。
import App from './App.vue';//引入vue页面(稍候书写)
import './styles/reset.css';//引入样式重置

Vue.config.productionTip=false;//阻止启动生产消息，常用作指令

new Vue({
    el:"#root",//将渲染结果挂在这id为root的html上
    render:h=>h(App),//render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
});
```
**解析vue template 标签要安装制定依赖**
```js
npm install vue-template-compiler --save-dev
```

### 4.在src目录下编写app.vue页面
```js
<template>
    <div class="container"><span>{{msg}}</span></div>
</template>

<script>
export default {
    data(){
        return{
            msg:'webpack4搭建react环境基本完成，是不是很简单呢'
        }
    }
}
</script>

<style>
.container{
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:20px;
    color:red;
    box-shadow:5px 5px 5px 5px;
}
</style>
```

### 5.编写样式文件reset.css

```js
/* 
  * reset 的目的不是让默认样式在所有浏览器下一致，而是减少默认样式有可能带来的问题。
  * The purpose of reset is not to allow default styles to be consistent across all browsers, but to reduce the potential problems of default styles.
  * create by jsliang
*/

/** 清除内外边距 - clearance of inner and outer margins **/
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* 结构元素 - structural elements */
dl, dt, dd, ul, ol, li, /* 列表元素 - list elements */
pre, /* 文本格式元素 - text formatting elements */
form, fieldset, legend, button, input, textarea, /* 表单元素 - from elements */
th, td /* 表格元素 - table elements */ {
  margin: 0;
  padding: 0;
}

/*默认初始化样式*/
body{
  margin:0;padding:0;font-size:"微软雅黑";box-sizing: border-box;
}

body,html{
  text-size-adjust: none;/*文本不会随着设备尺寸的变化而变化*/
  width:100%;
  height:100%;
}

*{text-decoration: none;list-style:none;}

img{border:0px;}

/** 设置默认字体 - setting the default font **/
body, button, input, select, textarea {
  font: 18px/1.5 '黑体', Helvetica, sans-serif;
}
h1, h2, h3, h4, h5, h6, button, input, select, textarea { font-size: 100%; }

/** 重置列表元素 - reset the list element **/
ul, ol { list-style: none; }

/** 重置文本格式元素 - reset the text format element **/
a, a:hover { text-decoration: none; }

/** 重置表单元素 - reset the form element **/
button { cursor: pointer; }
input { font-size: 18px; outline: none; }

/** 重置表格元素 - reset the table element **/
table { border-collapse: collapse; border-spacing: 0; }

/** 图片自适应 - image responsize **/
img { border: 0; display: inline-block; width: 100%; max-width: 100%; height: auto; vertical-align: middle; }

/* 
    * 默认box-sizing是content-box，该属性导致padding会撑大div，使用border-box可以解决该问题
    * set border-box for box-sizing when you use div, it solve the problem when you add padding and don't want to make the div width bigger
*/
div, input { box-sizing: border-box; }

/** 清除浮动 - clear float **/
.jsbao-clear:after, .clear:after {
  content: '\20';
  display: block;
  height: 0;
  clear: both;
}
.jsbao-clear, .clear {
  *zoom: 1;
}

/** 设置input的placeholder - set input placeholder **/
input::-webkit-input-placeholder { color: #919191; font-size: .26rem } /* Webkit browsers */
input::-moz-placeholder { color: #919191; font-size: .26rem } /* Mozilla Firefox */
input::-ms-input-placeholder { color: #919191; font-size: .26rem } /* Internet Explorer */
```

### 6.配置package.json文件
```js
npm install cross-env --save-dev
//解决webpack命令设置node_env=development无反应等 可跨平台使用
```
**在package.json中的scripts标签中写入**

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "cross-env webpack-dev-server --config build/webpack.dev.conf.js",
    "build": "cross-env webpack --config build/webpack.prod.conf.js"
 },
```

### 7.关于babel
&emsp;**大家都知道babel在编程中的重要性,当然搭建Vue环境也是不可缺少的,让我们看看常用的babel都有哪些呢(新版本已出,本文全线升级成babel 7.x以上)**
#### @babel/core:@babel/core的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。
```js
npm install @babel/core@7.1.2 --save-dev
```
### @babel/plugin-proposal-class-properties的作用是把es6的类转化为浏览器可读的
```js
npm install @babel/plugin-proposal-class-properties@7.1.0 --save-dev
```
### @babel/plugin-proposal-decorators的作用是把装饰器转为为未浏览器可读的
```js
npm install @babel/plugin-proposal-decorators@7.1.6 --save-dev
```
### @babel/plugin-proposal-function-bind的作用是把：：作用于绑定符转化未浏览器可读的
```js
npm install @babel/plugin-proposal-function-bind@7.0.0 --save-dev
```

### @babel/plugin-syntax-dynamic-import的作用是支持promise和数组的迭代相关的方法
```js
npm install @babel/plugin-syntax-dynamic-import@7.0.0 --save-dev
```
### @babel/plugin-transform-runtime的作用会自动polyfill es5不支持的特性
```js
npm install @babel/plugin-transform-runtime@7.1.0 --save-dev
```
### @babel/polyfill:这个库将会模拟一个完全的 ES2015+ 的环境。这意味着你可以使用 新的内置语法 比如 promise 或者 WeakMap， 静态方法比如Array.from 或 Object.assign, 实例方法 比如 Array.prototype.includes 和 generator 函数。
```js
npm install @babel/polyfill@7.2.5 --save-dev
```
### @babel/preset-env是一个智能预设，允许您使用最新的JavaScript，
```js
npm install @babel/preset-env@7.1.6 --save-dev
```
### @babel/preset-react:转化react中jsx的写法
```js
npm install @babel/preset-react@7.0.0 --save-dev
```
### @babel/preset-stage-0:同env
```js
npm install @babel/preset-stage-0@7.0.0 --save-dev
```
### @babel/runtime:同@babel/polyfill
```js
npm install @babel/runtime@7.2.0 --save-dev
```
**安装了这些babel以后，需要有个文件进行标识，src目录下新建.babelrc**
```js
{
    "presets":[
        ["@babel/preset-env", {
            "modules": false,
            "targets": {
              "browsers": ["> 1%", "last 2 versions", "ie >= 10"]
            },
            "useBuiltIns": "usage"
        }],
        "@babel/preset-react"
    ],
    "plugins":[
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties",{"loose":true}],
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```


### 8.关于外部postcss.config.js的设置
**因为你在loader 中引用了插件，但是没有指明是谁的插件，需要制定一个ident，唯一标识。**
<br/>
**src目录下新建postcss.config.js文件**
```js
//自动添加css兼容属性
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 10 versions"
            ]
        })
    ]
};
```
```js
npm install autoprefixer --save-dev
//，就是自动补全css前缀的东西
```

# 六、项目运行
**是不是和我一样看的很累呢，第一次写文章很多地方没有特别注意，希望下次可以越来越好吧**
**扯了那么多，不看效果等于耍流氓！！！
**命令行执行npm run start/npm start**
**浏览器会自动弹出，建议你用谷歌(手动滑稽)**
<br />
**效果图：**

![](https://user-gold-cdn.xitu.io/2019/3/6/16952c0185d07d2a?w=1817&h=876&f=png&s=314724)

**还是特别的丑 只有一行字 且垂直居中 不过咱们主要目的不是为了搭建webpack嘛！！！觉得此篇文章对你有用的画不要忘了给我的git一个赞哦！！！**

# 七、webpack运行原理
&emsp;**Webpack的运行流程是一个串行的过程，从开始到结束后回依次执行以下流程：**
### 流程概括:
+ **1.初始化参数：从配置文件和shell语句中读取与合并参数，得出最终的参数**
+ **2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；**
+ **3.确定入口：根据配置中的 entry 找出所有的入口文件；**
+ **4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；**
+ **5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；**
+ **6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；**
+ **7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。**

### 流程细节:
**Webpack 的构建流程可以分为以下三大阶段：**
+ **初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。**
+ **编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。**
+ **输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。**

**如果只执行一次构建，以上阶段将会按照顺序各执行一次。但在开启监听模式下，流程将变为如下：**

**如果你觉得我的文章还不错的话，可以给个star哦~，[GitHub地址](https://github.com/WJB2/Webpack4OfVueStage)**

**下一步计划是用<font color=skyblue>Vue-router+Vuex+Vant</font>写一个简易demo**
