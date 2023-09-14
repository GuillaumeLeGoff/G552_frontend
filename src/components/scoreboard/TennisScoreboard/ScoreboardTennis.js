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
import scoringTennisService from "../../../services/scoringTennisService";

const scoreSequence = ["0", "15", "30", "40", "AD"];

function ScoreboardTennis() {
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [gamesPlayer1, setGamesPlayer1] = useState(0);
  const [gamesPlayer2, setGamesPlayer2] = useState(0);

  const [setsWonPlayer1, setSetsWonPlayer1] = useState(0);
  const [setsWonPlayer2, setSetsWonPlayer2] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [winner, setWinner] = useState(false);

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [numOfSets, setNumOfSets] = useState("");
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

    if (scorePlayer1 === 3 && scorePlayer2 === 3) {
      // Deuce
      console.log("Deuce");
      setScorePlayer1(4);
    } else if (newScore === 4 && scorePlayer2 === 4) {
      // Take advantage
      console.log("Take advantage");
      setScorePlayer1(4);
      setScorePlayer2(3);
    } else if (
      (scorePlayer1 === 3 && scorePlayer2 < 3) ||
      (scorePlayer1 === 4 && scorePlayer2 === 3)
    ) {
      // Player 1 wins the game
      console.log("Player 1 wins the game");
      setScorePlayer1(0);
      setScorePlayer2(0);

      let newGamesPlayer1 = gamesPlayer1 + 1;
      if (
        gamesPlayer1 >= 6 &&
        newGamesPlayer1 - gamesPlayer2 >= 2
      ) {
        //Tie-Break Standard (7 points)
        // player 1 wins the set
        if ( numOfSets === 3 && setsWonPlayer1 === 2 ) {
         
        // player 1 wins the match
        console.log("Player 1 wins the match");
        }else{
        // player 1 wins the set
        console.log("Player 1 wins the set");
        setGamesPlayer1(0);
        setGamesPlayer2(0);
        setSetsWonPlayer1(setsWonPlayer1 + 1);
        }
      } else {
        // Increment games by 1
        console.log("Increment games by 1");
        setGamesPlayer1(newGamesPlayer1);
      }
    } else {
      // Increment score by 15
      console.log("Increment score by 15");
      setScorePlayer1(newScore);
    }
  };

  const incrementScorePlayer2 = () => {
    let newScore = scorePlayer2 + 1;
  
    if (scorePlayer1 === 3 && scorePlayer2 === 3) {
      // Deuce
      console.log("Deuce");
      setScorePlayer2(4);
    } else if (newScore === 4 && scorePlayer1 === 4) {
      // Take advantage
      console.log("Take advantage");
      setScorePlayer2(4);
      setScorePlayer1(3);
    } else if (
      (scorePlayer2 === 3 && scorePlayer1 < 3) ||
      (scorePlayer2 === 4 && scorePlayer1 === 3)
    ) {
      // Player 2 wins the game
      console.log("Player 2 wins the game");
      setScorePlayer1(0);
      setScorePlayer2(0);
  
      let newGamesPlayer2 = gamesPlayer2 + 1;
      if (
        gamesPlayer2 >= 6 &&
        newGamesPlayer2 - gamesPlayer1 >= 2
      ) {
        //Tie-Break Standard (7 points)
        // player 2 wins the set
        if ( numOfSets === 3 && setsWonPlayer2 === 2 ) {
           
          // player 2 wins the match
          console.log("Player 2 wins the match");
        }else{
          // player 2 wins the set
          console.log("Player 2 wins the set");
          setGamesPlayer1(0);
          setGamesPlayer2(0);
          setSetsWonPlayer2(setsWonPlayer2 + 1);
        }
      } else {
        // Increment games by 1
        console.log("Increment games by 1");
        setGamesPlayer2(newGamesPlayer2);
      }
    } else {
      // Increment score by 15
      console.log("Increment score by 15");
      setScorePlayer2(newScore);
    }
  };


  const decrementScorePlayer1 = () => {
    let newScore = scorePlayer1 - 1;
    if (scorePlayer1 === 4 && scorePlayer2 === 3) {
      console.log("AD pour player 1 pas 2");
      setScorePlayer1(3);
      setScorePlayer2(3);
    } else if (scorePlayer1 === 3 && scorePlayer2 === 4) {
      setScorePlayer1(2);
      setScorePlayer2(3);
    } else if (scorePlayer1 > 0) {
      setScorePlayer1(newScore);
    } else if (gamesPlayer1 >= 1) {
      setGamesPlayer1(gamesPlayer1 - 1);
      setScorePlayer1(3); // Reset score to 40
    }
  };

  const decrementScorePlayer2 = () => {
    let newScore = scorePlayer2 - 1;
    if (scorePlayer2 === 4 && scorePlayer1 === 3) {
      console.log("AD pour player 2 pas 1");
      setScorePlayer1(3);
      setScorePlayer2(3);
    } else if (scorePlayer2 === 3 && scorePlayer1 === 4) {
      setScorePlayer2(2);
      setScorePlayer1(3);
    } else if (scorePlayer2 > 0) {
      setScorePlayer2(newScore);
    } else if (gamesPlayer2 >= 1) {
      setGamesPlayer2(gamesPlayer2 - 1);
      setScorePlayer2(3); // Reset score to 40
    }
  };
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
              <IconButton onClick={handleOpenModal}>
                <SettingsIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <IconButton className="header-button">
                {/*  <PlayArrowIcon onClick={playScoring} sx={{ color: "secondary.main" }} /> */}
              </IconButton>
            </div>
          </Stack>
          <Box display="flex" justifyContent="space-around">
            <Box>
              <Typography variant="h4">{player1}</Typography>
              <Typography variant="h5">
                Score: {scoreSequence[Math.min(scorePlayer1, 4)]}
              </Typography>
              <Typography variant="h6">Game gagnés: {gamesPlayer1}</Typography>
              <Typography variant="h6">Sets gagnés: {setsWonPlayer1}</Typography>
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
              <Typography variant="h6">
                {gamesPlayer1 === numOfSets
                  ? player1
                  : gamesPlayer2 === numOfSets
                  ? player2
                  : gamesPlayer1 === numOfSets - 1 &&
                    gamesPlayer2 === numOfSets - 1
                  ? "En cours"
                  : ""}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{player2}</Typography>
              <Typography variant="h5">
                Score: {scoreSequence[Math.min(scorePlayer2, 4)]}
              </Typography>
              <Typography variant="h6">Game gagnés: {gamesPlayer2}</Typography>
              <Typography variant="h6">Sets gagnés: {setsWonPlayer2}</Typography>
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
