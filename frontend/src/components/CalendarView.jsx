import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ date, handleDateChange, tileContent }) => {
  return (
    <div className="CalendarView">
      <h1>Event Calendar</h1>
      <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
    </div>
  );
};

export default CalendarView;