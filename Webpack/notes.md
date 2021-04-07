# 前端构建演变之路
<div align="left">
    <img src="./assets/images/build-evolution-process.png" width="600” alt="图片不存在" title="前端构建演变之路" />
</div>

# 为什么选择webpack
<div align="left">
    <img src="./assets/images/why-select-webpack.png" width="600” alt="图片不存在" title="前端构建演变之路" />
</div>

# 初识webpack
1. 配置⽂件名称：
    * webpack默认配置⽂件：webpack.config.js
    * webpack默认配置⽂件：webpack.config.js
2. webpack配置组成：
    ```js
    module.exports = {
        entry: './src/index.js', // 打包的⼊⼝⽂件
        output: './dist/main.js', // 打包的输出
        mode: 'production', // 环境
        module: {
            rules: [ // Loader配置
                { test: /\.txt$/, use: 'raw-loader' }
            ]
        },
        plugins: [ // 插件配置
            new HtmlwebpackPlugin({
                template: './src/index.html’
            })
        ]
    };
    ```

# 环境搭建：安装webpack
1. 安装Node.js和NPM：
    * 安装nvm（https://github.com/nvm-sh/nvm）
        * 通过curl安装：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
        * 通过wget安装：wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    * 安装Node.js和NPM
        * nvm install v10.15.3
        * 检查是否安装成功：node -v, npm -v
2. 环境搭建：安装webpack和webpack-cli
    * 创建空⽬录和package.json
        * `mkdir my-project`
        * `cd my-project`
        * `npm init -y`
    * 安装webpack和webpack-cli
        * `npm install webpack webpack-cli --save-dev`
        * 检查是否安装成功：`./node_modules/.bin/webpack -v`

# webpack初体验：⼀个最简单的例⼦
1. 创建webpack.config.js
    ```js
    'use strict'
    const path = require('path');

    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'dist'), // 指定打包生成的目录
            filename: 'bundle.js' // 指定打包生成的文件名
        },
        mode: 'production' // 设置为生产环境
    }
    ```
2. 创建./src/index.js、./src/helloworld.js文件
    ```js
    // helloworld.js
    export function helloworld() {
        return 'hello webpack';
    }

    // index.js
    import { helloworld } from './helloworld';

    document.write(helloworld());
    ```
3. 在package.json中添加build命令：
    * `"build": "./node_modules/.bin/webpack --config webpack.config.js"`
4. 执行`npm run build`
5. 在页面上验证效果
    * 在dist目录中手动创建index.html文件
    * 在index.html文件中引入打包好的bundle.js
    * 在浏览器中打开index.html

# webpack核心概念之entry
1. **entry⽤来指定webpack的打包⼊⼝**；
2. 单⼊⼝：entry是⼀个字符串；
    ```js
    module.exports = {
        entry: './src/app.js'
    };
    ```
3. 多⼊⼝：entry是⼀个对象；
    适合多页面场景；
    ```js
    module.exports = {
        entry: {
            app: './src/app.js',
            adminApp: './src/adminApp.js'
        }
    };
    ```

# webpack核心概念之output
1. **Output⽤来告诉webpack如何将编译后的⽂件输出到磁盘**；
2. 单⼊⼝配置：
    ```js
    module.exports = {
        entry: './path/to/my/entry/file.js'
        output: {
            filename: 'bundle.js’,
            path: __dirname + '/dist'
        }
    };
    ```
3. 多⼊⼝配置:
    ```js
    module.exports = {
    entry: {
        app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js', // 通过占位符确保⽂件名称的唯⼀
            path: __dirname + '/dist'
        }
    };
    ```

# webpack核心概念之loaders
1. **webpack开箱即用只支持JS和JSON两种文件类型**;
    * **通过Loaders去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中**;
    * 本身是一个函数，接受源文件作为参数，返回转换的结果；
2. 常见的Loaders：
    名称|描述
    |:-|:-|
    babel-loader|转换ES6、ES7等JS新特性语法
    css-loader|支持.css文件的加载和解析
    less-loader|将less文件转换成css
    ts-loader|将TS转换成JS
    file-loader|进行图片、字体等的打包
    raw-loader|将文件以字符串的形式导入
    thread-loader|多进程打包JS和CSS
3. Loaders的用法：
    ```js
    const path = require('path');
    module.exports = {
        output: {
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.txt$/, // test指定匹配规则
                    use: 'raw-loader' // use指定使⽤的loader名称
                }
            ]
        }
    };
    ```

# webpack核心概念之plugins
1. **plugins⽤于bundle⽂件的优化，资源管理和环境变量注⼊**；
    * 即任何Loaders无法做的事情，都可以通过plugins来完成：
        * 如：打包之前，删除dist目录可以通过plugins来完成；
    * plugins作⽤于整个构建过程，即构建开始到结束的过程，都是可以使用plugins的；
2. 常见的Plugins：
    名称|描述
    |:-|:-|
    CommonsChunkPlugin|将chunks相同的模块代码提取成公共js；<br />通常用在多页面的情况下，可以把每个页面公共的js提取处理，放到一个common.js文件中；
    CleanWebpackPlugin|清理构建目录
    ExtractTextWebpackPlugin|将CSS从bunlde文件里提取成一个独立的CSS文件
    CopyWebpackPlugin|将文件或者文件夹拷贝到构建的输出目录
    HtmlWebpackPlugin|创建html文件去承载输出的bundle
    UglfyjsWebpackPlugin|压缩JS
    ZipWebpackPlugin|将打包出的资源生成一个zip包
3. Plugins的⽤法：
    ```js
    const path = require('path');
    module.exports = {
        output: {
            filename: 'bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'})
        ]
    };
    ```

# webpack核心概念之mode
1. **mode⽤来指定当前的构建环境是：production、development、none**；
    * webpack4才提出的API；
    * 设置mode可以使⽤webpack内置的函数，默认值为production；
2. mode的内置函数功能
    选项|描述
    |:-|:-|
    development|设置process.env.NODE_ENV的值为development；<br />开启NamedChunksPlugin、NamedModulesPlugin（这两个插件是在代码热更新阶段（即hmr阶段）很有用，可以在控制台打印出是哪个模块发生了热更新，及这个模块的路径等）；
    production|设置process.env.NODE_ENV的值为production；<br />开启FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin、TerserPlugin；
    none|不开启任何优化选项；

# 解析ES6、React JSX
1. 解析ES6
    * `npm i @babel/core @babel/preset-env babel-loader -D`
    * babel的配置⽂件是：.babelrc；
        * 在.babelrc文件中增加ES6的babel preset配置，使用@babel/preset-env
        ```json
        {
            "presets": [ // 一系列babel plugins的集合
                "@babel/preset-env" // ES6的babel preset配置
            ],
            "plugins": [ // 一个plugin对应一个功能
                "@babel/proposal-class-properties"
            ]
        }
        ```
    * webpacke中使⽤babel-loader
        ```js
        const path = require('path');
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader'
                    }
                ]
            }
        };
        ```
2. 解析React JSX
    * `npm i react react-dom @babel/preset-react -D`
    * 在.babelrc文件中增加React JSX的babel preset配置
    ```json
    {
        "presets": [
            "@babel/preset-env", // ES6的babel preset配置
            "@babel/preset-react" // React的babel preset配置
        ],
        "plugins": [
            "@babel/proposal-class-properties"
        ]
    }
    ```
    * 测试：
        * 创建一个React组件，然后执行`npm run build`打包：
            ```js
            import React from 'react';
            import ReactDOM from 'react-dom';

            class Search extends React.Component {
                render() {
                    return <div>Search Text</div>;
                }
            }

            ReactDOM.render(
                <Search />,
                document.getElementById('root')
            );
            ```
        * 在dist目录创建一个search.html文件，引入打包好的search.js，并打开页面看效果：
            ```html
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="root"></div>
                <script src="./search.js" type="text/javascript"></script>
            </body>
            </html>
            ```
    * 为什么react和react-dom要分成两个包？
        * React在v0.14之前是没有react-dom的，所有功能都包含在react里；
        * 从v0.14(2015-10)开始，react才被拆分成react和react-dom；
        * 为什么要把react和react-dom分开呢？因为有了react-native；
        * **react只包含了Web和Mobile通用的核心部分**；
        * **负责Dom操作的分到react-dom中**；
        * **负责Mobile的包含在react-native中**；
        * 即**React不仅能用在Web页面，还能用在服务器端SSR，移动端和桌面端，而ReactDOM只负责和Web页面的DOM打交道**；
        ```js
        // Web端React代码
        import React from 'react';
        import ReactDOM from 'react-dom';
        const App = () => (
            <div>
                <h1>Hello React</h1>
            </div>
        );
        ReactDom.render(<App/>, document.getElementById('root'));

        // 移动端的ReactNative代码
        import React from 'react';
        import {Text, View} from 'react-native';
        const WelcomeScreen = () => (
            <View>
                <Text>Hello ReactNative</Text>
            </View>
        );

        // Web端、移动端都需要import React from 'react';
        // 而Web应用需要import ReactDOM from 'react-dom';
        // Mobile应用需要import {Text, View} from 'react-native';
        ```

# 解析CSS、Less、Sass
1. **css-loader⽤于加载.css⽂件，并且转换成commonjs对象**；
    * **style-loader将样式通过\<style>标签插⼊到head中**；
    * `npm i style-loader css-loader -D`
    ```js
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ // 这里webpack使用的是链式调用，从右到左的，即需要先调用的css-loader写在最后
                        'style-loader', // 将样式通过\<style>标签插⼊到head中
                        'css-loader' // ⽤于加载.css⽂件，并且转换成commonjs对象
                    ]
                }
            ]
        }
    };
    ```
    * 测试：
        * 创建search.css文件：
            ```css
            .search-text {
                font-size: 20px;
                color: red;
            }
            ```
        * 在search.js中引入search.css：
            ```js
            import React from 'react';
            import ReactDOM from 'react-dom';
            import './search.css';
            class Search extends React.Component {
                render() {
                    return <div className="search-text">Search Text</div>;
                }
            }
            ReactDOM.render(
                <Search />,
                document.getElementById('root')
            );
            ```
        * 在webpacke.config.js中配置style-loader、css-loader；
2. **less-loader⽤于将less转换成css**
    * `npm i less less-loader -D`，因为less-loader是依赖于less的，所以less也要安装
    * 测试：
        * 把search.css改成search.less；
        * 在search.js中引入search.less；
        * 在webpacke.config.js中增加对less的解析：
            ```js
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.less$/, // 增加对less的解析
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    }
                ]
            }
            ```

# 解析图片和字体
1. **file-loader⽤于处理图片**；
    * `npm i file-loader -D`
    ```js
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        }
    };
    ```
    * 测试：
        * 增加图片./assets/images/avatar.png
        * 在search.js中引入图片：
            ```js
            import React from 'react';
            import ReactDOM from 'react-dom';
            import avatar from './assets/images/avatar.png'; // 引入图片
            import './search.less';
            class Search extends React.Component {
                render() {
                    return <div className="search-text">
                        Search Text <img src={ avatar }/>
                    </div>;
                }
            }
            ReactDOM.render(
                <Search />,
                document.getElementById('root')
            );
            ```
        * 在webpacke.config.js中增加对图片的解析：
            ```js
            module: {
                rules: [
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                            'file-loader'
                        ]
                    }
                ]
            }
            ```
2. **file-loader⽤于处理字体**
    * `npm i file-loader -D`
    ```js
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        }
    };
    ```
    * 测试：
        * 增加字体./assets/font/SourceHanSerifSC-Heavy.otf
        * 在search.less文件中使用该字体：
            ```less
            @font-face {
                font-family: 'SourceHanSerifSC-Heavy';
                src: url('./assets/font/SourceHanSerifSC-Heavy.otf') format('truetype');
            }

            .search-text {
                font-size: 20px;
                color: red;
                font-family: 'SourceHanSerifSC-Heavy'
            }
            ```
        * 在webpacke.config.js中增加对字体的解析：
            ```js
            module: {
                rules: [
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        use: [
                            'file-loader'
                        ]
                    }
                ]
            }
            ```
* **url-loader也可以处理图⽚和字体**
    * 其实url-loader和file-loader差不多，只是url-loader可以设置较⼩资源⾃动base64；
    * url-loader内部其实是用到file-loader的；
    * limit的单位是字节，如果文件小于limit的值，那么webpack会自动对文件进行base64；
    * `npm i url-loader -D`
    ```js
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader', 
                            options: { 
                                limit: 10240 // 10k
                            }
                        }
                    ] 
                }
            ]
        }
    };
    ```
    * 测试：
        * 首先把上述在webpack.config.js配置的file-loader替换成url-loader：
            ```js
            module: {
                rules: [
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                            {
                                loader: 'url-loader', 
                                options: { 
                                    limit: 10240 // 10k
                                }
                            }
                        ] 
                    }
                ]
            }
            ```
        * 执行`npm run build`后，图片会自动base64，并放到search.js中，即dist目录不会单独有一个图片了；


[webpack官网](https://webpack.js.org/api/)