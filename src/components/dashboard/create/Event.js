import React from "react";
import Media from "./Media";

import Grid from "@mui/material/Unstable_Grid2";

function Event() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={8}></Grid>
        <Grid xs={4}><Media/></Grid>
      </Grid>
    </div>
  );
}

export default Event;
