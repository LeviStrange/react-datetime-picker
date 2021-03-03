import * as React from 'react';
import { observer } from 'mobx-react';

interface ConfirmationProps {
    duration:number,
    date?:Date,
    time?:Date
};

interface ConfirmationState {

}

@observer
class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {
    
    render() {
        const ms = 1000 * 60 * this.props.duration;
        const date:Date|false = this.props.date as Date || false;
        const startTime:Date|false = this.props.time as Date || false;
        let timeSelected:boolean = false;
        let dateSelected:boolean = false;
        let endTime:Date = new Date();
        if (date) {
            dateSelected = true;
        }
        if (startTime) {
            timeSelected = true;
            endTime = new Date(startTime.getTime() + ms);
        }

        return (
            <div className="confirmation-container">
                <p>Please selected a date then time</p> 
                { dateSelected &&
                    <p>Date: {date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                }
                { dateSelected && timeSelected &&
                    <>
                        <p>Time: {`${startTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})} - ${endTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}`}</p>
                        <a className="next-step" {...startTime ? '' : 'disabled'}>NEXT</a>
                    </>
                }
                
            </div>
        )
    }
}
export default Confirmation;