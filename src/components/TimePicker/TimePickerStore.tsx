import { action, makeObservable, observable } from "mobx";

export class TimePickerStoreImpl {
    public selectedTime?:Date;
    public count:number = 0;
    constructor() {
        makeObservable(this, {
            selectedTime: observable,
            count: observable,
            selectTime: action,
            deselectTime: action,
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
     * select the user time selection
     * @param dateTime 
     */
    selectTime(dateTime:Date) {
        this.selectedTime = dateTime;
    }

    /**
     * deselects the user time selection
     */
    deselectTime() {
        this.selectedTime = null;
    }
}

export const TimePickerStore = new TimePickerStoreImpl();
