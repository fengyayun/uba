/**
 * @requestUrl 接口地址 
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带tracker-key 点击事件上报
 * @sdkVersion sdk版本
 * @extra extra 透传字段
 * @jsError js 和 promise 报错异常上报
 */
export interface defaultOptions  {
  uuid: string | undefined,
  requestUrl: string | undefined,
  historyTracker: boolean,
  hashTracker: boolean,
  domTracker: boolean,
  sdkVersion: string | number,
  extra: string,
  jsError: boolean,
}
export interface options extends Partial<defaultOptions> {
  requestUrl: string | undefined,
}
export enum TrackerConfig {
  version = '1.0.0'
}
export type reportTrackerData = {
  [key:string]:any,
  event: string,
  targetKey: string,
}