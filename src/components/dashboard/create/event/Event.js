import React, { useEffect, useState } from "react";
import EventParam from "./EventParam";
import EventList from "./EventList";
import { Paper } from "@mui/material";
import { Navigate, Route, Router, useNavigate, useParams } from "react-router-dom";

function Event({eventMedia,setEventMedia }) {

  const { id } = useParams()
  let navigate = useNavigate();
  function idEventClick(id) {
    console.log(id);
    navigate(`/create/${id}`);
    /* setSelectedEvent(event); */
    
  }
  useEffect(() => {
    console.log(id);
    }, []);

 

  return (
    <div>
         <Paper
        sx={{
          backgroundColor: "primary.main",
          position: "relative",
        }}
      >
      {id === undefined ? (
        <EventList onEventClick={idEventClick} />
      ) : (
        <EventParam eventMedia={eventMedia} setEventMedia={setEventMedia}id={id} onEventClick={idEventClick}/>
      )}
      </Paper>
    </div>
  );
}

export default Event;
