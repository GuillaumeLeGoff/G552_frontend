import React from "react";
import Media from "./Media";
import EventList from "./EventList";
import Grid from "@mui/material/Grid";

function Event() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <EventList />
      </Grid>
      <Grid item xs={4}>
        <Media />
      </Grid>
    </Grid>
  );
}

export default Event;
