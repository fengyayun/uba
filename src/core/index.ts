import { reportTrackerData } from './../types/index';
import { defaultOptions, options, TrackerConfig } from '../types/index'
import { createHistoryEvent } from '../utils/pv'
const MouseEventList:string[] = ['click','dblclick','contextmenu','mousedown','mouseup','mouseenter','mouseout','mouseover']
export default class Tracker {
  public data:options
  constructor(options:options){
    this.data = Object.assign(this.initDef(),options)
    this.installInnerTracker()
  }
  private initDef():defaultOptions {
    return <defaultOptions>{
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      sdkVersion: TrackerConfig.version,
      jsError:false
    }
  }
  public setUseId<T extends defaultOptions['uuid']>(uuid:T) {
    this.data.uuid = uuid
  }
  public setExtra<T extends defaultOptions['extra']>(extra: T) {
    this.data.extra = extra
  }
  private captureEvents<T>(MouseEventList:string[],targetKey:string,data?:T){
    MouseEventList.forEach((event:string) =>{
      window.addEventListener(event,() =>{
        // 可以上传路由地址以及页面标题 这样就可以统计哪个路由访问的次数
        this.sendTracker({
          event,
          targetKey
        })
      })
    })
  }
  private installInnerTracker(){
    if (this.data.historyTracker){
      window.history['pushState'] = createHistoryEvent('pushState')
      window.history['replaceState'] = createHistoryEvent('replaceState')
      this.captureEvents(['popstate','pushState','replaceState'],'history-pv')
    }
    if (this.data.hashTracker){
      this.captureEvents(['hashchange'],'hash-pv')
    }
    if (this.data.domTracker){
      this.targetKeyReport()
    }
    if (this.data.jsError){
      this.jsError()
    }
  }
  private jsError(){
    this.errorEvent()
    this.promiseReject()
  }
  //捕获js报错
  private errorEvent(){
    window.addEventListener('error',(event) =>{
      this.sendTracker({
        event:'error',
        targetKey:'message',
        message:event.message
      })
    })
  }
  //捕获promise错误
  private promiseReject(){
    window.addEventListener('unhandledrejection',(event) =>{
      event.promise.catch(error =>{
        this.sendTracker({
          event:'reject',
          targetKey:'promise',
          message:error
        })
      })
    })
  }
  private targetKeyReport(){
    MouseEventList.forEach(event =>{
      window.addEventListener(event,(e) =>{
        const target = e.target as HTMLElement
        const targetValue = target.getAttribute('target-key')
        if (targetValue){
          this.reportTracker({
            event,
            targetKey:targetValue
          })
        }
      })
    })
  }
  public sendTracker(data:reportTrackerData){
    this.reportTracker<reportTrackerData>(data)
  }
  private reportTracker<T>(data:T){
    const params = Object.assign(this.data,data,{ time : new Date().getTime()})
    let headers = {
      type:'application/x-www-form-urlencoded'
    }
    let blob = new Blob([JSON.stringify(params)],headers)
    navigator.sendBeacon(this.data.requestUrl,blob)
  }
}