import React, { useEffect, useState } from "react";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
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
import authService from "../../../services/authService";

import ScoreService from "../../../services/scoreService";
import MacroShortcut from "../MacroShortcut";
import SettingsModal from "./ParamBadminton";
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
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  useEffect(() => {
    getData().then((data) => {
      setUsestate(data);
      console.log("data01", data);

      if (!data.max_set_points) {
        initializeSetting(data);
      }
    });
  }, []);

  const [winner, setWinner] = useState("");

  const getData = async () => {
    const res = await ScoreService.getByUserId(
      authService.getCurrentUser().user.id
    );
    const data = res.data[0];
    return data;
  };

  const setUsestate = async (data) => {
    console.log("data02", data);
    setPlayer1(data.nom_team1);
    setPlayer2(data.nom_team2);
    setNumOfSets(data.number_of_sets);
    setMaxSetPoints(data.max_set_points);
    setScorePlayer1(data.score_team1);
    setScorePlayer2(data.score_team2);
    setSetsWonPlayer1(data.sets_team1);
    setSetsWonPlayer2(data.sets_team2);
    setNumOfPoints(data.points_per_set);
    setServer(data.server_name);
    setTimer(data.timer);
  };

  const initializeSetting = async (data) => {
    try {
      const score = {
        option1: 3,
        option2: 21,
        option3: 30,
        option4: null,
        option5: null,
        option6: null,
        option7: data.nom_team1,
        option8: null,
      };
      await ScoreService.updateSetting(authService.getCurrentUser().user.id, score);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la base de données",
        error
      );
    }
  };

  const checkSetWinner = async (newScorePlayer1, newScorePlayer2) => {
    let newSetsWonPlayer1 = setsWonPlayer1;
    let newSetsWonPlayer2 = setsWonPlayer2;

    // Mettre à jour le score et le serveur dans la base de données
    const updateDatabase = async (
      newScorePlayer1,
      newScorePlayer2,
      newSetsWonPlayer1,
      newSetsWonPlayer2,
      newServer
    ) => {
      try {
        await ScoreService.update({
          score_player1: newScorePlayer1,
          score_player2: newScorePlayer2,
          sets_won_player1: newSetsWonPlayer1,
          sets_won_player2: newSetsWonPlayer2,
          server_name: newServer,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la base de données",
          error
        );
      }
    };

    // Vérification pour le joueur 1
    if (
      newScorePlayer1 >= numOfPoints &&
      newScorePlayer1 - newScorePlayer2 >= 2
    ) {
      newSetsWonPlayer1 += 1;
      setServer(player2); // Changement de serveur
    }

    // Vérification pour le joueur 2
    else if (
      newScorePlayer2 >= numOfPoints &&
      newScorePlayer2 - newScorePlayer1 >= 2
    ) {
      newSetsWonPlayer2 += 1;
      setServer(player1); // Changement de serveur
    }

    // Mettre à jour les états locaux et la base de données
    await updateDatabase();

    // Vérifie si nous avons un gagnant
    if (newSetsWonPlayer1 >= numOfSets) {
      setWinner(player1);
    } else if (newSetsWonPlayer2 >= numOfSets) {
      setWinner(player2);
    }

    // Mettre à jour les états de sets gagnés
    setSetsWonPlayer1(newSetsWonPlayer1);
    setSetsWonPlayer2(newSetsWonPlayer2);
  };

  const handleScoreChangePlayer1 = async (increment) => {
    const newScore = increment
      ? scorePlayer1 + 1
      : Math.max(0, scorePlayer1 - 1);
    await checkSetWinner(newScore, scorePlayer2);
    setScorePlayer1(newScore);
  };

  const handleScoreChangePlayer2 = async (increment) => {
    const newScore = increment
      ? scorePlayer2 + 1
      : Math.max(0, scorePlayer2 - 1);
    await checkSetWinner(scorePlayer1, newScore);
    setScorePlayer2(newScore);
  };

  const changeServer = (player) => {
    if (player !== server) {
      setServer((prevServer) => (prevServer === player1 ? player2 : player1));
    }
  };

  const handleOpenSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const saveSettings = () => {
    // Mettre à jour les paramètres
    handleCloseSettingsModal();
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
              <IconButton className="header-button" aria-label="Reset Scores">
                <RestartAltIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <IconButton className="header-button">
                <PlayArrowIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <IconButton>
                <SettingsIcon
                  onClick={handleOpenSettingsModal}
                  sx={{ color: "secondary.main" }}
                />
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
      <Modal open={settingsModalOpen} onClose={handleCloseSettingsModal}>
        <SettingsModal
          open={settingsModalOpen}
          handleClose={handleCloseSettingsModal}
          saveSettings={saveSettings}
          player1={player1}
          setPlayer1={setPlayer1}
          player2={player2}
          setPlayer2={setPlayer2}
          numOfSets={numOfSets}
          setNumOfSets={setNumOfSets}
          maxSetPoints={maxSetPoints}
          setMaxSetPoints={setMaxSetPoints}
          numOfPoints={numOfPoints}
          setNumOfPoints={setNumOfPoints}
        />
      </Modal>
    </>
  );
}

export default ScoreboardBadminton;
