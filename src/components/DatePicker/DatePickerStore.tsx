import { action, makeObservable, observable } from "mobx";


export class DatePickerStoreImpl {
    public selectedDate?:Date;
    constructor() {
        makeObservable(this, {
            selectedDate: observable,
            addDate: action
        }); 
    }
    addDate(dateTime:Date) {
        this.selectedDate = dateTime;
    }
}

export const DatePickerStore = new DatePickerStoreImpl();