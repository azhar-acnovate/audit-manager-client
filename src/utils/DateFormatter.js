import Moment from 'moment';

export const eventOccurenceDateFormat = "DD-MM-YYYY HH:mm:ss";
export const reportDateFormat = "DD-MM-YYYY HH:mm:ss";
export const DateFormatter = {
    dateToString(date, format) {
        return Moment(date).format(format);
    },
    stringToDate(dateString, format) {
        if (!dateString) {
            return null;
        }
        const parsedDate = Moment(dateString, format);
        return parsedDate.isValid() ? parsedDate : null;
    },
    convertUTCToLocalTime(utcDateStr) {
        console.log("utcDateStr::" + utcDateStr);

        // Parse the date manually
        const [datePart, timePart] = utcDateStr.split(" ");
        const [day, month, year] = datePart.split("-");
        const [hour, minute, second] = timePart.split(":");

        // Create a new Date object in UTC by using Date.UTC
        const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        console.log("utcDate::" + utcDate);

        // Format the date to local time using Intl.DateTimeFormat
        var localDate = new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        }).format(utcDate);
        return this.dateToString(localDate, "DD-MM-yyyy hh:mm:ss A")
    }

};
