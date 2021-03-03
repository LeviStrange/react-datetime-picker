import * as React from 'react';

import { observer } from 'mobx-react';
import DatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import Confirmation from './components/Confirmation';

import { TimePickerStore } from './components/TimePicker/TimePickerStore';
import { DatePickerStore } from './components/DatePicker/DatePickerStore';
import Config from './config';
import './App.scss';
// I opted for Date as oppose to moment.js for customisability (?)
//  
const App = observer(() => {
  const selectedDate:Date = DatePickerStore.selectedDate || new Date();
  const startTime = new Date(0);
  startTime.setTime(startTime.getTime() + Config.startTimeInMs);
  const endTime = new Date(0);
  endTime.setTime(endTime.getTime() + Config.endTimeInMs);

  return (
    <div className="App">
      <DatePicker 
        datePickerStore={DatePickerStore} 
        numDays={Config.numDays}
      />
      <TimePicker 
        date={selectedDate}
        timePickerStore={TimePickerStore} 
        startTime={startTime} 
        endTime={endTime} 
        minuteInterval={Config.minuteInterval}
      />
      <Confirmation 
        date={DatePickerStore.selectedDate} 
        time={TimePickerStore.selectedTime} 
        duration={Config.duration}
      />
    </div>
  );
})

export default App;
