import React from "react";
import PropTypes from "prop-types";
import EventParam from "./EventParam";
import EventList from "./EventList";
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

Event.propTypes = {
  id: PropTypes.string,
  updateMedia: PropTypes.func,
  getEvents: PropTypes.func,
  eventMedia: PropTypes.arrayOf(PropTypes.object),
  setEventMedia: PropTypes.func,
  isDragging: PropTypes.bool,
};

export default Event;