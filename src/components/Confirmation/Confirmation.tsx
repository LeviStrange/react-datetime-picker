import * as React from 'react';

interface ConfirmationProps {
    selectionDuration:number,
    selectionTime:Date
};

interface ConfirmationState {

}

class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {

    render() {
        const ms = 1000 * 60 * this.props.selectionDuration;
        const selectionStartTime = this.props.selectionTime;
        const selectionEndTime = new Date(selectionStartTime.getTime() + ms);
        return (
            <>
                <h2>Good choice!</h2>
                <p>Your slot is: {`${selectionStartTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})} - ${selectionEndTime.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}`}</p>
                <button disabled>NEXT</button>
            </>
        )
    }
}
export default Confirmation;