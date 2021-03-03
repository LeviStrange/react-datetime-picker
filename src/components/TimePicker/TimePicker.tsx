import * as React from 'react';
import { observer } from 'mobx-react';
import { TimePickerStoreImpl } from './TimePickerStore';

export interface TimePickerProps {
    minuteInterval:number,
    date:Date,
    startTime:Date,
    endTime:Date,
    timePickerStore:TimePickerStoreImpl,
};

export interface TimePickerState {

};

@observer
class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {
    /**
     * calculates the nearest minute interval as specified in the config.js
     * and returns the Date
     * @param ms 
     * @param startTime 
     * @param endTime 
     */
    getNextTimeSlot = (ms:number, startTime:Date, endTime:Date) => {
        let nextTimeSlot = new Date(Math.ceil(Date.now() / ms) * ms);
        if (nextTimeSlot > endTime || nextTimeSlot < startTime) {
            nextTimeSlot = startTime;  
        }
        return nextTimeSlot;
    };

    /**
     * calculates all time slots between startTime and endTime separated by
     * the minute interval
     * @param date 
     * @param minutes 
     * @param startTime 
     * @param endTime 
     */
    getTimes = (date:Date, minutes:number, startTime:Date, endTime:Date) => {
        const timeSlots = [];
        const dayInMs = 1000 * 60 * 60 * 24;
        const ms = 1000 * 60 * minutes;
        startTime = new Date(date.getTime() + startTime.getTime());
        endTime = new Date(date.getTime() + endTime.getTime()); 
        if (new Date() > endTime) {
            startTime.setTime(startTime.getTime() + dayInMs);
            endTime.setTime(endTime.getTime() + dayInMs);
        }

        let nextTimeSlot = this.getNextTimeSlot(ms, startTime, endTime);
        for (let i = startTime; i <= endTime; i = new Date(i.getTime() + (ms))) {
            let timeClass = i < nextTimeSlot ? 'past-time' : '';
            timeClass = i.getTime() === nextTimeSlot.getTime() ? 'next-time' : timeClass;
            timeSlots.push(
                <li 
                    data-time={i.getTime()} 
                    onClick={e => this.storeTime(e)} 
                    className={timeClass}
                >
                    {i.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}   
                </li>
            );    
        };

        return <ol className="times-list">{timeSlots}</ol>
    }

    storeTime = (e:any) => {
        if (e.target.className !== 'past-time') { 
            const fullDate:Date = new Date(parseInt(e.target.dataset.time));
            this.props.timePickerStore.addTime(fullDate);
        }
    }

    render(){
        const count = this.props.timePickerStore.count;
        const date = this.props.date || new Date();
        date.setHours(0,0,0,0);
        const times = this.getTimes(date, this.props.minuteInterval, this.props.startTime, this.props.endTime);
        return (
            <>
                {times}
            </>
        );
    }
}

export default TimePicker;