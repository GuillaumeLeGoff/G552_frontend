import React from "react";
import Media from "./Media";
import EventParam from "./EventParam";
import Grid from "@mui/material/Unstable_Grid2";
import { Accordion } from "@mui/material";

function Event() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={8}><EventParam/></Grid>
        <Grid xs={4}><Media/></Grid>
      </Grid>
    </div>
  );
}

export default Event;
