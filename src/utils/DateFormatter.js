import Moment from 'moment';

export const eventOccurenceDateFormat="DD-MM-yyyy 00:00:00";
export const reportDateFormat="DD-MM-yyyy 00:00:00";
export const DateFormatter = {
    dateToString(date, format) {
        return Moment(date).format(format);
    },
    stringToDate(dateString, format) {
        if (!dateString) {
            return null;
        }
        const parsedDate = Moment(dateString, format);
        return parsedDate.isValid() ? parsedDate.toDate() : null;
    }
};
