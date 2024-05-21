import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/MemberButton.css";


const EventButton = ({ event_id }) => {
  const { user } = useAuth0();
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Fetch event members 
    fetch(`http://localhost:8080/eventmembers/${event_id}`)
      .then(response => response.json())
      .then(attendees => {
        console.log('Fetched attendees:', attendees);
        setIsJoined(attendees.some(attendee => attendee.user_id === user.email));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [user.email, event_id]);

  const handleMemberStatus = () => {
    const apiUrl = `http://localhost:8080/eventmembers/${event_id}`;
  
    if (isJoined) {
      // If the user is already an attendee, remove them from the event
      fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.email, event_id: event_id })
      })
      .then(response => response.json())
      .then(() => {
        setIsJoined(false);
      })
      .catch(error => {
        console.error('Error removing member:', error);
      });
    } else {
      // If the user is not a member, add them to the community
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.email, 
          event_id: event_id,
        })
      })
      .then(response => response.json())
      .then(() => {
        setIsJoined(true);
      })
      .catch(error => {
        console.error('Error adding member:', error);
      });
    }
  };

  return (
    <div>
      <button className={`member-button ${isJoined ? 'member' : ''}`} onClick={handleMemberStatus}>
        {isJoined ? 'You are part of this event!' : 'Join Event'}
      </button>
    </div>
  );
};

export default EventButton;