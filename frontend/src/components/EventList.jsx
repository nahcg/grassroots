const EventList = ({ events, editEvent, deleteEvent }) => {
  return (
    <div className="EventList">
      <h2>Events:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {new Date(event.date).toDateString()} - {event.title} at {event.location} <br /> {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;