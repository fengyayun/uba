- pv页面的统计 主要监听了 history 和 hash 

- UV的统计 访问你网站的一台电脑客户端为一个访客 用户唯一表示 可以在登录之后通过接口返回的id 进行设置值 提供了setUserId(也可以使用canvas 指纹追踪技术)

- 使用navigator.sendBeacon 进行上报数据 这个上报的机制 跟 XMLHttrequest 对比  navigator.sendBeacon 即使页面关闭了 也会完成请求 而XMLHTTPRequest 不一定

- dom事件的监听,监听的元素添加属性，用来是否要监听上报

- js 报错上报error 事件  promise 报错 unhandledrejection
