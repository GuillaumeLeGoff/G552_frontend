import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
import PlusOneIcon from "@mui/icons-material/PlusOne";

import scoreServiceInstance from "../../../services/scoreService";
import FutsalSetting from "./FutsalSetting";
import modeServiceInstance from "../../../services/modeService";

function Futsal() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    getData().then((data) => {
      setGameState(data);
    });
  }, []);

  const getData = async () => {
    const res = await scoreServiceInstance.getByUserId();
    const data = res.data[0];
    return data;
  };

  const updateGameState = async (nameValue, value) => {
    value = value + gameState[nameValue];
    if (value < 0) {
      value = 0;
    }
    if ((nameValue === "option1" || nameValue === "option2") && value > 5) {
      value = 0;
    }
    setGameState({ ...gameState, [nameValue]: value });
    updateDB(nameValue, value);
  };

  const resetGame = async () => {
    const newGameState = {
      score_team1: 0,
      score_team2: 0,
      option1: 0,
      option2: 0,
      option3: 0,
      option4: 0,
    };

    setGameState((prevState) => ({ ...prevState, ...newGameState }));
    for (let key in newGameState) {
      await updateDB(key, newGameState[key]);
    }
  };

  const updateDB = async (nameValue, value) => {
    await scoreServiceInstance.update({ [nameValue]: value });
  };

  const toggleSettingModal = () => {
    setIsSettingOpen((prevState) => !prevState);
  };

  function playScoring() {
    const mode = { mode: "scoring", eventId: null };
    modeServiceInstance.setMode(mode);
  }

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <SportsSoccerIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Tableau de score Football
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton className="headerButton">
              <RestartAltIcon
                onClick={resetGame}
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
            <IconButton className="headerButton">
              <PlayArrowIcon onClick={playScoring} sx={{ color: "secondary.main" }} />
            </IconButton>
            <IconButton className="headerButton">
              <SettingsIcon
                onClick={toggleSettingModal}
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
          </Box>
        </Stack>
        <Box className="containerPage">
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-end"
            direction="row"
            spacing={2}
          >
            <Grid className="gridItem " item xs={4}>
              <Typography variant={largeTypo}>{gameState.nom_team1}</Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
                onClick={() => {
                  updateGameState("score_team1", 1);
                }}
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {gameState.score_team1}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                  onClick={() => {
                    updateGameState("score_team1", 1);
                  }}
                >
                  <IconButton>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                  onClick={() => {
                    updateGameState("score_team1", -1);
                  }}
                >
                  <IconButton>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                  sx={{ position: "relative" }}
                  onClick={() => {
                    updateGameState("option1", 1);
                  }}
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Faute</Typography>
                    <Typography variant={medTypo}>
                      {gameState.option1}
                    </Typography>
                  </Box>
                  <PlusOneIcon
                    m={4}
                    variant={medTypo}
                    sx={{ position: "absolute", bottom: "0", right: "0" }}
                    color="primary"
                  />
                </Paper>
              </Box>
            </Grid>

            <Grid className="gridItem" item xs={4}>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor buttonEditMargin centered"
                >
                  <IconButton
                    onClick={() => {
                      updateGameState("option7", gameState.nom_team1);
                    }}
                  >
                    <WestIcon
                      className={
                        gameState.option7 === gameState.nom_team1
                          ? "iconServeurTrue"
                          : "iconServeurFalse"
                      }
                    />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor centered"
                >
                  <IconButton
                    onClick={() => {
                      updateGameState("option7", gameState.nom_team2);
                    }}
                  >
                    <EastIcon
                      className={
                        gameState.option7 === gameState.nom_team2
                          ? "iconServeurTrue"
                          : "iconServeurFalse"
                      }
                    />
                  </IconButton>
                </Paper>
              </Box>
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
              <Paper
                elevation={2}
                className="buttonEdit itemPaperColor centered"
              >
                <Box className="centered column">
                  <IconButton>
                    <SurroundSoundIcon color="primary" />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>

            <Grid className="gridItem" item xs={4}>
              <Typography variant={largeTypo}>{gameState.nom_team2}</Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
                onClick={() => {
                  updateGameState("score_team2", 1);
                }}
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {gameState.score_team2}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                  onClick={() => {
                    updateGameState("score_team2", 1);
                  }}
                >
                  <IconButton>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                  onClick={() => {
                    updateGameState("score_team2", -1);
                  }}
                >
                  <IconButton>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                  sx={{ position: "relative" }}
                  onClick={() => {
                    updateGameState("option2", 1);
                  }}
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Faute</Typography>{" "}
                    <Typography variant={medTypo}>
                      {gameState.option2}
                    </Typography>
                  </Box>
                  <PlusOneIcon
                    m={4}
                    variant={medTypo}
                    sx={{ position: "absolute", bottom: "0", right: "0" }}
                    color="primary"
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Box className="divider" />
          <MacroShortcut />
        </Box>
      </Paper>
      <FutsalSetting
        open={isSettingOpen}
        onClose={toggleSettingModal}
        gameState={gameState}
        setGameState={setGameState}
        updateDB={updateDB}
      />
    </Grid>
  );
}

export default Futsal;
