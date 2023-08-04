import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import authService from "../../../services/authService";
import ScoreboardTennis from "./TennisScoreboard/ScoreboardTennis";

function Scoreboard() {
  const [currentUser , setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
    
  }, []);

  return (
    <>

      {currentUser && currentUser.user.username === "tennis" && (<ScoreboardTennis/> ) }
    {currentUser && currentUser.user.username === "basketball" && (<ScoreboardTennis/> ) }
    </>
    /* <Grid item xs={12}>
          <Paper className="mainPaper">
            <Stack
             className="headerSection">
              <div className="headerItemLeft">
                <IconButton>
                  <ScoreboardIcon sx={{ color: "primary.light" }} /> 
                </IconButton>
                <Typography variant="h6" className="headerTitle">
                  Scoreboard
                </Typography>
              </div>
              <div className="headerItemRight">
                <IconButton
                  onClick={resetScores}
                  className="header-button"
                  aria-label="Reset Scores"
                >
                    <RestartAltIcon color="secondary" />
                </IconButton>
                <IconButton className="header-button">
                   <PlayArrowIcon onClick={playScoring} color="secondary" />
                </IconButton>
              </div>
            </Stack>
            <Box className="mainContaineTennis">
             
            </Box>
          </Paper>
        </Grid> */
  );
}

export default Scoreboard;
