import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import PauseIcon from "@mui/icons-material/Pause";
import CircleIcon from "@mui/icons-material/Circle";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import EditIcon from "@mui/icons-material/Edit";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import MacroShortcut from "../MacroShortcut";
import PlusOneIcon from '@mui/icons-material/PlusOne';

function Basket() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <SportsBasketballIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Tableau de Basketball
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton className="headerButton">
              <RestartAltIcon
                /* onClick={resetGame} */
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
            <IconButton className="headerButton">
              <PlayArrowIcon sx={{ color: "secondary.main" }} />
            </IconButton>
            <IconButton className="headerButton">
              <SettingsIcon
                /* onClick={handleOpenSettingsModal} */
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
          </Box>
        </Stack>

        <Box className="containerPage" sx={{}}>
          <Grid container direction="row">
            <Grid className="gridItem" item xs={4}>
              <Typography variant={largeTypo}>
                {/* {gameState.team1} */}
              </Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {/*  {gameState.scoreTeam1} */}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <AddIcon color="primary" /> 2
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <AddIcon color="primary" /> 3
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                >
                  <IconButton>
                    <RemoveIcon color="primary" /> 1
                  </IconButton>
                </Paper>
              </Box>
              <Box className="scoreEditBox centered">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Paper
                      elevation={2}
                      className="itemPaperTypo itemPaperColor centered"
                      sx={{ position: "relative" }}
                    >
                      <Box className="centered column">
                        <Typography variant={largeTypo}>Faute</Typography>
                      </Box>
                      <PlusOneIcon
                        m={4}
                        variant={medTypo}
                        sx={{ position: "absolute", bottom: "0", right: "0" }}
                        color="primary"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper
                      elevation={2}
                      className="itemPaperTypo itemPaperColor centered"
                    >
                      <Box className="centered column">
                        <Grid direction="column" container>
                          {" "}
                          <Grid item>
                            <CircleIcon color="primary" />
                          </Grid>
                          <Grid item>
                            <CircleIcon color="primary" />
                          </Grid>
                          <Grid item>
                            <CircleIcon color="primary" />
                          </Grid>{" "}
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid className="gridItem" item xs={4}>
              <Typography variant={largeTypo} className="hiddenSpace">
                Quart Actuel
              </Typography>
              <Paper
                elevation={2}
                className=" itemPaperColor buttonEdit centered"
                style={{ width: "100%" }}
              >
                <Box className="centered column">
                  <Typography variant={medTypo}>
                    {/* {gameState.currentQuarter} */}
                  </Typography>
                </Box>
              </Paper>
              <Paper
                elevation={2}
                className=" itemPaperColor buttonEdit centered"
                style={{ width: "100%" }}
              >
                <Box className="centered column">
                  <Typography variant={medTypo}>Timer</Typography>
                  <Typography variant={medTypo}>00:00</Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <PlayArrowIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <PauseIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                >
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
            </Grid>

            <Grid className="gridItem gridItemPadding" item xs={4}>
              <Typography variant={largeTypo}>
                {/* {gameState.team2} */}
              </Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {/* {gameState.scoreTeam2} */}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor buttonEditMargin centered"
                >
                  <IconButton /* onClick={() => handleScoreChangeTeam2(1)} */>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor centered"
                >
                  <IconButton /* onClick={() => handleScoreChangeTeam2(2)} */>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor centered"
                >
                  <IconButton /* onClick={() => handleScoreChangeTeam2(3)} */>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Box className="divider" />
          <MacroShortcut />
        </Box>
      </Paper>
    </Grid>
  );
}

export default Basket;
