import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventInputChange = (e) => {
    setEventText(e.target.value);
  };

  const addEvent = () => {
    if (eventText.trim() === '') return;
    const newEvent = {
      date: date,
      text: eventText,
    };
    setEvents([...events, newEvent]);
    setEventText('');
  };

  return (
    <div className="Calendar">
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <div className="event-form">
          <input
            type="text"
            placeholder="Enter event..."
            value={eventText}
            onChange={handleEventInputChange}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>
        <Calendar onChange={handleDateChange} value={date} />
        <div className="events">
          <h2>Events:</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                {event.date.toDateString()} - {event.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;