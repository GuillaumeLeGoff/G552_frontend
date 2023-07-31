import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import ParamTennis from "./ParamTennis";
import scoringTennisService from "../../../../services/scoringTennisService";

const scoreSequence = ["0", "15", "30", "40"];

function ScoreboardTennis() {
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [setsWonPlayer1, setSetsWonPlayer1] = useState(0);
  const [setsWonPlayer2, setSetsWonPlayer2] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [numOfSets, setNumOfSets] = useState("");
  const [gamesPerSet, setGamesPerSet] = useState("");
  const [lastSetType, setLastSetType] = useState("");
  const [decidingPoint, setDecidingPoint] = useState(false);
  const [tieBreak, setTieBreak] = useState(false);
  const [tieBreakInFinalSet, setTieBreakInFinalSet] = useState(false);

  useEffect(() => {
    scoringTennisService.getAll().then((res) => {
      const data = res.data[0];
      console.log(data);
      setPlayer1(data.player1_name);
      setPlayer2(data.player2_name);
      setNumOfSets(data.number_of_sets);
      setGamesPerSet(data.games_per_set);
      setLastSetType(data.last_set_type);
      setDecidingPoint(data.deciding_point === 1 ? true : false);
      setTieBreak(data.tie_break === 1 ? true : false);
      setTieBreakInFinalSet(data.tie_break_in_final_set === 1 ? true : false);
    });
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  

  const incrementScorePlayer1 = () => {
    let newScore = scorePlayer1 + 1;
    if (newScore > 3 && newScore > scorePlayer2 + 1) {
        if (setsWonPlayer1 < numOfSets - 1) {
            // Player 1 wins the game
            setSetsWonPlayer1(setsWonPlayer1 + 1);
            setScorePlayer1(0);
            setScorePlayer2(0); // Reset score of player 2 as well
        } else {
            // Player 1 has reached the maximum number of sets, do not increment anymore.
            // Perhaps you could signal that the game has ended here.
        }
    } else {
        setScorePlayer1(newScore);
    }
};

  const decrementScorePlayer1 = () => {
    if (scorePlayer1 > 0) {
      setScorePlayer1(scorePlayer1 - 1);
    } else if (setsWonPlayer1 > 0) {
      setSetsWonPlayer1(setsWonPlayer1 - 1);
      setScorePlayer1(3); // Reset score to 40
    }
  };

  const incrementScorePlayer2 = () => {
    let newScore = scorePlayer2 + 1;
    if (newScore > 3 && newScore > scorePlayer1 + 1) {
      // Player 2 wins the game
      setSetsWonPlayer2(setsWonPlayer2 + 1);
      setScorePlayer2(0);
    } else {
      setScorePlayer2(newScore);
    }
  };

  const decrementScorePlayer2 = () => {
    if (scorePlayer2 > 0) {
      setScorePlayer2(scorePlayer2 - 1);
    } else if (setsWonPlayer2 > 0) {
      setSetsWonPlayer2(setsWonPlayer2 - 1);
      setScorePlayer2(3); // Reset score to 40
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
              <IconButton onClick={handleOpenModal}>
                <SettingsIcon color="secondary" />
              </IconButton>
              <IconButton className="header-button">
                {/*  <PlayArrowIcon onClick={playScoring} color="secondary" /> */}
              </IconButton>
            </div>
          </Stack>
          <Box display="flex" justifyContent="space-around">
            <Box>
              <Typography variant="h4">{player1}</Typography>
              <Typography variant="h5">
                Score: {scoreSequence[Math.min(scorePlayer1, 3)]}
              </Typography>
              <Typography variant="h6">
                Sets gagnés: {setsWonPlayer1}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={incrementScorePlayer1}
              >
                +
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={decrementScorePlayer1}
              >
                -
              </Button>
            </Box>
            <Box>
              <Typography variant="h4">{player2}</Typography>
              <Typography variant="h5">
                Score: {scoreSequence[Math.min(scorePlayer2, 3)]}
              </Typography>
              <Typography variant="h6">
                Sets gagnés: {setsWonPlayer2}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={incrementScorePlayer2}
              >
                +
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={decrementScorePlayer2}
              >
                -
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <ParamTennis open={openModal} onCloseModal={handleCloseModal} />
    </>
  );
}

export default ScoreboardTennis;
