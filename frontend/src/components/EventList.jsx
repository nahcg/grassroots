import "../styles/EventList.css";

const EventList = ({ events }) => {
  return (
    <div className="EventList">
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