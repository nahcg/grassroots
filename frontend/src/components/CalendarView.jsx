import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const CalendarComponent = ({ date, handleDateChange, tileContent }) => {
  return (
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
    </div>
  );
};

export default CalendarComponent;