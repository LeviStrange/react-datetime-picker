/**
 * Collection of configs used in the DateTime picker
 */
export module Config {
    export const startTimeInMs:number = 1000 * 60 * 60 * 6; // 06.00
    export const endTimeInMs:number = 1000 * 60 * 60 * 21.75; // 21.45
    export const minuteInterval:number = 15;
    export const numDays:number = 28;
    export const duration:number = 60;
    export const months:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    export const weekdays:Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};
