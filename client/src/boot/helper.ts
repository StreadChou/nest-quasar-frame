import {boot} from 'quasar/wrappers';
import {TimeHelper} from "boot/helper/time.helper";
import {NotifyHelper} from "boot/helper/notify.helper";

export class Helper {
    static _instance: Helper;
    time: TimeHelper;
    notify: NotifyHelper;


    private constructor() {
        this.time = new TimeHelper();
        this.notify = new NotifyHelper();
    }

    public static getInstance(): Helper {
        if (this._instance) return this._instance;
        this._instance = new Helper();
        return this._instance;
    }
}

const helper = Helper.getInstance();

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $helper: Helper;
    }
}

export default boot(({app}) => {
    app.config.globalProperties.$helper = helper;
});

export {helper}

