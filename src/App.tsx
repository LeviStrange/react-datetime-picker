import * as React from 'react';
import logo from './logo.svg';
import DatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import './App.css';
import Confirmation from './components/Confirmation';

function App() {
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
      <DatePicker numDays={28}/>
      <TimePicker startTime={startTime} endTime={endTime} minuteInterval={minuteInterval}/>
      <Confirmation selectionTime={startTime} selectionDuration={60}/>
    </div>
  );
}

export default App;
