(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tracker = factory());
})(this, (function () { 'use strict';

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
      captureEvents(MouseEventList, targetKey, data) {
          MouseEventList.forEach((event) => {
              window.addEventListener(event, () => {
                  console.log('监听到了');
              });
          });
      }
      installInnerTracker() {
          if (this.data.hashTracker) {
              window.history['pushState'] = createHistoryEvent('pushState');
              window.history['replaceState'] = createHistoryEvent('replaceState');
              this.captureEvents(['popstate', 'pushState', 'replaceState'], 'history-pv');
          }
      }
  }

  return Tracker;

}));
