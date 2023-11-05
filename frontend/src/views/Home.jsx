import React, { useState, useEffect } from 'react';
import CalendarView from '../components/CalendarView';
import EventList from '../components/EventList';
import '../styles/Calendar.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar';
import HomePosts from '../components/HomePosts';
import "../styles/Home.css"

const Home = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]); 
  const [allPosts, setAllPosts] = useState([]); 
  const [communities, setCommunities] = useState([]); 
  const [isCalendarView, setIsCalendarView] = useState(true); 
  const { user } = useAuth0();

  console.log("user", user)

  // Fetch events based on the user.email
  useEffect(() => {
    fetch(`http://localhost:8080/home/events?user_id=${user.email}`, {
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

  // Fetch communities based on the user.email
  useEffect(() => {
    fetch(`http://localhost:8080/home/communities?user_id=${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCommunities(data);
      })
      .catch((error) => console.error('Error fetching communities', error));
  }, [user.email]);
  


  // Fetch posts based on the user.email
  useEffect(() => {
  fetch(`http://localhost:8080/home/posts?user_id=${user.name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => console.error('Error fetching communities', error));
}, [user.name]);

// Fetch all posts that user_id belongs to
useEffect(() => {
  fetch(`http://localhost:8080/home/AllPosts?user_id=${user.email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setAllPosts(data);
    })
    .catch((error) => console.error('Error fetching communities', error));
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
      <div className="communities">
      <h2>Communities</h2>
      <ul>
        {communities.map((community, index) => (
          <li key={index}>
            <img src={community.picture_url} alt={community.name} />
            {community.name}
          </li>
        ))}
      </ul>
    </div>
      <div className="toggle-buttons">
        <button onClick={toggleView}>Calendar View</button>
        <button onClick={toggleView}>Event List View</button>
      </div>
      {renderView()}
      <div className="posts">
  <HomePosts posts={posts} allPosts={allPosts}/>
</div>
    </div>
    
  );
};



export default Home;

