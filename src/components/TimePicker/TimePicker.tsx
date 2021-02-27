import * as React from 'react';

export interface TimePickerProps {
    minuteInterval:number,
    startTime:Date,
    endTime:Date
};

export interface TimePickerState {

};

class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
    
    getTimes = (date:Date, minutes:number, startTime:Date, endTime:Date) => {
        const timeSlots = [];
        const ms = 1000 * 60 * minutes;
        
        let nextTimeSlot = new Date(Math.ceil(date.getTime() / ms) * ms);
 
        if (nextTimeSlot > endTime || nextTimeSlot < startTime) {
            nextTimeSlot = startTime;
            
        }

        for (let i = startTime; i <= endTime; i = new Date(i.getTime() + (ms))) {
            let timeClass = i < nextTimeSlot ? 'past-time' : '';
            timeClass = i.getTime() === nextTimeSlot.getTime() ? 'next-time' : timeClass;
            timeSlots.push(<li data-time={i} onClick={e => this.storeTime(e)} className={timeClass}>{i.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</li>);    
        };
        return <ol>{timeSlots}</ol>
    }

    storeTime = (e:any) => {
        const fullDate = e.target.dataset.time;
        // const fullTime;
        // console.log("e", e.target);
        // Get the selected date and value.
        // Update the store & pass to confirmation component
    }

    render(){
        const times = this.getTimes(new Date(), this.props.minuteInterval, this.props.startTime, this.props.endTime);
        return (
            <>
                {times}
            </>
        );
    }
}

export default TimePicker;