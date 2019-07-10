const datetime = {
    getDate: (addDays = 0) => {
        const date = new Date();
        const addedTime = date.setTime(date.getTime() + (addDays * 24 * 60 * 60 * 1000));
        return datetime.convertDate(addedTime);
    },
    convertDate: (time) => {
        const date = new Date(time).toISOString().split('T')[0];
        return date;
    }
};

export default datetime;