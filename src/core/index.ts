import { defaultOptions, options, TrackerConfig } from '../types/index'
import { createHistoryEvent } from '../utils/pv'
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
  private captureEvents<T>(MouseEventList:string[],targetKey:string,data?:T){
    MouseEventList.forEach((event:string) =>{
      window.addEventListener(event,() =>{
        console.log('监听到了')
      })
    })
  }
  private installInnerTracker(){
    if (this.data.hashTracker){
      window.history['pushState'] = createHistoryEvent('pushState')
      window.history['replaceState'] = createHistoryEvent('replaceState')
      this.captureEvents(['popstate','pushState','replaceState'],'history-pv')
    }
  }
}