import { action, makeObservable, observable } from "mobx";


export class DatePickerStoreImpl {
    public selectedDate?:Date;
    constructor() {
        makeObservable(this, {
            selectedDate: observable,
            addDate: action
        }); 
    }
    /**
     * syncs the user date selection to the selectedDate property
     * @param dateTime 
     */
    addDate(dateTime:Date) {
        this.selectedDate = dateTime;
    }
}

export const DatePickerStore = new DatePickerStoreImpl();