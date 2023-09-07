import React, { useEffect, useState } from "react";
import { TextField, useMediaQuery } from "@mui/material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import "./Scoreboard.css";
import ScoreService from "../../../services/scoreService";
import { io } from "socket.io-client";
import TimerPickerDialog from "../../dialogs/TimerPickerDialog";
import modeServiceInstance from "../../../services/modeService";

function ScoreboardPage() {
  const theme = useTheme();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Fautes, setTeam1Fautes] = useState(0);
  const [team2Fautes, setTeam2Fautes] = useState(0);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const iconSize = theme.breakpoints.down("sm") ? 15 : 24;
  const [timerValue, setTimerValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* const socket = io("ws://localhost:8080/ws/desk"); */

  useEffect(() => {
    async function fetchInitialScore() {
      try {
        const response = await ScoreService.getScores();
        const {
          score_team1,
          score_team2,
          faute_team1,
          faute_team2,
          nom_team1,
          nom_team2,
        } = response.data[0];
        setTeam1Score(score_team1);
        setTeam2Score(score_team2);
        setTeam1Fautes(faute_team1);
        setTeam2Fautes(faute_team2);
        setTeam1Name(nom_team1);
        setTeam2Name(nom_team2);
      } catch (error) {
        console.error("Error fetching initial score:", error);
      }
    }

    fetchInitialScore();
  }, []);

  /* useEffect(() => {
    socket.on("timerUpdate", (value) => {
      setTimerValue(value);
    });

    return () => {
      socket.off("timerUpdate");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("getTimerValue");

    socket.on("timerValue", (value) => {
      setTimerValue(value);
    });

    return () => {
      socket.off("timerValue");
    };
  }, [socket]); */

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const startTimer = () => {
   /*  socket.emit("startTimer"); */
  };

  const stopTimer = () => {
   /*  socket.emit("stopTimer"); */
  };

  const incrementScore = (team, add) => {
    if (team === 1) {
      setTeam1Score((prevScore) => prevScore + add);
      ScoreService.updateScore(
        team1Score + add,
        team2Score,
        team1Fautes,
        team2Fautes,
        team1Name,
        team2Name
      );
    } else if (team === 2) {
      setTeam2Score((prevScore) => prevScore + add);
      ScoreService.updateScore(
        team1Score,
        team2Score + add,
        team1Fautes,
        team2Fautes,
        team1Name,
        team2Name
      );
    }
  };

  const decrementScore = (team) => {
    if (team === 1 && team1Score > 0) {
      setTeam1Score((prevScore) => prevScore - 1);
      ScoreService.updateScore(
        team1Score - 1,
        team2Score,
        team1Fautes,
        team2Fautes,
        team1Name,
        team2Name
      );
    } else if (team === 2 && team2Score > 0) {
      setTeam2Score((prevScore) => prevScore - 1);
      ScoreService.updateScore(
        team1Score,
        team2Score - 1,
        team1Fautes,
        team2Fautes,
        team1Name,
        team2Name
      );
    }
  };

  const incrementFaute = (team, add) => {
    if (team === 1 && team1Fautes < 5) {
      setTeam1Fautes((prevFaute) => prevFaute + add);
      ScoreService.updateScore(
        team1Score,
        team2Score,
        team1Fautes + add,
        team2Fautes,
        team1Name,
        team2Name
      );
    } else if (team === 2 && team2Fautes < 5) {
      setTeam2Fautes((prevFaute) => prevFaute + add);
      ScoreService.updateScore(
        team1Score,
        team2Score,
        team1Fautes,
        team2Fautes + add,
        team1Name,
        team2Name
      );
    }
  };

  const decrementFaute = (team) => {
    if (team === 1 && team1Fautes > 0) {
      setTeam1Fautes((prevFaute) => prevFaute - 1);
      ScoreService.updateScore(
        team1Score,
        team2Score,
        team1Fautes - 1,
        team2Fautes,
        team1Name,
        team2Name
      );
    } else if (team === 2 && team2Fautes > 0) {
      setTeam2Fautes((prevFaute) => prevFaute - 1);
      ScoreService.updateScore(
        team1Score,
        team2Score,
        team1Fautes,
        team2Fautes - 1,
        team1Name,
        team2Name
      );
    }
  };

  const setTimer = (timerValue) => {
 /*    socket.emit("timerUpdate", timerValue); */
    setTimerValue(timerValue);
  };

  const resetScores = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Fautes(0);
    setTeam2Fautes(0);
    ScoreService.updateScore(0, 0, 0, 0);
  };

  const handleTeam1NameChange = (event) => {
    setTeam1Name(event.target.value);
    ScoreService.updateScore(
      team1Score,
      team2Score,
      team1Fautes,
      team2Fautes,
      event.target.value,
      team2Name
    );
  };

  const handleTeam2NameChange = (event) => {
    setTeam2Name(event.target.value);
    ScoreService.updateScore(
      team1Score,
      team2Score,
      team1Fautes,
      team2Fautes,
      team1Name,
      event.target.value
    );
  };

  function playScoring() {
    const mode = { mode: "scoring", eventId: null };
    modeServiceInstance.setMode(mode);
  }


  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
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
          <Box className="mainContainer">
            <Box className="middleContainer">
              <div className="teamContainer">
                <TextField
                  className="teamNameInput"
                  value={team1Name}
                  onChange={handleTeam1NameChange}
                  label="Nom équipe 1"
                  variant="standard"
                />
                <Paper
                  className="teamScore paper"
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Typography variant={isSmallScreen ? "h2" : "h1"}>
                    {team1Score}
                  </Typography>
                </Paper>
                <Box className="ControlsContainer">
                  {[1, 2, 3].map((add) => (
                    <Paper
                      key={add}
                      className="firstScoreButton"
                      elevation={2}
                      sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                      <IconButton
                        className="icôneButton"
                        onClick={() => incrementScore(1, add)}
                      >
                        <AddIcon sx={{ fontSize: iconSize }} />
                        <Typography>{add}</Typography>
                      </IconButton>
                    </Paper>
                  ))}

                  <Paper
                    className="secondScoreButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => decrementScore(1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Paper>
                </Box>
              </div>
              <div className="scoreSeparator">
                <Typography variant={isSmallScreen ? "h3" : "h1"}>-</Typography>
              </div>
              <div className="teamContainer">
                <TextField
                  className="teamNameInput"
                  value={team2Name}
                  onChange={handleTeam2NameChange}
                  label="Nom équipe 2"
                  variant="standard"
                />
                <Paper
                  className="teamScore paper"
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Typography variant={isSmallScreen ? "h2" : "h1"}>
                    {team2Score}
                  </Typography>
                </Paper>
                <Box className="ControlsContainer">
                  {[1, 2, 3].map((add) => (
                    <Paper
                      key={add}
                      className="firstScoreButton"
                      elevation={2}
                      sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                      <IconButton
                        className="icôneButton"
                        onClick={() => incrementScore(2, add)}
                      >
                        <AddIcon sx={{ fontSize: iconSize }} />
                        <Typography>{add}</Typography>
                      </IconButton>
                    </Paper>
                  ))}

                  <Paper
                    className="secondScoreButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => decrementScore(2)}
                    >
                      <RemoveIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                </Box>
              </div>
            </Box>
            <Box className="middleContainer">
              <Box className="fauteContainer">
                <Typography variant={isSmallScreen ? "h7" : "h5"}>
                  Faute
                </Typography>
                <Paper
                  className="paper paperFaute"
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Typography variant={isSmallScreen ? "h4" : "h3"}>
                    {team1Fautes}
                  </Typography>
                </Paper>
                <Box className="ControlsContainer">
                  <Paper
                    className="fauteButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => incrementFaute(1, 1)}
                    >
                      <AddIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                  <Paper
                    className="fauteButton fauteButtonMargin0"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => decrementFaute(1)}
                    >
                      <RemoveIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
              <Box className="timerContainer">
                <Paper
                  className="paper paperTimer"
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Box className="timerContainer">
                    <Box className="editTimerContainer">
                      <Typography
                        variant={isSmallScreen ? "h6" : "h5"}
                        className="timerValue"
                      >
                        {formatTime(timerValue)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <Box className="ControlsContainer">
                  <Paper
                    className="timerButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={startTimer}
                      aria-label="Start Timer"
                    >
                      <PlayArrowIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                  <Paper
                    className="timerButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={stopTimer}
                      aria-label="Stop Timer"
                    >
                      <PauseIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>

                  <Paper
                    className="timerButton margin-right-0"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={handleDialogOpen}
                      aria-label="Edit Timer"
                    >
                      <EditIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
              <Box className="fauteContainer">
                <Typography variant={isSmallScreen ? "h7" : "h5"}>
                  Faute
                </Typography>
                <Paper
                  className="paper paperFaute"
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Typography variant={isSmallScreen ? "h4" : "h3"}>
                    {team2Fautes}
                  </Typography>
                </Paper>
                <Box className="ControlsContainer">
                  <Paper
                    className="fauteButton"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => incrementFaute(2, 1)}
                    >
                      <AddIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                  <Paper
                    className="fauteButton fauteButtonMargin0"
                    elevation={2}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  >
                    <IconButton
                      className="icôneButton"
                      onClick={() => decrementFaute(2)}
                    >
                      <RemoveIcon sx={{ fontSize: iconSize }} />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
            </Box>

            <Box>
              <Paper
                className="PaperBuzzer"
                elevation={2}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              >
                <IconButton className="icôneButton" aria-label="Buzzer">
                  <SurroundSoundIcon sx={{ fontSize: iconSize }} />
                </IconButton>
              </Paper>
            </Box>
            <Box className="macroContainer">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((macroNumber) => (
                <Paper
                  key={macroNumber}
                  className={`macroButton${
                    macroNumber === 10 ? " macroButtonMargin0" : ""
                  }`}
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton className="icôneButton">
                    <Typography>{macroNumber}</Typography>
                  </IconButton>
                </Paper>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
      <TimerPickerDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        setTimer={setTimer}
      />
    </>
  );
}

ScoreboardPage.propTypes = {
  // Add prop types here
};

export default ScoreboardPage;
