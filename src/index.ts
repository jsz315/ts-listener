/**
 * 事件发射器，用于侦听事件回调
 */

// 使用案例：
// var dispatcher = new H5EventDispatcher();
// dispatcher.on("play", (e:H5Event)=>{
//     e.target.off(e.type, e.callback);
//     console.log("data times", e.times)
// });
// dispatcher.emit({type: "play", times: 3});

// var removeListener = H5EventDispatcher.createDomListenter(window, "click", (e:MouseEvent)=>{
//     console.log(e);
//     if(e.clientY > window.innerHeight / 2){
//         removeListener();
//     }
// }, {capture: false, passive: false})


export interface H5Event {
    type: string;
    target?: H5EventDispatcher;
    callback?: (event: Event) => void;
    [key: string]: any;
}

export class H5EventDispatcher{

    map:{ [key: string]: any[] } = {};

    /**
     * 侦听事件
     * @param type 事件名称
     * @param callback 事件回调
     * @param content 上下文
     */
    on(type: string, callback: (event: H5Event) => void, content?: any){
        if(!this.map[type]){
            this.map[type] = [];
        }
        var item: any = {
            type,
            callback,
            content
        };
        this.map[type].push(item);
    }

    /**
     * 移除侦听
     * @param type 事件名称，不传则会移除该对象的全部侦听事件
     * @param callback 事件回调，不传则会移除对应事件名称下的所有侦听事件
     */
    off(type?: string, callback?: Function) {
        if(!type){
            this.map = {};
            return;
        }

        var list = this.map[type];
        if(list){
            if(callback){
                list = list.filter((item:any) => item.callback != callback);
                if(list.length == 0){
                    delete this.map[type];
                }
            }
            else{
                delete this.map[type];
            }
        }
    }
    

    /**
     * 派发事件
     * @param event 事件对象
     */
    emit(event: H5Event){
        this.map[event.type] && this.map[event.type].forEach((item:any) => {
            event.target = this;
            event.callback = item.callback;
            item.callback.apply(item.content, [event]);
        })
    }

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
    static createDomListenter(dom:any, type:string, callback:Function, options?: {passive?:boolean, once?:boolean, capture?:boolean}): Function{
        dom.addEventListener(type, callback, options);
        return function() {
            dom.removeEventListener(type, callback, options);
        };
    }
}