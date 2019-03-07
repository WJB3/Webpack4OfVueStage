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