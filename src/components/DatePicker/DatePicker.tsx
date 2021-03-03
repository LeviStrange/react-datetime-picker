import * as React from "react";
import { observer } from "mobx-react";
import { DatePickerStoreImpl } from "./DatePickerStore";
import { Config } from "../../config";
export interface DatePickerProps {
    datePickerStore: DatePickerStoreImpl,
    numDays:number
};

export interface DatePickerState {};
@observer
export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

    private _selectedDate:HTMLElement;

    protected get selectedDate():HTMLElement {
        return this._selectedDate;
    }
    /**
     * For the purposes of this demo I have used this for UI state,
     * for larger scale projects I'd ensure that the UI state is in sync
     * with the store state.
     */
    protected set selectedDate(value:HTMLElement) {
        if (this._selectedDate) {
            this._selectedDate.classList.remove("selected");
            this.props.datePickerStore.deselectDate();
        }

        
        if (this._selectedDate !== value) {
            this._selectedDate = value;
        } else {
            this._selectedDate = null;
        }
    
        if (this._selectedDate) {
            const newSelectedDate:Date = new Date(parseInt(this._selectedDate.dataset.date as string));
            newSelectedDate.setHours(0,0,0,0);
            this._selectedDate.classList.add("selected");
            this.props.datePickerStore.selectDate(newSelectedDate);  
        }
    }

    /**
     * using Date.now() and the quantity of numDays speciifed in config.js
     * render the dates into the UI
     * @param startDate 
     * @param numberOfDays 
     */
    getDates = (startDate:Date, numberOfDays:number) => {
        const weekdaysList:Array<JSX.Element> = [];
        const datesList:Array<JSX.Element> = [];
      
        for (let i = 0; i < numberOfDays; ++i) {
            const weekDate:Date = new Date(startDate.valueOf() + (1000 * 60 * 60 * 24 * i));
            if (i < 7) {
                weekdaysList.push(<li>{`${Config.weekdays[weekDate.getDay()]}`}</li>);
            }
            datesList.push(
                <li 
                    data-date={weekDate.getTime()} 
                    onClick={e => this.storeDate(e)}
                >
                    {`${weekDate.getDate()} ${Config.months[weekDate.getMonth()]}`}
                </li>
            );
        }
        return  <>
                    <ol className="weekdays-list">{weekdaysList}</ol>
                    <ol className="dates-list">{datesList}</ol>
                </>
    }

    storeDate = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
        const selectedDate:HTMLElement = e.target as HTMLElement;
        this.selectedDate = selectedDate
    }

    render() {
        const dates:JSX.Element = this.getDates(new Date(), this.props.numDays);
        return (
            <>
                {dates}
            </>
        ) 
    }
}
