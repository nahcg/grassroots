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
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { CommunityId } = useParams(); // Get the ID parameter from the URL
  

  // Return array of objects
  useEffect(() => {
    // Fetch events based on the ID parameter from the URL
    fetch(`http://localhost:8080/events/${CommunityId}`)
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
  }, [CommunityId]);


  const handleDateChange = newDate => {
    setDate(newDate);
  };



// add event
const addEvent = () => {
  if (eventTitle.trim() === '' || eventDetails.trim() === '' || eventLocation.trim() === '') return;
  
  // Format the date to YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];

  const newEvent = {
    CommunityId: CommunityId,
    title: eventTitle,
    details: eventDetails,
    date: formattedDate, 
    location: eventLocation
  };
  console.log("newEvent", newEvent)

  // Send a PUT request to update the events table with the new event
  fetch(`http://localhost:8080/events/${CommunityId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
    .then((response) => response.json())
    .then((updatedEvent) => {
      console.log("updatedEvent", updatedEvent)
      // Update the state with the new event returned from the server
      setEvents([...events, updatedEvent]);
      setEventTitle('');
      setEventDetails('');
      setEventLocation('');
    })
    .catch((error) => console.error('Error adding event', error));
};







const editEvent = (eventId) => {
  // Find the selected event based on eventId
  const eventToEdit = events.find((event) => event.eventid === Number(eventId));

  if (eventToEdit) {
    // Set the selected event for editing
    setSelectedEvent(eventToEdit);
    setEventTitle(eventToEdit.title);
    setEventDetails(eventToEdit.details);
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
    details: eventDetails,
    date: eventDate,
    location: eventLocation,
    eventid: selectedEvent.eventid, 
    communityid: selectedEvent.communityid 
  };
  console.log("updatedEvent1", updatedEvent)

  // Send a PUT request to update the event in the database
  fetch(`http://localhost:8080/events/${CommunityId}/${updatedEvent.eventid}`, {
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
          if (event.eventid === updatedEvent.eventid) {
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
      setEventDetails('');
      setEventLocation('');
      setSelectedEvent(null);
    })
    .catch((error) => console.error('Error updating event', error));
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
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
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
            {matchingEvents.map((event, EventId) => (
              <li key={EventId}>
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
          {renderForm()}
          <ul>
          {events.map((event, index) => (
  <li key={index}>
    {new Date(event.date).toDateString()} - {event.title} at {event.location} <br/> {event.details}
    <button onClick={() => editEvent(event.eventid)}>Edit</button> {/* Pass eventid as a parameter */}
  </li>
))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;