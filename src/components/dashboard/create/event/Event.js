import React from "react";
import EventParam from "./EventParam";
import EventList from "./EventList";
import { useNavigate } from "react-router-dom";

function Event({ eventMedia, setEventMedia, id }) {
  let navigate = useNavigate();
  function idEventClick(id) {
    console.log(id);
    navigate(`/create/${id}`);
  }
  return (
    <div>
      {id === undefined ? (
        <EventList onEventClick={idEventClick} />
      ) : (
        <EventParam
          eventMedia={eventMedia}
          setEventMedia={setEventMedia}
          id={id}
          onEventClick={idEventClick}
        />
      )}
    </div>
  );
}

export default Event;
