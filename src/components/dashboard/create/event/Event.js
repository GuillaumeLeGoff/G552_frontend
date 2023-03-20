import React from "react";
import EventParam from "./EventParam";
import EventList from "./EventList";
import { useNavigate } from "react-router-dom";

function Event(props) {
  let navigate = useNavigate();
  function idEventClick(id) {
    console.log(id);
    navigate(`/create/${id}`);
  }
  return (
    <div>
      {props.id === undefined ? (
        <EventList   eventMedia={props.eventMedia} onEventClick={idEventClick} />
      ) : (
        <EventParam
        getEvents={props.getEvents}
          eventMedia={props.eventMedia}
          setEventMedia={props.setEventMedia}
          id={props.id}
          isDragging={props.isDragging}
          onEventClick={idEventClick}
        />
      )}
    </div>
  );
}

export default Event;
