import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";

import ScoringBadmintonService from "../../../../services/scoringBadmintonService";
import "./Badminton.css";

function ScoreboardBadminton() {
  const theme = useTheme();

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [numOfSets, setNumOfSets] = useState("");

  useEffect(() => {
    ScoringBadmintonService.getAll().then((res) => {
      const data = res.data[0];
      console.log(data);
      setPlayer1(data.player1_name);
      setPlayer2(data.player2_name);
      setNumOfSets(data.number_of_sets);
    });
  }, []);
  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaper">
          <Stack className="headerSection">
            <div className="headerItemLeft">
              <IconButton>
                <ScoreboardIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" className="headerTitle">
                Scoreboard
              </Typography>
            </div>
            <div className="headerItemRight">
              <IconButton className="header-button" aria-label="Reset Scores">
                <RestartAltIcon color="secondary" />
              </IconButton>
              <IconButton className="header-button">
                <PlayArrowIcon color="secondary" />
              </IconButton>
              <IconButton>
                <SettingsIcon color="secondary" />
              </IconButton>
            </div>
          </Stack>
          <Box className="mainBox">
            <Grid container direction="row">
              <Grid className="gridItem" item xs={4}>
                <Typography variant="h4">{player1}</Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant="h4">Set</Typography>
                    <Typography variant="h3">0</Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant="h4">Score</Typography>
                    <Typography variant="h3">0</Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
              <Grid className="gridItem" item xs={4}>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton>
                      <WestIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton>
                      <EastIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>

                <Paper
                  elevation={2}
                  className=" itemPaperColor centered"
                  style={{ width: "100%" }}
                >
                  <Box className="centered column">
                    <Typography variant="h4">timer</Typography>
                    <Typography variant="h3">00:00</Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton>
                      <PlayArrowIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton>
                      <PauseIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
              <Grid className="gridItem gridItemPadding" item xs={4}>
                <Typography variant="h4">{player2}</Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant="h4">Score</Typography>
                    <Typography variant="h3">0</Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant="h4">Set</Typography>
                    <Typography variant="h3">0</Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Divider className="divider" />
            <Box className=" boxMacro scoreEditBox  centered">
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">1</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">2</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">3</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">4</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">5</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">6</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">7</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">8</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit buttonEditMargin itemPaperColor centered"
              >
                <Typography variant="h3">9</Typography>
              </Paper>
              <Paper
                elevation={2}
                className="buttonEdit itemPaperColor centered"
              >
                <Typography variant="h3">10</Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default ScoreboardBadminton;
