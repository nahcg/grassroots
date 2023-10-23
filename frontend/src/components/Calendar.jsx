import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };


  const addEvent = () => {
    if (eventTitle.trim() === '' || eventDetails.trim() === '') return;
    const newEvent = {
      date: date,
      title: eventTitle,
      details: eventDetails,
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDetails('');
  };

  // Function to determine whether a date has events and return the event texts
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const matchingEvents = events.filter((event) => {
        return (
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
        );
      });
  
      if (matchingEvents.length > 0) {
        return (
          <ul>
            {matchingEvents.map((event, index) => (
              <li key={index}>
                {event.title}
              </li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  return (
    <div className="Calendar">
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <div className="event-form">
  <input
    type="text"
    placeholder="Event Title..."
    value={eventTitle}
    onChange={(e) => setEventTitle(e.target.value)}
  />
  <textarea
    placeholder="Event Details..."
    value={eventDetails}
    onChange={(e) => setEventDetails(e.target.value)}>
    </textarea>
  <button onClick={addEvent}>Add Event</button>
</div>
        
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
        />
        <div className="events">
          <h2>Events:</h2>
          <ul>
          <ul>
  {events.map((event, index) => (
    <li key={index}>
      {event.date.toDateString()} - {event.title} - {event.details}
    </li>
  ))}
</ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
