var TrackerConfig;
(function (TrackerConfig) {
    TrackerConfig["version"] = "1.0.0";
})(TrackerConfig || (TrackerConfig = {}));

const createHistoryEvent = (type) => {
    const origin = history[type];
    return function () {
        const res = origin.apply(this, arguments);
        const event = new Event(type);
        window.dispatchEvent(event);
        return res;
    };
};

const MouseEventList = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'];
class Tracker {
    constructor(options) {
        this.data = Object.assign(this.initDef(), options);
        this.installInnerTracker();
    }
    initDef() {
        return {
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            sdkVersion: TrackerConfig.version,
            jsError: false
        };
    }
    setUseId(uuid) {
        this.data.uuid = uuid;
    }
    captureEvents(MouseEventList, targetKey, data) {
        MouseEventList.forEach((event) => {
            window.addEventListener(event, () => {
                // 可以上传路由地址以及页面标题 这样就可以统计哪个路由访问的次数
                this.sendTracker({
                    event,
                    targetKey
                });
            });
        });
    }
    installInnerTracker() {
        if (this.data.historyTracker) {
            window.history['pushState'] = createHistoryEvent('pushState');
            window.history['replaceState'] = createHistoryEvent('replaceState');
            this.captureEvents(['popstate', 'pushState', 'replaceState'], 'history-pv');
        }
        if (this.data.hashTracker) {
            this.captureEvents(['hashchange'], 'hash-pv');
        }
        if (this.data.domTracker) {
            this.targetKeyReport();
        }
        if (this.data.jsError) {
            this.jsError();
        }
    }
    jsError() {
        this.errorEvent();
        this.promiseReject();
    }
    //捕获js报错
    errorEvent() {
        window.addEventListener('error', (event) => {
            this.sendTracker({
                event: 'error',
                targetKey: 'message',
                message: event.message
            });
        });
    }
    //捕获promise错误
    promiseReject() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.sendTracker({
                    event: 'reject',
                    targetKey: 'promise',
                    message: error
                });
            });
        });
    }
    targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target;
                const targetValue = target.getAttribute('target-key');
                if (targetValue) {
                    this.reportTracker({
                        event,
                        targetKey: targetValue
                    });
                }
            });
        });
    }
    sendTracker(data) {
        this.reportTracker(data);
    }
    reportTracker(data) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() });
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob);
    }
}

export { Tracker as default };
