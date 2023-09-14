import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import ScoreboardTennis from "./TennisScoreboard/ScoreboardTennis";
import ScoreboardBadminton from "./badmintonScoreboard/ScoreboardBadminton";

function Scoreboard() {
  const [currentUser , setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
    
  }, []);

  return (
    <>

      {currentUser && currentUser.user.username === "tennis" && (<ScoreboardTennis/> ) }
    {currentUser && currentUser.user.username === "basketball" && (<ScoreboardBadminton/> ) }
    </>
    /* <Grid item xs={12}>
          <Paper className="mainPaperPage">
            <Stack
             className="herderTitlePage">
              <div className="headerLeft">
                <IconButton>
                  <ScoreboardIcon sx={{ color: "primary.light" }} /> 
                </IconButton>
                <Typography variant="h6" className="headerTitle">
                  Scoreboard
                </Typography>
              </div>
              <div className="headerRight">
                <IconButton
                  onClick={resetScores}
                  className="header-button"
                  aria-label="Reset Scores"
                >
                    <RestartAltIcon sx={{ color: "secondary.main" }} />
                </IconButton>
                <IconButton className="header-button">
                   <PlayArrowIcon onClick={playScoring} sx={{ color: "secondary.main" }} />
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
