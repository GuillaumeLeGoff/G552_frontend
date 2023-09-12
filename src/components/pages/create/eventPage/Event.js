import React from "react";
import EventParam from "./eventParam/EventParam";
import EventList from "./eventList/EventList";
import { useNavigate } from "react-router-dom";

function Event(props) {
  const navigate = useNavigate();

  function idEventClick(id) {;
    navigate(`/create/${id}`);
  }

  return (
    <div>
      {props.id === undefined ? (
        <EventList eventMedia={props.eventMedia} onEventClick={idEventClick} />
      ) : (
        <EventParam
        closeEvent={props.closeEvent}
          updateMedia={props.updateMedia}
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
