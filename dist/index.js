"use strict";
/**
 * 事件发射器，用于侦听事件回调
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.H5EventDispatcher = void 0;
var H5EventDispatcher = /** @class */ (function () {
    function H5EventDispatcher() {
        this.map = {};
    }
    /**
     * 侦听事件
     * @param type 事件名称
     * @param callback 事件回调
     * @param content 上下文
     */
    H5EventDispatcher.prototype.on = function (type, callback, content) {
        if (!this.map[type]) {
            this.map[type] = [];
        }
        var item = {
            type: type,
            callback: callback,
            content: content
        };
        this.map[type].push(item);
    };
    /**
     * 移除侦听
     * @param type 事件名称，不传则会移除该对象的全部侦听事件
     * @param callback 事件回调，不传则会移除对应事件名称下的所有侦听事件
     */
    H5EventDispatcher.prototype.off = function (type, callback) {
        if (!type) {
            this.map = {};
            return;
        }
        var list = this.map[type];
        if (list) {
            if (callback) {
                list = list.filter(function (item) { return item.callback != callback; });
                if (list.length == 0) {
                    delete this.map[type];
                }
            }
            else {
                delete this.map[type];
            }
        }
    };
    /**
     * 派发事件
     * @param event 事件对象
     */
    H5EventDispatcher.prototype.emit = function (event) {
        var _this = this;
        this.map[event.type] && this.map[event.type].forEach(function (item) {
            event.target = _this;
            event.callback = item.callback;
            item.callback.apply(item.content, [event]);
        });
    };
    /**
     * 给元素对象添加侦听，回调函数为匿名函数时可以很方便的移除事件侦听
     * @param dom 页面元素或者window对象
     * @param type 事件名称
     * @param callback 事件回调
     * @param passive 为ture时：告知浏览器不用阻止默认行为；为false时：一般会调用preventDefault方法阻止浏览器默认行为
     * @returns 移除事件的方法，执行该方法即可移除事件侦听
     */
    /**
     * 给元素对象添加侦听，方便的移除匿名函数事件的侦听
     * @param dom 页面元素或者window对象
     * @param type 事件名称
     * @param callback 事件回调
     * @param options 可选参数：passive-告知浏览器永远不会调用preventDefault()；once-执行一次自动移除；capture-捕获阶段执行回调
     * @returns
     */
    H5EventDispatcher.createDomListenter = function (dom, type, callback, options) {
        dom.addEventListener(type, callback, options);
        return function () {
            dom && dom.removeEventListener(type, callback, options);
        };
    };
    return H5EventDispatcher;
}());
exports.H5EventDispatcher = H5EventDispatcher;
