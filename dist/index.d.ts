/**
 * 事件发射器，用于侦听事件回调
 */
export interface H5Event {
    type: string;
    target?: H5EventDispatcher;
    callback?: (event: Event) => void;
    [key: string]: any;
}
export declare class H5EventDispatcher {
    map: {
        [key: string]: any[];
    };
    /**
     * 侦听事件
     * @param type 事件名称
     * @param callback 事件回调
     * @param content 上下文
     */
    on(type: string, callback: (event: H5Event) => void, content?: any): void;
    /**
     * 移除侦听
     * @param type 事件名称，不传则会移除该对象的全部侦听事件
     * @param callback 事件回调，不传则会移除对应事件名称下的所有侦听事件
     */
    off(type?: string, callback?: Function): void;
    /**
     * 派发事件
     * @param event 事件对象
     */
    emit(event: H5Event): void;
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
    static createDomListenter(dom: any, type: string, callback: Function, options?: {
        passive?: boolean;
        once?: boolean;
        capture?: boolean;
    }): Function;
}
