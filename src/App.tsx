import * as React from 'react';

import { observer } from 'mobx-react';
import DatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import Confirmation from './components/Confirmation';

import { TimePickerStore } from './components/TimePicker/TimePickerStore';
import { DatePickerStore } from './components/DatePicker/DatePickerStore';

import './App.scss';
// I opted for Date as oppose to moment.js for customisability (?)
//  
const App = observer(() => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const startTimeInMs = 1000 * 60 * 60 * 6;
  const endTimeInMs = 1000 * 60 * 60 * 21.75;
  const minuteInterval = 15;
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  startTime.setTime(startTime.getTime() + startTimeInMs);
  const endTime = new Date();
  endTime.setHours(0, 0, 0, 0);
  endTime.setTime(endTime.getTime() + endTimeInMs);

  if (new Date() > endTime) {
    startTime.setTime(startTime.getTime() + dayInMs);
    endTime.setTime(endTime.getTime() + dayInMs);
  }
  return (
    <div className="App">
      <DatePicker datePickerStore={DatePickerStore} numDays={28}/>
      <TimePicker timePickerStore={TimePickerStore} startTime={startTime} endTime={endTime} minuteInterval={minuteInterval}/>
      <Confirmation date={DatePickerStore.selectedDate} time={TimePickerStore.selectedTime} duration={60}/>
    </div>
  );
})

export default App;
