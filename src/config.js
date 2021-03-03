/**
 * Collection of configs used in the DateTime picker
 */

const startTimeInMs = 1000 * 60 * 60 * 6; // 06.00
const endTimeInMs = 1000 * 60 * 60 * 21.75; // 21.45
const minuteInterval = 15;
const numDays = 28;
const duration = 60;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

module.exports = Object.freeze({
    startTimeInMs,
    endTimeInMs,
    minuteInterval,
    numDays,
    duration,
    months,
    weekdays
})