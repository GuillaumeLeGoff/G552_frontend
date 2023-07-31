import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react'

function Scoreboard() {
    return (
        <Grid item xs={12}>
          <Paper className="mainPaper">
            <Stack
             className="headerSection">
              <div className="headerItemLeft">
                <IconButton>
          {/*         <ScoreboardIcon sx={{ color: "primary.light" }} /> */}
                </IconButton>
                <Typography variant="h6" className="headerTitle">
                  Scoreboard
                </Typography>
              </div>
              <div className="headerItemRight">
                <IconButton
                  /* onClick={resetScores} */
                  className="header-button"
                  aria-label="Reset Scores"
                >
                  {/*   <RestartAltIcon color="secondary" /> */}
                </IconButton>
                <IconButton className="header-button">
                  {/*  <PlayArrowIcon onClick={playScoring} color="secondary" /> */}
                </IconButton>
              </div>
            </Stack>
            <Box className="mainContaineTennis">
             
            </Box>
          </Paper>
        </Grid>
      );
}

export default Scoreboard