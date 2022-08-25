# uba
用户分析的sdk


使用介绍

```

//
import Tracker from 'fyy-uba'

const tr = new Tracker({
  ...
})
```

options介绍
```

/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @historyTracker sdkVersion sdk版本
 * @historyTracker extra 透传字段
 * @jsError js 和 promise 报错异常上报
 */
export interface DefaultOptons {
    uuid: string | undefined,
    requestUrl: string | undefined,
    historyTracker: boolean,
    hashTracker: boolean,
    domTracker: boolean,
    sdkVersion: string | number,
    extra: Record<string, any> | undefined,
    jsError:boolean
}
```

Dom上报 DOM escalation

```
//  <button target-key="埋点值">按钮</button>
//只要有target-key 就会自动上报
const tr = new Tracker({
    requestUrl:"http://localhost:3000/xxxx", //接口地址
    domTracker:true
})
```


pv页面的统计

```
 historyTracker history上报
 @hashTracker hash上报
```

uv的统计

```
//添加用户id
tr.setUserId()
```