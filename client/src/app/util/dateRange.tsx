import moment from "moment";

export interface DateData {
    date: string;
    dayTitle: string;
}

export const weekRange = (startDate: string, endDate: string): DateData[] => {
    let days: DateData[] = [];
    for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        days.push({date: m.format(), dayTitle: m.format('dddd')});
    }
    return days;
}
