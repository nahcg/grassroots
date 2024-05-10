import React from "react";
import "../styles/CommunityListItem.css";

const CommunityListItem = ({
  name,
  description,
  location,
  cause_tag,
  created_on,
  communityPicture,
}) => {
  // Convert created_on to a Date object
  const createdDate = new Date(created_on);

  // Format the date as Month Day, Year
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(createdDate);

  return (
    <div className="community-list__item">
      <img
        src={communityPicture}
        alt="The community main pic"
        className="community-list__image"
      />
      <div className="community-list__info">
        <h4>{name}</h4>
        <p className="community-list__description">Description: {description}</p>
        <p>Location: {location}</p>
        {cause_tag === 1 && <p>Cause: Politics</p>}
        {cause_tag === 2 && <p>Cause: Environment</p>}
        {cause_tag === 3 && <p>Cause: Social</p>}
        <p>Created on: {formattedDate}</p>
      </div>
    </div>
  );
};

export default CommunityListItem;