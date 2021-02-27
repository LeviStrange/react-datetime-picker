import * as React from 'react';

export interface DatePickerProps {
    numDays:number
};

export interface DatePickerState {

};
class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    
    getDates = (startDate:Date, numberOfDays:number) => {
        const weekdaysList = [];
        const datesList = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr'];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < numberOfDays; ++i) {
            const weekDate = new Date(startDate.valueOf() + (1000 * 60 * 60 * 24 * i));
            if (i < 7) {
                weekdaysList.push(<li>{`${weekdays[weekDate.getDay()]}`}</li>);
            }
            datesList.push(<li><a data-date={weekDate} onClick={e => this.storeDate(e)}>{`${weekDate.getDate()} ${months[weekDate.getMonth()]}`}</a></li>);

        }
        return  <>
                    <ol className="weekdays-list">{weekdaysList}</ol>
                    <ol className="dates-list">{datesList}</ol>
                </>
    }

    storeDate = (e:any) => {
        const fullDate = e.target.dataset.date;
        // add fullDate to the mobx store file
        // Get the selected date and value.
        // Update the store & pass to confirmation component
    }

    render() {
        const dates = this.getDates(new Date(), this.props.numDays);
        
        return (
            <>
                {dates}
            </>
        ) 
    }
}

export default DatePicker;
