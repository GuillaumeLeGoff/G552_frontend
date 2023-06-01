import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
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

function ScoreboardPage() {
  const theme = useTheme();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const iconSize = theme.breakpoints.down('sm') ? 15 : 24;
  const [timerValue, setTimerValue] = useState(0);
  const [DialogOpen, setDialogOpen] = useState(false);

  const socket = io("ws://localhost:8080/ws/desk");
  useEffect(() => {
    // Écoute de l'événement "timerUpdate" émis par le serveur
    socket.on("timerUpdate", (value) => {
      console.log("timerUpdate", value);
      setTimerValue(value);
    });
  }, []);

  useEffect(() => {
    socket.emit("getTimerValue");
    socket.on("timerValue", (value) => {
      setTimerValue(value);
      console.log("Valeur du minuteur :", value); // Affichage dans la console
    });
    return () => {
      socket.off("timerValue");
    };
  }, []);

  // Fonction de conversion du temps total (en secondes) en format "minutes:secondes"
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  function handleDialogOpen() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }
  const startTimer = () => {
    socket.emit("startTimer");
  };

  const stopTimer = () => {
    socket.emit("stopTimer");
  };
 

  function incrementTeam1Score(add) {
    setTeam1Score(team1Score + add);
    ScoreService.updateScore(team1Score + add, team2Score);
  }

  const decrementTeam1Score = () => {
    if (team1Score > 0) {
      setTeam1Score((prevScore) => prevScore - 1);
      ScoreService.updateScore(team1Score - 1, team2Score);
    }
  };

  const incrementTeam2Score = () => {
    setTeam2Score((prevScore) => prevScore + 1);
    ScoreService.updateScore(team1Score, team2Score + 1);
  };

  const decrementTeam2Score = () => {
    if (team2Score > 0) {
      setTeam2Score((prevScore) => prevScore - 1);
      ScoreService.updateScore(team1Score, team2Score - 1);
    }
  };
  function setTimer(timerValue) {
    console.log("setTimer", timerValue);
    socket.emit("timerUpdate", timerValue);
    setTimerValue(timerValue);
  }

  const resetScores = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    ScoreService.updateScore(0, 0);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaper">
          <Stack className="headerSection">
            <div className="headerItemLeft">
              <IconButton>
                <ScoreboardIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant='h6' className="headerTitle">
                Scoreboard
              </Typography>
            </div>
            <div className="headerItemRight">
              <IconButton className="header-button">
                <RestartAltIcon  color="secondary" />
              </IconButton>
            </div>
          </Stack>
          <Box className="scoreContainer">
            <div className="teamContainer">
              <Typography variant={isSmallScreen ? 'h5' : 'h3'}>Locaux</Typography>
              <Paper
                className="teamScore paper"
                elevation={2}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <Typography  variant={isSmallScreen ? 'h2' : 'h1'}>{team1Score}</Typography>
              </Paper>
              <Box className="ControlsContainer">
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam1Score(1)}
                  >
                     <AddIcon sx={{ fontSize: iconSize }}/><Typography>1</Typography>
                  </IconButton>
                </Paper>
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam1Score(2)}
                  >
                     <AddIcon sx={{ fontSize: iconSize }}/><Typography>2</Typography>
                  </IconButton>
                </Paper>
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam1Score(3)}
                  >
                    <AddIcon sx={{ fontSize: iconSize }}/><Typography>3</Typography>
                  </IconButton>
                </Paper>

                <Paper
                  className="secondScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={decrementTeam1Score}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Paper>
              </Box>
            </div>
            <div className="scoreSeparator">
              <Typography variant={isSmallScreen ? 'h3' : 'h1'}>-</Typography>
            </div>
            <div className="teamContainer">
              <Typography variant={isSmallScreen ? 'h5' : 'h3'}>Visiteur</Typography>
              <Paper
                className="teamScore paper"
                elevation={2}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <Typography variant={isSmallScreen ? 'h2' : 'h1'}>{team2Score}</Typography>
              </Paper>
              <Box className="ControlsContainer">
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam2Score(1)}
                  >
                    <AddIcon sx={{ fontSize: iconSize }}/><Typography>1</Typography>
                  </IconButton>
                </Paper>
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam2Score(2)}
                  >
                    <AddIcon sx={{ fontSize: iconSize }}/><Typography>2</Typography>
                  </IconButton>
                </Paper>
                <Paper
                  className="firstScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={() => incrementTeam2Score(3)}
                  >
                     <AddIcon sx={{ fontSize: iconSize }}/><Typography>3</Typography>
                  </IconButton>
                </Paper>

                <Paper
                  className="secondScoreButton"
                  elevation={2}
                  sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                  <IconButton
                    className="scoreIcôneButton"
                    onClick={decrementTeam2Score}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Paper>
              </Box>
            </div>
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
                  <Typography ariant={isSmallScreen ? 'h4' : 'h3'}>{formatTime(timerValue)}</Typography>
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
                  onClick={() => {
                    startTimer();
                  }}
                  className="timerIcon"
                >
                  <PlayArrowIcon />
                </IconButton>
              </Paper>
              <Paper
                className="timerButton"
                elevation={2}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              >
                <IconButton
                  onClick={() => {
                    stopTimer();
                  }}
                  className="timerIcon"
                >
                  <PauseIcon />
                </IconButton>
              </Paper>

              <Paper
                className="timerButton margin-right-0"
                elevation={2}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              >
                <IconButton
                  onClick={() => {
                    handleDialogOpen();
                  }}
                  className="timerIcon"
                >
                  <EditIcon />
                </IconButton>
              </Paper>
            </Box>
          </Box>

          <Box className="timerContainer">
            <Paper
              className="PaperBuzzer"
              elevation={2}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <IconButton className="BuzzerButton">
                <SurroundSoundIcon />
              </IconButton>
            </Paper>
          </Box>
        </Paper>
      </Grid>
      <TimerPickerDialog
        open={DialogOpen}
        onClose={handleDialogClose}
        setTimer={setTimer}
      />
    </>
  );
}

export default ScoreboardPage;
