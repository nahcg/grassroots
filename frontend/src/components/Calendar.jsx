import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';
import '../App.css'
import EventButton from "../components/EventButton";
import { useAuth0 } from "@auth0/auth0-react";

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { community_id } = useParams(); // Get the ID parameter from the URL
  const { user, isLoading } = useAuth0();

  const routes = [
    { path: `/community/communities/${community_id}`, label: 'About' },
    { path: `/posts/${community_id}`, label: 'Forum' },
    { path: `/events/${community_id}`, label: 'Events' },
  ];

  // Return array of objects
  useEffect(() => {
    if (!isLoading && user) {
    // Fetch events based on the ID parameter from the URL
    fetch(`http://localhost:8080/events/${community_id}`)
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
  }
}, [isLoading, user, community_id]);


  const handleDateChange = newDate => {
    setDate(newDate);
  };



// add event
const addEvent = () => {
  if (eventTitle.trim() === '' || eventDescription.trim() === '' || eventLocation.trim() === '') return;

  // Format the date to YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];

  const newEvent = {
    community_id: community_id,
    title: eventTitle,
    description: eventDescription,
    date: formattedDate,
    location: eventLocation,
  };
  console.log("newEvent", newEvent);

  // Send a POST request to add the new event to the database
  fetch(`http://localhost:8080/events/${community_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
    .then((response) => response.json())
    .then((updatedEvent) => {
      console.log("updatedEvent", updatedEvent);
      // Update the state with the new event returned from the server
      setEvents([...events, updatedEvent]);
      setEventTitle('');
      setEventDescription('');
      setEventLocation('');
    })
    .catch((error) => console.error('Error adding event', error));
};




const editEvent = (event_id) => {
  // Find the selected event based on eventId
  const eventToEdit = events.find((event) => event.event_id === Number(event_id));

  if (eventToEdit) {
    // Set the selected event for editing
    setSelectedEvent(eventToEdit);
    setEventTitle(eventToEdit.title);
    setEventDescription(eventToEdit.description);
    setEventDate(eventToEdit.date);
    setEventLocation(eventToEdit.location);
    console.log("eventToEdit", eventToEdit)
  }
};

// Function to handle saving changes after editing the event
const handleSave = () => {
  if (!selectedEvent) return;

  const updatedEvent = {
    title: eventTitle,
    description: eventDescription,
    date: eventDate,
    location: eventLocation,
    event_id: selectedEvent.event_id, 
    community_id: selectedEvent.community_id 
  };
  console.log("updatedEvent1", updatedEvent)

  // Send a PUT request to update the event in the database
  fetch(`http://localhost:8080/events/${community_id}/${updatedEvent.event_id}`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("updatedEventOld", data)
      // Update the state with the updated event returned from the server
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) => {
          if (event.event_id === updatedEvent.event_id) {
            console.log("updatedEvent2", updatedEvent)
            return updatedEvent;
          }
          console.log("event", event)
          return event;
        });
        console.log("updatedEvents3", updatedEvents)
        return updatedEvents;
      });

      // Clear the form fields and selectedEvent state after saving changes
      setEventTitle('');
      setEventDescription('');
      setEventLocation('');
      setSelectedEvent(null);
    })
    .catch((error) => console.error('Error updating event', error));
};

const deleteEvent = (event_id) => {
  // Send a DELETE request to delete the event
  fetch(`http://localhost:8080/events/${community_id}/${event_id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      // Update the state to remove the deleted event from the events list
      setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== event_id));
    })
    .catch((error) => console.error('Error deleting event', error));
};




const renderForm = () => {
  if (selectedEvent) {
    // Render the form with pre-filled inputs if an event is selected
    return (
      <div className="event-form">
        <input
          type="text"
          placeholder="Event Title..."
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          placeholder="Event Details..."
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location..."
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    );
  }
  return null; // Return null if no event is selected
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
    <div className="CustomCalendar">
      <div className="calendar_links">
        {routes.map((route, index) => (
          <Link key={index} to={route.path}>
            <span className="route-link">{route.label}</span>
          </Link>
        ))}
      </div>
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <div className="custom-event-form">
          {/* Input fields for event title, details, and location */}
          <input
            type="text"
            placeholder="Event Title..."
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <textarea
            placeholder="Event Details..."
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event Location..."
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>

        {/* Calendar component */}
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          className="react-calendar"
        />

        <div className="custom-events">
          {/* Event list with edit and delete buttons */}
          <h1>Events:</h1>
          {renderForm()}
          <ul className="events">
          {events.map((event, index) => (
  <li key={index} className="event-item">
    <h3>{event.title}</h3>
    <p>{event.location}</p>
    <p>{event.description}</p>
    <p>Date: {new Date(event.date).toDateString()}</p>
    <div>
      <button className="edit-button" onClick={() => editEvent(event.event_id)}>
        Edit
      </button>
      <button className="delete-button" onClick={() => deleteEvent(event.event_id)}>
        Delete
      </button>
      <EventButton event_id={event.event_id} user_id={user.email} />
    </div>
  </li>
))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;