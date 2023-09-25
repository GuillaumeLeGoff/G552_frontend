import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import PauseIcon from "@mui/icons-material/Pause";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import MacroShortcut from "../MacroShortcut";
import PlusOneIcon from "@mui/icons-material/PlusOne";

import scoreService from "../../../services/scoreService";

function Volleyball() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [gameState, setGameState] = useState({});
  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setGameState(data);
    });
  }, []);
  /* 
        "option1": "number_of_sets"
        "option2": "points_per_set"
        "option3": "points_last_set"
        "option4": "sets_team1"
        "option5": "sets_team2"
*/
  const getData = async () => {
    const res = await scoreService.getByUserId();
    const data = res.data[0];
    return data;
  };

  const updateGameState = async (nameValue, value) => {
  
    setGameState({ ...gameState, [nameValue]: newValue });
    await updateDB(nameValue, newValue);

    // Si vous mettez à jour le score d'une équipe, vérifiez si elle a gagné un set.
    if (nameValue === "score_team1" || nameValue === "score_team2") {
      let newValue = value + gameState[nameValue];
    if (newValue < 0) {
        newValue = 0;
        }
        if (newValue > gameState.option2) {
            if ( gameState.option4 + gameState.option5 + 1 === gameState.option1){
                setGameState({ ...gameState, score_team1: 0, score_team2: 0, option: gameState.option4 + 1 });
            if (nameValue === "score_team1"){
                setGameState({ ...gameState, score_team1: 0, score_team2: 0, option: gameState.option4 + 1 });
                await updateDB("score_team1", 0);
                await updateDB("score_team2", 0);
                await updateDB("sets_team1", gameState.sets_team1 + 1);
            }else if (nameValue === "score_team2"){
                setGameState({ ...gameState, score_team1: 0, score_team2: 0, option: gameState.option5 + 1 });
                await updateDB("score_team1", 0);
                await updateDB("score_team2", 0);
                await updateDB("sets_team2", gameState.sets_team2 + 1);
            }

      // Vérifiez si le score de l'équipe est supérieur aux points par set ou aux points du dernier set.
      /* if (newValue >= gameState.option2 && newValue > otherTeamScore) {
        setGameState({ ...gameState, [teamSet]: gameState[teamSet] + 1 });
        await updateDB(teamSet, gameState[teamSet] + 1);
        // Remettre les scores à zéro
        setGameState({ ...gameState, score_team1: 0, score_team2: 0 });
        await updateDB("score_team1", 0);
        await updateDB("score_team2", 0);
      } */

      // Pour le dernier set
     /*  else if (
        gameState[teamSet] === gameState.number_of_sets - 1 &&
        newValue >= gameState.option3 &&
        newValue > otherTeamScore
      ) {
        setGameState({ ...gameState, [teamSet]: gameState[teamSet] + 1 });
        await updateDB(teamSet, gameState[teamSet] + 1);
        // Remettre les scores à zéro
        setGameState({ ...gameState, score_team1: 0, score_team2: 0 });
        await updateDB("score_team1", 0);
        await updateDB("score_team2", 0);
      } */
    }
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
    await scoreService.update({ [nameValue]: value });
  };

  const toggleSettingModal = () => {
    setIsSettingOpen((prevState) => !prevState);
  };

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <SportsVolleyballIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Tableau de score Volleyball
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
              <PlayArrowIcon sx={{ color: "secondary.main" }} />
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
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Set</Typography>
                  <Typography variant={medTypo}>{gameState.option4}</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
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
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Set</Typography>
                  <Typography variant={medTypo}>{gameState.option5}</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
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
            </Grid>
          </Grid>
          <Box className="divider" />
          <MacroShortcut />
        </Box>
      </Paper>
      {/*      <BasketballSetting
          open={isSettingOpen}
          onClose={toggleSettingModal}
          gameState={gameState}
          setGameState={setGameState}
          updateDB={updateDB}
        /> */}
    </Grid>
  );
}

export default Volleyball;
