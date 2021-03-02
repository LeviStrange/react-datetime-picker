import * as React from 'react';
import { observer } from 'mobx-react';
import { TimePickerStoreImpl } from './TimePickerStore';
export interface TimePickerProps {
    minuteInterval:number,
    startTime:Date,
    endTime:Date,
    timePickerStore:TimePickerStoreImpl,
};

export interface TimePickerState {

};

@observer
class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {
    getTimes = (date:Date, minutes:number, startTime:Date, endTime:Date) => {
        const timeSlots = [];
        const ms = 1000 * 60 * minutes;
        
        // export to getNextTimeSlot()
        // in a real project i would use a Date.Utils file to allow my code to be reusable.
        let nextTimeSlot = new Date(Math.ceil(date.getTime() / ms) * ms);
 
        if (nextTimeSlot > endTime || nextTimeSlot < startTime) {
            nextTimeSlot = startTime;
            
        }

        for (let i = startTime; i <= endTime; i = new Date(i.getTime() + (ms))) {
            let timeClass = i < nextTimeSlot ? 'past-time' : '';
            timeClass = i.getTime() === nextTimeSlot.getTime() ? 'next-time' : timeClass;
            timeSlots.push(<li data-time={i.getTime()} onClick={e => this.storeTime(e)} className={timeClass}>{i.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</li>);    
        };
        return <ol>{timeSlots}</ol>
    }

    storeTime = (e:any) => {
        const fullDate:Date = new Date(parseInt(e.target.dataset.time));
        this.props.timePickerStore.addTime(fullDate);
    }

    render(){
        console.log("PROPS", this.props);
        const count = this.props.timePickerStore.count;
        const times = this.getTimes(new Date(), this.props.minuteInterval, this.props.startTime, this.props.endTime);
        return (
            <>
                {times}
            </>
        );
    }
}

export default TimePicker;