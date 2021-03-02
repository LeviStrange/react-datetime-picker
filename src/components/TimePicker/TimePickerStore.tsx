import { action, makeObservable, observable } from "mobx";

export class TimePickerStoreImpl {
    public selectedTime?:Date;
    public count:number = 0;
    constructor() {
        makeObservable(this, {
            selectedTime: observable,
            count: observable,
            addTime: action,
            tick: action
        });
        setInterval(() => {
            this.tick()
        }, 60000); 
    }

    tick(){
        ++this.count;
    };

    addTime(dateTime:Date) {
        this.selectedTime = dateTime;
    }
}

export const TimePickerStore = new TimePickerStoreImpl();
