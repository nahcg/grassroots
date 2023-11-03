import React from 'react';

const EventList = ({ events, editEvent, deleteEvent }) => {
  return (
    <div className="events">
      <h2>Events:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {new Date(event.date).toDateString()} - {event.title} at {event.location} <br /> {event.description}
            <button onClick={() => editEvent(event.event_id)}>Edit</button>
            <button onClick={() => deleteEvent(event.event_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;