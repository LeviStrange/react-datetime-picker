import * as React from "react";
import { observer } from "mobx-react";
import { TimePickerStoreImpl } from "./TimePickerStore";

export interface TimePickerProps {
    minuteInterval:number,
    date:Date,
    startTime:Date,
    endTime:Date,
    timePickerStore:TimePickerStoreImpl,
};

export interface TimePickerState {};

@observer
export default class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {
    private _selectedTimeSlot:HTMLElement;

    protected get selectedTimeSlot():HTMLElement {
        return this._selectedTimeSlot;
    }
    /**
     * For the purposes of this demo I have used this for UI state,
     * for larger scale projects I'd ensure that the UI state is in sync
     * with the store state.
     */
    protected set selectedTimeSlot(value:HTMLElement) {
        if (this._selectedTimeSlot) {
            this._selectedTimeSlot.classList.remove("selected");
            this.props.timePickerStore.deselectTime();
        }
        if (!value || value.className !== "past-time") {
            if (this._selectedTimeSlot !== value) {
                this._selectedTimeSlot = value;
            } else {
                this._selectedTimeSlot = null;
            }
        }
        
        if (this._selectedTimeSlot) {
            const newSelectedDate:Date = new Date(parseInt(this._selectedTimeSlot.dataset.time as string));
            this._selectedTimeSlot.classList.add("selected");
            this.props.timePickerStore.selectTime(newSelectedDate);  
        }
    }
    

    /**
     * Returns the nearest minute interval as specified in the config.js
     * and returns the Date
     * @param timeSlotIntervalMs 
     * @param startTime 
     * @param endTime 
     */
    getNextTimeSlot = (timeSlotIntervalMs:number, startTime:Date, endTime:Date) => {
        let nextTimeSlot = new Date(Math.ceil(Date.now() / timeSlotIntervalMs) * timeSlotIntervalMs);
        if (nextTimeSlot > endTime || nextTimeSlot < startTime) {
            nextTimeSlot = startTime;  
        }
        return nextTimeSlot;
    };

    /**
     * Returns all time slots between startTime and endTime incremented by
     * the minutes param
     * @param date 
     * @param minutes 
     * @param startTime 
     * @param endTime 
     */
    getTimes = (date:Date, minutes:number, startTime:Date, endTime:Date) => {
        const timeSlots:Array<JSX.Element> = [];
        const dayMs:number = 1000 * 60 * 60 * 24;
        const timeSlotIntervalMs:number = 1000 * 60 * minutes;
        startTime = new Date(date.getTime() + startTime.getTime());
        endTime = new Date(date.getTime() + endTime.getTime()); 
        if (new Date() > endTime) {
            startTime.setTime(startTime.getTime() + dayMs);
            endTime.setTime(endTime.getTime() + dayMs);
        }

        let nextTimeSlot = this.getNextTimeSlot(timeSlotIntervalMs, startTime, endTime);
        for (let i = startTime; i <= endTime; i = new Date(i.getTime() + (timeSlotIntervalMs))) {
            let timeClass = i < nextTimeSlot ? "past-time" : "";
            timeClass = i.getTime() === nextTimeSlot.getTime() ? "next-time" : timeClass;
            timeSlots.push(
                <li 
                    data-time={i.getTime()} 
                    onClick={e => this.storeTime(e)} 
                    className={timeClass}
                >
                    {i.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}   
                </li>
            );    
        };

        return <ol className="times-list">{timeSlots}</ol>
    }

    storeTime = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
        const selectedTimeSlot:HTMLElement = e.target as HTMLElement;
        this.selectedTimeSlot = selectedTimeSlot;
    }

    render(){
        const count:number = this.props.timePickerStore.count;
        const storeDate:Date = new Date(this.props.timePickerStore.selectedTime || 0);
        storeDate.setHours(0,0,0,0);
        const date:Date = this.props.date || new Date();
        date.setHours(0,0,0,0);
        
        if (date.getTime() !== storeDate.getTime()) {
            this.selectedTimeSlot = null;
        }
        const times:JSX.Element = this.getTimes(date, this.props.minuteInterval, this.props.startTime, this.props.endTime);
        return (
            <>
                {times}
            </>
        );
    }
}
