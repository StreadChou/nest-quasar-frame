import {Notify} from 'quasar'


export class NotifyHelper {
    negative(message: string) {
        Notify.create({
            color: "negative",
            message: message,
            position: "top-right",
        })
    }
}
