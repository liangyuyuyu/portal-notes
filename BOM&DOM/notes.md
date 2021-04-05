> javascript是由三部分构成：ECMAScript、DOM、BOM

# BOM、DOM概念
## BOM
1. BOM（Browser Object Model，浏览器对象模型）；
2. BOM使JavaScript有能力与浏览器"对话"，即BOM定义了JavaScript可以操作浏览器的各个功能部件的接口；
3. BOM的最根本(最核心)对象是window；
4. BOM没有相关标准，不同的浏览器实现的同一功能可以不同；
5. BOM包含了DOM（window.document），访问浏览器API的是BOM对象，从BOM对象再访问到DOM对象；
## DOM
1. DOM（Document Object Model，文档对象模型）；
2. DOM与文档（网页）有关，与浏览器无关，DOM关注的是网页本身的内容；
3. 由于DOM与浏览器无关，所以标准就好定了，DOM是W3C的标准；
4. DOM最根本对象是document（实际上是window.document）；

# BOM、DOM关系
<div align="left">
    <img src="./assets/images/bom-dom-relationship.png" width="600” alt="图片不存在" title="div的所有属性" />
</div>

<div align="left">
    <img src="./assets/images/bom-dom-detail-relationship.png" width="800” alt="图片不存在" title="div的所有属性" />
</div>

# BOM
## JavaScript Window
1. Window对象
    * 所有浏览器都支持window对象，它表示浏览器窗口；
    * 所有JavaScript全局对象、函数、变量均自动成为window对象的成员；
    * **全局变量是window对象的属性**；
    * **全局函数是window对象的方法**；
    * 甚至HTML DOM的document也是window对象的属性之一；
2. Window对象属性
    属性|描述
    |:-|:-|
    closed|返回窗口是否已被关闭；
    defaultStatus|设置或返回窗口状态栏中的默认文本；
    **document**|对Document对象的只读引用，[查看Document对象](#document-object)；
    **frames**|返回窗口中所有命名的框架，该集合是Window对象的数组，每个Window对象在窗口中含有一个框架；
    **history**|对History对象的只读引用，[查看History对象](#history-object)；
    innerHeight|返回窗口的文档显示区的高度；
    innerWidth|返回窗口的文档显示区的宽度；
    localStorage|在浏览器中存储 key/value 对，没有过期时间；
    length|设置或返回窗口中的框架数量；
    **location**|用于窗口或框架的Location对象，[查看Location对象](#location-object)；
    name|设置或返回窗口的名称；
    **navigator**|对Navigator对象的只读引用，[查看Navigator对象](#navigator-object)；
    opener|返回对创建此窗口的窗口的引用;
    outerHeight|返回窗口的外部高度，包含工具条与滚动条;
    outerWidth|返回窗口的外部宽度，包含工具条与滚动条;
    pageXOffset|设置或返回当前页面相对于窗口显示区左上角的X位置;
    pageYOffset|设置或返回当前页面相对于窗口显示区左上角的Y位置;
    parent|返回父窗口；
    **screen**|对 Screen 对象的只读引用，[查看Screen对象](#screen-object)；
    screenLeft|返回相对于屏幕窗口的x坐标；
    screenTop|返回相对于屏幕窗口的y坐标；
    screenX|返回相对于屏幕窗口的x坐标；
    sessionStorage|在浏览器中存储key/value对，在关闭窗口或标签页之后将会删除这些数据；
    screenY|返回相对于屏幕窗口的y坐标；
    self|返回对当前窗口的引用，等价于Window属性；
    status|设置窗口状态栏的文本；
    top|返回最顶层的父窗口；

3. Window 对象方法
    方法|描述
    |:-|:-|
    alert()|显示带有一段消息和一个确认按钮的警告框；
    atob()|解码一个 base-64 编码的字符串；
    btoa()|创建一个 base-64 编码的字符串；
    blur()|把键盘焦点从顶层窗口移开；
    clearInterval()|取消由 setInterval() 设置的 timeout；
    clearTimeout()|取消由 setTimeout() 方法设置的 timeout；
    close()|关闭浏览器窗口；
    confirm()|显示带有一段消息以及确认按钮和取消按钮的对话框；
    createPopup()|创建一个 pop-up 窗口；
    focus()|把键盘焦点给予一个窗口；
    getSelection()|返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置；
    getComputedStyle()|获取指定元素的 CSS 样式；
    matchMedia()|该方法用来检查 media query 语句，它返回一个 MediaQueryList对象；
    moveBy()|可相对窗口的当前坐标把它移动指定的像素；
    moveTo()|把窗口的左上角移动到一个指定的坐标；
    open()|打开一个新的浏览器窗口或查找一个已命名的窗口；
    print()|打印当前窗口的内容；
    prompt()|显示可提示用户输入的对话框；
    resizeBy()|按照指定的像素调整窗口的大小；
    resizeTo()|把窗口的大小调整到指定的宽度和高度；
    scroll()|已废弃，该方法已经使用了 scrollTo() 方法来替代；
    scrollBy()|按照指定的像素值来滚动内容；
    scrollTo()|把内容滚动到指定的坐标；
    setInterval()|按照指定的周期（以毫秒计）来调用函数或计算表达式；
    setTimeout()|在指定的毫秒数后调用函数或计算表达式；
    stop()|停止页面载入；
    postMessage()|安全地实现跨源通信；

## <span id="history-object">History对象</span>


## <span id="location-object">Location对象</span>


## <span id="navigator-object">Navigator对象</span>


## <span id="screen-object">Screen对象</span>


# <span id="document-object">DOM</span>