import React, { useState } from 'react';
import '../styles/Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const blanks = Array.from({ length: firstDay }, (_, index) => (
      <div key={`blank-${index}`} className="calendar-day empty"></div>
    ));

    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const eventCount = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === currentYear &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getDate() === day
        );
      }).length;

      return (
        <div key={`day-${index}`} className={`calendar-day ${eventCount > 0 ? 'has-events' : ''}`}>
          {day}
          {eventCount > 0 && <div className="event-count">{eventCount}</div>}
        </div>
      );
    });

    return [...blanks, ...days];
  };

  const prevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Method to add a new event
  const addEvent = () => {
    const newEvent = {
      date: date.toISOString(),
      // Other event properties can be added here
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={prevMonth}>
          {'<'}
        </button>
        <h1 className="calendar-month">
          {date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </h1>
        <button className="calendar-nav" onClick={nextMonth}>
          {'>'}
        </button>
        <button className="add-event-button" onClick={addEvent}>
          Add Event
        </button>
      </div>
      <div className="calendar-days-of-week">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-of-week">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;