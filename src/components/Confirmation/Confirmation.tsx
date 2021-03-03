import * as React from "react";
import { observer } from "mobx-react";

export interface ConfirmationProps {
    duration:number,
    date?:Date,
    time?:Date
};

export interface ConfirmationState {};

@observer
export default class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {
    
    render() {
        const timeSlotDurationMs:number = 1000 * 60 * this.props.duration;
        const date:Date = this.props.date;
        const startTime:Date = this.props.time;
        let timeSelected:boolean = false;
        let dateSelected:boolean = false;
        let endTime:Date = new Date();
        if (date) {
            dateSelected = true;
        }
        if (startTime) {
            timeSelected = true;
            endTime = new Date(startTime.getTime() + timeSlotDurationMs);
        }

        return (
            <div className="confirmation-container">
                <p>Please select a date then a time slot</p> 
                { dateSelected &&
                    <p>Date: {date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</p>
                }
                { dateSelected && timeSelected &&
                    <p>Time: {`${startTime.toLocaleString([], {hour: "2-digit", minute: "2-digit"})} - ${endTime.toLocaleString([], {hour: "2-digit", minute: "2-digit"})}`}</p> 
                }
                <button className="next-step" disabled={!timeSelected}>NEXT</button>
            </div>
        )
    }
}
