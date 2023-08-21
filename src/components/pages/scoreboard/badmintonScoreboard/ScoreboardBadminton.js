import React, { useEffect, useState } from "react";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

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
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";

import ScoringBadmintonService from "../../../../services/scoringBadmintonService";
import MacroShortcut from "../MacroShortcut";
import "./Badminton.css";

function ScoreboardBadminton() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [numOfSets, setNumOfSets] = useState("");
  const [maxSetPoints, setMaxSetPoints] = useState("");
  const [numOfPoints, setNumOfPoints] = useState(0);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [setsWonPlayer1, setSetsWonPlayer1] = useState(0);
  const [setsWonPlayer2, setSetsWonPlayer2] = useState(0);
  const [server, setServer] = useState("");
  const [timer, setTimer] = useState(0);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  useEffect(() => {
    ScoringBadmintonService.getAll().then((res) => {
      const data = res.data[0];
      console.log(data);
      setPlayer1(data.player1_name);
      setPlayer2(data.player2_name);
      setNumOfSets(data.number_of_sets);
      setMaxSetPoints(data.max_set_points);
      setScorePlayer1(data.score_player1);
      setScorePlayer2(data.score_player2);
      setSetsWonPlayer1(data.sets_won_player1);
      setSetsWonPlayer2(data.sets_won_player2);
      setNumOfPoints(data.points_per_set);
      setServer(data.server_name);
      setTimer(data.timer);
    });
  }, []);

  const [winner, setWinner] = useState("");

  const checkSetWinner = () => {
    let newSetsWonPlayer1 = setsWonPlayer1;
    let newSetsWonPlayer2 = setsWonPlayer2;

    if (scorePlayer1 >= numOfPoints && scorePlayer1 - scorePlayer2 >= 2) {
      newSetsWonPlayer1 += 1;
      setScorePlayer1(0);
      setScorePlayer2(0);
      setWinner(null);
    } else if (
      scorePlayer2 >= numOfPoints &&
      scorePlayer2 - scorePlayer1 >= 2
    ) {
      newSetsWonPlayer2 += 1;
      setScorePlayer1(0);
      setScorePlayer2(0);
      setWinner(null);
    } else if (scorePlayer1 >= maxSetPoints) {
      newSetsWonPlayer1 += 1;
      setScorePlayer1(0);
      setScorePlayer2(0);
      setWinner(null);
    } else if (scorePlayer2 >= maxSetPoints) {
      newSetsWonPlayer2 += 1;
      setScorePlayer1(0);
      setScorePlayer2(0);
      setWinner(null);
    }
    if (newSetsWonPlayer1 >= numOfSets) {
      setWinner(player1);
    } else if (newSetsWonPlayer2 >= numOfSets) {
      setWinner(player2);
    }
    setSetsWonPlayer1(newSetsWonPlayer1);
    setSetsWonPlayer2(newSetsWonPlayer2);
  };

  const handleScoreChangePlayer1 = async (increment) => {
    await setScorePlayer1((prevScore) => {
      const newScore = increment
        ? prevScore + 1
        : prevScore > 0
        ? prevScore - 1
        : 0;
      if (!increment && newScore === 0 && setsWonPlayer1 > 0) {
        setSetsWonPlayer1(setsWonPlayer1 - 1);
      }
  
      return newScore;
    });
    setWinner(null);
    checkSetWinner();
    changeServer(player1);
    updateScore();
    
    // Mettez à jour les données sur le serveur après avoir mis à jour le state
   
  };

  const handleScoreChangePlayer2 = (increment) => {
    setScorePlayer2((prevScore) => {
      const newScore = increment
        ? prevScore + 1
        : prevScore > 0
        ? prevScore - 1
        : 0;
      if (!increment && newScore === 0 && setsWonPlayer2 > 0) {
        setSetsWonPlayer2(setsWonPlayer2 - 1);
      }
      if (!increment) {
        setServer(player1);
      }
      return newScore;
    });
    setWinner(null);
    checkSetWinner();
    changeServer(player2);
    updateScore();
  };

   const updateScore = async () => {
    await ScoringBadmintonService.update({
      score_player1: scorePlayer1,
      score_player2: scorePlayer2,
      sets_won_player1: setsWonPlayer1,
      sets_won_player2: setsWonPlayer2,
      server_name: server,
    }); 
  }


  const changeServer = (player) => {
    if (player !== server) {
      setServer((prevServer) => (prevServer === player1 ? player2 : player1));
      updateScore();
    }
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
                <Typography variant={largeTypo}>
                  {player1} {winner ? "Winner" : null}
                </Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Set</Typography>
                    <Typography variant={medTypo}>{setsWonPlayer1}</Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Score</Typography>
                    <Typography variant={medTypo}>{scorePlayer1}</Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer1(true)}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer1(false)}>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
              <Grid className="gridItem" item xs={4}>
                <Typography variant={largeTypo} className="hiddenSpace">
                  hidden
                </Typography>

                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton
                      onClick={() => {
                        changeServer(player1);
                      }}
                    >
                      <WestIcon
                        className={
                          server === player1
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
                        changeServer(player2);
                      }}
                    >
                      <EastIcon
                        className={
                          server === player2
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
                    <Typography variant={medTypo}>timer</Typography>
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
              <Grid className="gridItem gridItemPadding" item xs={4}>
                <Typography variant={largeTypo}>{player2}</Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Set</Typography>
                    <Typography variant={medTypo}>{setsWonPlayer2}</Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Score</Typography>
                    <Typography variant={medTypo}> {scorePlayer2}</Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer2(true)}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer2(false)}>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Divider className="divider" />
            <MacroShortcut />
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default ScoreboardBadminton;
