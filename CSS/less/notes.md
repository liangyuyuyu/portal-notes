# CSS的短板与预处理语言的诞生
1. CSS作为一门标记性语言，简单易懂，但毫无逻辑，不像编程该有的样子；
2. 在CSS语法更新时，每当有新属性提出，浏览器的兼容就会成为绊脚石；
3. 为了让CSS富有逻辑性，短板不那么严重，涌现出了一些预处理语言:Sass、Less、Stylus等；
4. **预处理语言让CSS彻底变成了一门可以使用变量、循环、继承、自定义方法等多种特性的标记语言，逻辑性大大增强**；

# 几种预处理语言
1. Sass诞生于2007年，Ruby编写，其语法功能都十分全面，可以说它完全把CSS变成了一门编程语言；  
    另外它在国内外都很受欢迎，并且它的项目团队很是强大，是一款十分优秀的预处理语言；
2. Stylus诞生于2010年，来自Node.js社区，语法功能也和Sass不相伯仲，是一门十分独特的创新型语言；
3. Less诞生于2009年，受Sass的影响创建的一个开源项目；
    * 它扩充了CSS语言，增加了诸如变量、混合、函数等功能，让CSS更易维护、方便制作主题、扩充；

# 选择那种预处理语言
这是一个十分纠结的问题，在我看来，这就好比找女朋友，有人喜欢贤惠安静的，就有人喜欢活泼爱闹的，各有各的爱好，可晚上闭灯后其实都差不多，所以你不用太过纠结；
1. **Sass与stylus相比于Less功能更为丰富**；
2. **对于学习成本、适应时间，Less稍胜一筹**；
3. **Less没有去掉任何CSS的功能，而是在现有的语法上，增添了许多额外的功能特性**，所以学习Less是一件非常舒服的事情；

# Less的定义
1. Less是Leaner Style Sheets的缩写；
2. Less是一门向后兼容的CSS拓展语言；
3. **Less是一门CSS预处理器语言，它扩展了CSS语言，增加了变量、Mixin、函数等特性，使CSS更易于维护和扩展**；
4. Less可以运行在Node或浏览器端；
5. Less仅对CSS语言增加了少许方便的扩展，这也是Less易学的原因之一；

# Less的使用方式
1. 在Node.js环境中使用Less:
    * npm安装Less库,将Less解析成CSS：
        ```
        npm install less -g
        lessc -v
        lessc styles.less ./dist/styles.css
        ```
    * 安装less-plugin-clean-css插件，压CSS文件:
        ```
        npm install less-plugin-clean-css -g
        lessc --clean-css styles.less ./dist/styles.min.css
        lessc --clean-css="advanced" styles.less ./dist/styles.min.css
        ```
2. 在浏览器环境中使用Less:
    ```html
    <link rel="stylesheet/less" type="text/css" href="styles.less" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js"></script>  <!-- 在Less文件之后引入-->
    ```
3. less-loader:

# Less为CSS增加的特性
1. 变量（Variables）：
    **以@开头定义变量**；
    * 值变量：
        ```less
        @value-var-color: #000000;
        #value-var-test {
        color: @value-var-color;
        }
        ```
    * 选择器变量：
        ```less
        @selector-var-id: #head;
        @selector-var-name: head;
        @{selector-var-id} { // 变量名必须使用{}包裹
            color:#FFFFFF;
        }
        #@{selector-var-name} {
            color:#FFFFFF;
        }
        ```
    * 属性变量：
        ```less
        @attr-var: color;
        @value-var-color:#f00000;
        .attr-var-test {
            @{attr-var}: @value-var-color; // 变量名必须使用{}包裹
        }
        ```
    * url变量：
        ```less
        @url-var-path: './assets/images' ;
        .url-var-test {
            background: url( '@{url-var-path}/icon.png' );
        }
        ```
    * 声明变量：
        ```less
        @declaration-var: { background: #0f0000 }
        .declaration-var-test {
            @declaration-var();
        }
        ```
    * 变量运算：Less的变量运算十分强大；
        * 加减运算：以第一个数据的单位为基准；
        * 乘法运算：注意单位一定要统一;
        ```less
        @var-calc-width: 50px;
        @var-calc-color: #222;
        .var-calc-test {
            width: (@var-calc-width - 10)* 2;
            color: @var-calc-color * 3 - 1;
            background-color: @var-calc-color + #333;
        }
        ```
    * 变量作用域：**就近原则**，不要给我提闭包；
        ```less
        @var-scope-color: red;
        #var-scope-test {
            @var-scope-color: white;
            #header {
                color: @var-scope-color; // white
            }
        }
        #var-scope-test {
            color: @var-scope-color; // red  
        }
        ```
    * 用变量定义变量：
        ```less
        @var-define-var-content: 'I am Less';
        @var-define-var-tmp: 'var-define-var-content';
        .var-define-var-test::after {
            content:@@var-define-var-tmp;//两个@
        }
        ```
2. 混合方法（Mixins）  
    **Mixins是一种将一组属性从一个规则集包含/混入到另一个规则集的方法**；
    * 无参数方法：
        ```less
        .mixins-class() {
            border: 1px solid red;
        }
        #mixins-id() {
            font-size: 12px;
        }

        .mixins-class-test {
            color:#ff0000;
            .mixins-class(); // 通过.className混入
        }
        .mixins-id-test {
            color: #404040;
            #mixins-id(); // 通过#idName混入
        }
        ```
    * 默认参数方法：
        * Less可以使用默认参数；
        * **@arguments**犹如JS中的arguments指代的是全部参数；
        * **传的参数中必须带着单位**；
        ```less
        .default-params-border(@a:10px, @b:50px, @c:30px, @color:#000){
            border:solid 1px @color;
            box-shadow: @arguments; // 指代的是全部参数
        }
        #main{
            .default-params-border(0px,5px,30px,red); // 必须带着单位
        }
        #wrap{
            .default-params-border(0px);
        }
        #content{
            .default-params-border; // 等价于.border()
        }
        ```
    * 方法的匹配模式：
        * 与面向对象中的多态很相似；
        * **通过第一个参数找到匹配程度最高的方法**，如果匹配程度相同，将全部选择，并存在着样式覆盖替换；
        * **如果匹配的参数是变量，则将会匹配**，如 `@_` ；
        ```less
        .triangle(top, @width: 20px, @color: #000){
            border-color: transparent  transparent @color transparent ;
        }
        .triangle(right, @width: 20px, @color: #000){
            border-color: transparent @color transparent  transparent ;
        }
        .triangle(bottom, @width: 20px, @color: #000){
            border-color: @color transparent  transparent  transparent ;
        }
        .triangle(left, @width: 20px, @color: #000){
            border-color: transparent  transparent  transparent @color;
        }
        .triangle(@_, @width: 20px, @color: #000){
            border-style: solid;
            border-width: @width;
        }

        #main{
            .triangle(left, 50px, #999)
        }
        ```
    * 方法的命名空间：  
        让方法更加规范；
        * 在CSS中用`>`选择器选择子元素，就是必须与父元素有直接血源的元素；
        * **在引入命令空间时，如使用`>`选择器，父元素不能加括号**;
        * 不得单独使用命名空间中的方法 必须先引入命名空间，才能使用其中方法；
        * **子方法可以使用上一层传进来的方法**；
        ```less
        #namespace-card() {
            background: #723232;

            .d(@w: 300px) {
                width: @w;

                #a(@h: 300px) {
                    height: @h;
                    width: @w + 1;
                }
            }
        }

        #wrap {
            // 调用#a()方法时，父元素不能加括号；
            // 下面会报错，@w为underfined，需要先调用.d()
            // #namespace-card > .d > #a(100px);
            #namespace-card > .d;
            #a(100px);
        }
        #main {
            #namespace-card .d();
        }
        #con {
            //不得单独使用命名空间的方法
            //.d() 如果前面没有引入命名空间 #namespace-card ，将会报错
            
            #namespace-card; // 等价于 #namespace-card();
            .d(20px); // 必须先引入 #namespace-card
        }
        ```
    * 方法的条件筛选：  
        Less没有if else，可是它有when；
        * 比较运算符：> >= = =< <；
        * 除去关键字true以外的值都被视为false；
        ```less
        #condition-filters {
            // and运算符（与运算）
            .border(@width, @color, @style) when (@width > 100px) and (@color = #999) {
                border: @style @color @width;
            }
            // not运算符（非运算）
            .background(@color) when not (@color >= #222) {
                background: @color;
            }
            // , 逗号分隔符（或运算）
            .font(@size: 20px) when (@size > 50px) , (@size < 100px) {
                font-size: @size;
            }
        }

        #condition-test {
            #condition-filters > .border(200px, #999, solid);
            #condition-filters .background(#111);
            #condition-filters > .font(40px);
        }
        ```
    * 数量不定的参数：  
        Less方法接受数量不定的参数，可以使用...，犹如ES6的扩展运算符；
        ```less
        .indefinite-param-box(...) {
            box-shadow: @arguments;
        }
        .indefinite-param-text(@a, ...) {
            width: @a;
            text-shadow: @arguments;
        }

        #indefinite-param-test {
            .indefinite-param-box(1px,4px,30px,red);
            .indefinite-param-text(1px,4px,30px,red);
        }
        ```
    * 方法使用!important：
        ```less
        .important-param {
            border: solid 1px red;
            margin: 50px;
        }

        #important-test {
            .important-param() !important;
        }
        ```
    * 循环方法：  
        Less没有提供for循环功能，但这难不倒聪明的程序员，使用递归去实现；
        ```less
        .for-var-columns(4);
        .for-var-columns(@n, @i: 1) when (@i =< @n) {
            .column-@{i} {
                width: (@i * 100% / @n);
            }
            .for-var-columns(@n, (@i + 1));
        }
        ```
    * 属性拼接方法：
        * “+”代表逗号
            ```less
            .attr-splicing-comma() {
                box-shadow+: inset 0 0 10px #555;
            }

            .attr-splicing-comma-test {
                .attr-splicing-comma();
                box-shadow+: 0 0 20px black;
            }

            // 生成后的CSS
            .attr-splicing-comma-test {
                box-shadow: inset 0 0 10px #555, 0 0 20px black;
            }
            ```
        * “+_”代表空格
            ```less
            .attr-splicing-space() {
                transform+_: scale(2);
            }

            .attr-splicing-space-test {
                .attr-splicing-space();
                transform+_: rotate(15deg);
            }
            ```
        * 实战技巧：使用方法中定义的变量；
        ```less
        .return-var(@x, @y) {
            @average: ((@x + @y) / 2);
        }
        
        .return-var-test {
            .return-var(16px, 50px); // 调用 方法
            padding: @average; // 使用返回值
        }
        ```
3. 嵌套（Nesting）
    * **Less提供了使用嵌套代替层叠或与层叠结合使用的能力**；
    * 使用Less嵌套书写的CSS更加整洁，并且它模仿的是HTML的组织结构；
        ```less
        #nesting-test {
            color:#00ff00;
            div {
                color:#0000ff;
                span {
                    font-size: 12px;
                }
            }
        }
        ```
    * &的妙用：&表示上一层选择器的名字；
        ```less
        #nesting-use-test {
            &::after {
                color:#ffff00;
            }
            .header {
                &-content { // 解析成CSS为: #nesting-use-test .header-content
                    color:#0ffff0;
                }
            }
        }
        ```
    * 媒体查询:
        * 以前，我们使用媒体查询，都要把一个元素分开写的，如下所示：
            ```css
            #wrap{
                width:500px;
            }
            @media screen and (max-width:768px){
                #wrap{
                    width:100px;
                }
            }
            ```
        * 如今，Less提供了一个十分便捷的方式，如下所示：
            ```less
            #main{
                @media screen{
                    @media (max-width:768px){
                        width:100px;
                    }
                }
                @media tv {
                    width:2000px;
                }
            }
            ```
            注：唯一的缺点是：每一个元素都会编译出自己@media声明，并不会合并；
4. 继承  
    **extend是Less的一个伪类，它可继承所匹配声明中的全部样式**；
    * extend关键字的使用：
        ```less
        .extend-container {
            transition: all .3s ease-out;
            .hide {
                transform: scale(0);
            }
        }
        #extend-test-main {
            &:extend(.extend-container);
        }
        #extend-test-con {
            &:extend(.extend-container .hide);
        }

        // 生成后的CSS
        .extend-container,
        #extend-test-main {
            transition: all 0.3s ease-out;
        }
        .extend-container .hide,
        #extend-test-con {
            transform: scale(0);
        }
        ```
    * all全局搜索替换：  
        使用选择器匹配到的全部声明；
        ```less
        #extend-all {
            width: 200px;
        }
        #extend-all {
            &::after {
                content:"Less is good!";
            }
        }

        #extend-all-test:extend(#extend-all all) {}

        // 生成后的CSS
        #extend-all,
        #extend-all-test {
            width: 200px;
        }
        #extend-all::after,
        #extend-all-test::after {
            content: "Less is good!";
        }
        ```
    * 减少代码的重复性
        从表面看来，extend与方法最大的差别是：
        * **extend是同个选择器共用同一个声明**；
        * **方法是使用自己的声明**，这无疑增加了代码的重复性，如下所示；
        ```less
        .Method {
            width: 200px;
            &::after {
                content: "Less is good!";
            }
            .hide {
                transform: scale(0);
            }
        }
        
        #extend-test-main:extend(.Method all) {}
        #extend-test-wrap:extend(.Method all) {}

        #method-test-main {
            .Method;
        }
        #method-test-wrap {
            .Method;
        }

        // extend生成后的CSS，复用了重复的代码
        .Method,
        #extend-test-main,
        #extend-test-wrap {
            width: 200px;
        }
        .Method::after,
        #extend-test-main::after,
        #extend-test-wrap::after {
            content: "Less is good!";
        }
        .Method .hide,
        #extend-test-main .hide,
        #extend-test-wrap .hide {
            transform: scale(0);
        }

        // 方法生成后的CSS，没有复用了重复的代码
        #method-test-main {
            width: 200px;
        }
        #method-test-main::after {
            content: "Less is good!";
        }
        #method-test-main .hide {
            transform: scale(0);
        }
        #method-test-wrap {
            width: 200px;
        }
        #method-test-wrap::after {
            content: "Less is good!";
        }
        #method-test-wrap .hide {
            transform: scale(0);
        }
        ```
    * 要点：
        * **选择器和extend之间是允许有空格的**：`pre:hover :extend(div pre)`;
        * **可以使用多个extend**: `pre:hover:extend(div pre):extend(.bucket tr)`（注意：这与 `pre:hover:extend(div pre, .bucket tr)`一样）；
        * `pre:hover:extend(div pre).nth-child(odd)`是不可以的，**extend:必须在最后**；
        * 如果一个规则集包含多个选择器，那么所有选择器都可以使用extend关键字；
5. 导入
    * 导入less文件：可省略后缀；
        ```less
        import "main"; 
        // 等价于
        import "main.less";
        ```
    * @import的位置可随意放置：
        ```less
        #main{
            font-size: 15px;
        }
        @import "style";
        ```
    * @import(reference)：
        使用@import(reference)可导入外部less文件，但**不会把导入的文件编译到最终输出中，只引用**；
        ```less
        @import(reference) "bootstrap.less"; 
        #wrap:extend(.navbar all) {}
        ```
    * @import(once)：
        **@import语句的默认行为，表示相同的文件只会被导入一次，而随后的导入文件的重复代码都不会解析**；
        ```less
        @import (once) "foo.less";
        @import (once) "foo.less"; // 上面已经引入了，这里不会解析了
        ```
    * @import(multiple)：
        **使用@import(multiple)允许导入多个同名文件**；
        ```less
        // file: foo.less
        .a {
            color: green;
        }
        // file: main.less
        @import (multiple) "foo.less";
        @import (multiple) "foo.less";
        
        /* 生成后的 CSS */
        .a {
            color: green;
        }
        .a {
            color: green;
        }
        ```
6. 函数
    * 判断类型: 
        * isnumber(param)：判断param是否为数字；
            ```less
            isnumber(#ff0);     // false
            isnumber(blue);     // false
            isnumber("string"); // false
            isnumber(1234);     // true
            isnumber(56px);     // true
            isnumber(7.8%);     // true
            isnumber(keyword);  // false
            isnumber(url(...)); // false
            ```
        * iscolor(param)：判断param是否为颜色；
        * isurl(param)：判断param是否是url；
    * 颜色操作：
        * saturate：增加一定数值的颜色饱和度；
        * lighten：增加一定数值的颜色亮度；
        * darken：降低一定数值的颜色亮度；
        * fade：给颜色设定一定数值的透明度；
        * mix：根据比例混合两种颜色；
    * 数学函数：
        * ceil：向上取整；
        * floor：向下取整；
        * percentage：将浮点数转换为百分比字符串；
        * round：四舍五入；
        * sqrt：计算一个数的平方根；
        * abs：计算数字的绝对值，原样保持单位；
        * pow：计算一个数的乘方；
7. 其他
    * 注释
        * /**/：CSS原生注释，会被编译在CSS文件中；
        * //：Less提供的一种注释，不会被编译在CSS文件中；
    * 避免编译：
        结构：`~'避免编译的值'`
        ```less
        #main{
            width:~'calc(300px-30px)';
        }
        
        /* 生成后的 CSS */
        #main {
            width: calc(300px-30px);
        }
        ```
    * 使用JS：
        因为Less是由JS编写，所以**Less有一得天独厚的特性：代码中使用Javascript**；
        ```less
        @content:`"aaa".toUpperCase()`;
        #randomColor{
            @randomColor: ~"rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)";
        }
        #wrap{
            width: ~"`Math.round(Math.random() * 100)`px";
            &:after{
                content:@content;
            }
            height: ~"`window.innerHeight`px";
            alert:~"`alert(1)`";
            #randomColor();
            background-color: @randomColor;
        }
        /* 生成后的 CSS */
        
        // 弹出 1
        #wrap{
            width: 随机值（0~100）px;
            height: 743px;//由电脑而异
            background: 随机颜色;
        }
        #wrap::after{
            content:"AAA";
        }
        ```

[查看原文](https://segmentfault.com/a/1190000012360995)
