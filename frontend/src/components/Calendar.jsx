import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState(''); // New state for event location
  const { id } = useParams(); // Get the ID parameter from the URL

  // Return array of objects
  useEffect(() => {
    // Fetch events based on the ID parameter from the URL
    fetch(`http://localhost:8080/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Format dates before setting state
        const formattedEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date), // Format the date here
        }));
        console.log('Fetched data2:', formattedEvents);
        setEvents(formattedEvents);
      })
      .catch((error) => console.error('Error fetching events', error));
  }, [id]);

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  // Adds event based on date, title, details, and location
  const addEvent = () => {
    if (eventTitle.trim() === '' || eventDetails.trim() === '' || eventLocation.trim() === '') return;
    const newEvent = {
      date: date,
      title: eventTitle,
      details: eventDetails,
      location: eventLocation, // Include location in the new event object
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDetails('');
    setEventLocation(''); // Reset location field after adding event
  };

  // Renders event title, date, details, and location onto calendar tile
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const matchingEvents = events.filter((event) => {
        // Check if the date property is defined and not null
        if (event.date && event.date.toISOString) {
          return (
            event.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
          );
        }
        return false;
      });

      if (matchingEvents.length > 0) {
        return (
          <ul>
            {matchingEvents.map((event, index) => (
              <li key={index}>
                {event.title} at {event.location}
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
            onChange={(e) => setEventDetails(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event Location..." // Input field for event location
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
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
            {events.map((event, index) => (
              <li key={index}>
                {new Date(event.date).toDateString()} - {event.title} - {event.details} - {event.location}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
