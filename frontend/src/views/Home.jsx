import React, { useState, useEffect } from 'react';
import CalendarView from '../components/CalendarView';
import EventList from '../components/EventList';
import '../styles/Calendar.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isCalendarView, setIsCalendarView] = useState(true); // State to manage calendar view
  const { user } = useAuth0();
  const user_id = user.email;

  // Fetch events based on the ID parameter from the URL
  useEffect(() => {
    fetch(`http://localhost:8080/home?user_id=${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Format dates before setting state
        const formattedEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error('Error fetching events', error));
  }, [user.email]);

  const toggleView = () => {
    setIsCalendarView(!isCalendarView); // Toggle between calendar and event list view
  };

  const renderView = () => {
    if (isCalendarView) {
      return <CalendarView tileContent={tileContent} events={events} />;
    } else {
      return <EventList events={events} />;
    }
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
          {matchingEvents.map((event, event_id) => (
            <li key={event_id}>
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
    <div className='Home'>
      <Navbar />
      <div className="toggle-buttons">
        <button onClick={toggleView}>Calendar View</button>
        <button onClick={toggleView}>Event List View</button>
      </div>
      {renderView()}
    </div>
  );
};

export default Home;

