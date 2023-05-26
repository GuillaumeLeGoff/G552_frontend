import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import "./Scoreboard.css";
import { useTheme } from "@emotion/react";
import ScoreService from "../../../services/scoreService";

function ScoreboardPage() {
  const theme = useTheme();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

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

  const resetScores = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    ScoreService.updateScore(0, 0);
  }



  return (
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
            <IconButton className="header-button">
              <RestartAltIcon color="secondary" />
            </IconButton>
          </div>
        </Stack>
        {/* Compteur de scores */}
        <Box className="scoreContainer">
          <div className="teamContainer">
            <Typography variant="h2">Locaux</Typography>
            <Paper
              className="teamScore paper"
              elevation={2}
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <Typography variant="h1">{team1Score}</Typography>
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
                  <AddIcon />1
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
                  <AddIcon />2
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
                  <AddIcon />3
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
            <Typography variant="h1">-</Typography>
          </div>
          <div className="teamContainer">
            <Typography variant="h2">Visiteur</Typography>
            <Paper
              className="teamScore paper"
              elevation={2}
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <Typography variant="h1">{team2Score}</Typography>
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
                  <AddIcon />1
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
                  <AddIcon />2
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
                  <AddIcon />3
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
                <Typography variant="h4">01:00</Typography>
              </Box>
            </Box>
          </Paper>
          <Box className="ControlsContainer">
            <Paper
              className="firstScoreButton"
              elevation={2}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <IconButton className="playIcôneButton">
                <PlayArrowIcon />
              </IconButton>
            </Paper>
            <Paper
              className="firstScoreButton"
              elevation={2}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <IconButton className="playIcôneButton">
                <PauseIcon />
              </IconButton>
            </Paper>

            <Paper
              className="secondScoreButton"
              elevation={2}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <IconButton className="playIcôneButton">
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
  );
}

export default ScoreboardPage;
