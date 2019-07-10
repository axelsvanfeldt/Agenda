const getDate = (addDays = 0) => {
    const date = new Date();
    const addedTime = date.setTime(date.getTime() + (addDays * 24 * 60 * 60 * 1000));
    const newDate = new Date(addedTime).toISOString().split('T')[0];
    return newDate;
}

export default getDate;