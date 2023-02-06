import React from "react";
import Media from "./media/Medias";
import Event from "./event/Event";
import Grid from "@mui/material/Grid";

function Create() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Event/>
      </Grid>
      <Grid item xs={4}>
        <Media />
      </Grid>
    </Grid>
  );
}

export default Create;
