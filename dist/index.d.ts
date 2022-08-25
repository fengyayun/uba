/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带tracker-key 点击事件上报
 * @sdkVersion sdk版本
 * @extra extra 透传字段
 * @jsError js 和 promise 报错异常上报
 */
interface defaultOptions {
    uuid: string | undefined;
    requestUrl: string | URL;
    historyTracker: boolean;
    hashTracker: boolean;
    domTracker: boolean;
    sdkVersion: string | number;
    extra: string;
    jsError: boolean;
}
interface options extends Partial<defaultOptions> {
    requestUrl: string | URL;
}
declare type reportTrackerData = {
    [key: string]: any;
    event: string;
    targetKey: string;
};

declare class Tracker {
    data: options;
    constructor(options: options);
    private initDef;
    setUseId<T extends defaultOptions['uuid']>(uuid: T): void;
    private captureEvents;
    private installInnerTracker;
    private jsError;
    private errorEvent;
    private promiseReject;
    private targetKeyReport;
    sendTracker(data: reportTrackerData): void;
    private reportTracker;
}

export { Tracker as default };
