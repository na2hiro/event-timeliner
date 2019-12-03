import moment from "moment";
import chrono from "chrono-node";
export const parseEvent = (text: string) => {
    const tokens = text.split("@");
    if(tokens.length<2) {
        return null;
    }
    const moment = parseMoment(tokens[1]);
    if(!moment) return null;
    return {
        text: tokens[0],
        moment
    }
};

const parseMoment = (text: string) => {
    const date = chrono.parseDate(text);
    if(!date) return date;
    return moment(date);
}

export type IEvent = {
    text: string;
    moment: moment.Moment
}