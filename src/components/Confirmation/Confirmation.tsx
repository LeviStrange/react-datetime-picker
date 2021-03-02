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
        let timeSelected:boolean = false
        let endTime:Date = new Date();
        if (startTime) {
            timeSelected = true;
            endTime = new Date(startTime.getTime() + ms);
        }

        return (
            <div className="confirmation-container">
                <h2>Good choice!</h2>
                { timeSelected &&
                    <>
                        <p>{date}</p>
                        <p>Your slot is: {`${startTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})} - ${endTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}`}</p>
                        <a {...startTime ? '' : 'disabled'}>NEXT</a>
                    </>
                }
            </div>
        )
    }
}
export default Confirmation;