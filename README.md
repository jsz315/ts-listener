# jsz-event

## 使用TpyeScript编写的事件侦听器，主要作用有：
- 移除侦听的匿名方法
- 在类文件中使用时可以把this当做上下文传递


移除匿名回调方法：

```js
import { H5Event, H5EventDispatcher } from  "jsz-event";

var removeListener = H5EventDispatcher.createDomListenter(window, "click", (e: MouseEvent) => {
        console.log(e);
        if (e.clientY > window.innerHeight / 2) {
            removeListener();
        }
    }
);

```

类文件中使用：

```js
import { H5Event, H5EventDispatcher } from  "jsz-event";

class Test {
    name = "jsz";
    constructor() {
        var sender = new H5EventDispatcher();
        sender.on("over", this.done, this);
        sender.emit({ type: "over", num: 100 });
    }

    done(e: H5Event) {
        console.log(this.name, e.num);
        e.target.off("over", e.callback);
    }
}
```