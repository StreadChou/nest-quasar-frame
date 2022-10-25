import moment from "moment";

export class TimeHelper {
    private dateTimeFormat = "YYYY-MM-DD H:mm:ss"
    private dateFormat = "YYYY-MM-DD"
    private timeFormat = "H:mm:ss"

    public timestamp(date?: Date): number {
        date = date || new Date();
        return Math.floor(date.getTime() / 1000);
    }

    // 将时间戳转传承 date time
    public timestampToDateTime(time: number) {
        time = time * 1000;
        return moment(time).format(this.dateTimeFormat);
    }

    // 将date 转传承 date time
    public dateToDateTime(date?: string | Date) {
        if (!date) date = new Date();
        return moment(date).format(this.dateTimeFormat)
    }
}
