import { action, makeObservable, observable } from "mobx";


export class DatePickerStoreImpl {
    public selectedDate?:Date;
    constructor() {
        makeObservable(this, {
            selectedDate: observable,
            selectDate: action,
            deselectDate: action
        }); 
    }
    /**
     * select the user date selection
     * @param dateTime 
     */
    selectDate(dateTime:Date) {
        this.selectedDate = dateTime;
    }

    /**
     * deselects the user date selection
     */
    deselectDate() {
        this.selectedDate = null;
    }
}

export const DatePickerStore = new DatePickerStoreImpl();