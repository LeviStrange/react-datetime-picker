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
    /**
     * Tick function runs every minute re-rendering the
     * DOM in the case where the 'next-time' changes
     */
    tick(){
        this.count = this.count % 1000;
    };

    /**
     * syncs the user time selection to the selectedTime property
     * @param dateTime 
     */
    addTime(dateTime:Date) {
        this.selectedTime = dateTime;
    }
}

export const TimePickerStore = new TimePickerStoreImpl();
