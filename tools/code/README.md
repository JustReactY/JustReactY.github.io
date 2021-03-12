# 代码片段

## js 获取当前元素距离窗口的距离

``` js
let domToTop = dom.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
let domToLeft = dom.getBoundingClientRect().left // dom 的左边到视口左边的距离
let domToBottom = dom.getBoundingClientRect().bottom // dom 的底边到视口顶部的距离
let domToRight = dom.getBoundingClientRect().right // dom 的右边到视口左边的距离
```

## 判断background-image图片是否存在

``` js
ImageIsExist(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('Get', url, false);
    xmlHttp.send();
    if (xmlHttp.status === 404)
      return false;
    else
      return true;
}
```

## 解决keep-alive 返回不能刷新
``` js
Vue.use(Router)
//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
    try {
      // 筛选页面跳转城市选择页面 清除筛选页面缓存
      if (to.name === 'city' && from.name === 'search') {
        if (this.$vnode && this.$vnode.data.keepAlive) {
          if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
            if (this.$vnode.componentOptions) {
              // 取自vue源码
              var key = this.$vnode.key == null ?
                this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
                this.$vnode.key;

              var cache = this.$vnode.parent.componentInstance.cache;
              var keys = this.$vnode.parent.componentInstance.keys;
              if (cache[key]) {
                if (keys && keys.length) {
                  var index = keys.indexOf(key);
                  if (index > -1) {
                    keys.splice(index, 1);
                  }
                }
                delete cache[key];
              }
            }
          }
        }
        this.$destroy();
      }
    } catch (error) {
      console.log(error)
    }
    next();
  },
});
```

> 前置条件可以自行调整 注意：mixin必须写在use后面


## 氛围组件
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      div,
      ul,
      li {
        margin: 0;
        padding: 0;
      } /*先初始化一下默认样式*/
      .notice {
        width: 300px; /*单行显示，超出隐藏*/
        height: 35px; /*固定公告栏显示区域的高度*/
        padding: 0 30px;
        background-color: #b3effe;
        overflow: hidden;
      }
      .notice ul li {
        list-style: none;
        line-height: 35px;
        /*以下为了单行显示，超出隐藏*/
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="notice">
      <ul>
        <li>第1条公告第1条公告第1条公告第1条公告第1条公告第1条公告</li>
        <li>第2条公告第2条公告第2条公告第2条公告第2条公告第2条公告</li>
        <li>第3条公告第3条公告第3条公告第3条公告第3条公告第3条公告</li>
        <li>第4条公告第4条公告第4条公告第4条公告第4条公告第4条公告</li>
      </ul>
    </div>

    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script>
      function noticeUp(obj, top, time) {
        $(obj).animate(
          {
            marginTop: top
          },
          time,
          function () {
            console.log($(this));
            $(this).css({ marginTop: "0" }).find(":first").appendTo(this);
          }
        );
      }
      $(function () {
        // 调用 公告滚动函数
        setInterval("noticeUp('.notice ul','-35px',500)", 2000);
      });
    </script>
  </body>
</html>

```