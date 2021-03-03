import * as React from 'react';
import { observer } from 'mobx-react';
import { DatePickerStoreImpl } from './DatePickerStore';
import {months, weekdays} from '../../config';
export interface DatePickerProps {
    datePickerStore: DatePickerStoreImpl,
    numDays:number
};

export interface DatePickerState {

};
@observer
class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    /**
     * using Date.now() and the quantity of numDays speciifed in config.js
     * render the dates into the UI
     * @param startDate 
     * @param numberOfDays 
     */
    getDates = (startDate:Date, numberOfDays:number) => {
        const weekdaysList = [];
        const datesList = [];
      
        for (let i = 0; i < numberOfDays; ++i) {
            const weekDate = new Date(startDate.valueOf() + (1000 * 60 * 60 * 24 * i));
            if (i < 7) {
                weekdaysList.push(<li>{`${weekdays[weekDate.getDay()]}`}</li>);
            }
            datesList.push(
                <li 
                    data-date={weekDate.getTime()} 
                    onClick={e => this.storeDate(e)}
                >
                    {`${weekDate.getDate()} ${months[weekDate.getMonth()]}`}
                </li>
            );
        }
        return  <>
                    <ol className="weekdays-list">{weekdaysList}</ol>
                    <ol className="dates-list">{datesList}</ol>
                </>
    }

    storeDate = (e:any) => {
        const fullDate:Date = new Date(parseInt(e.target.dataset.date));
        fullDate.setHours(0,0,0,0);
        this.props.datePickerStore.addDate(fullDate);
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
