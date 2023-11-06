import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css'


const CalendarView = ({ date, handleDateChange, tileContent }) => {
  return (
    <div className="CalendarView">
      <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
    </div>
  );
};

export default CalendarView;