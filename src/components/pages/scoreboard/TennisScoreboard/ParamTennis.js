import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./ParamTennis.css";
import scoringTennisService from "../../../../services/scoringTennisService";

function ParamTennis({ open, onCloseModal }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [numOfSets, setNumOfSets] = useState("");

  const [setType, setSetType] = useState("");
  const [decidingPoint, setDecidingPoint] = useState(false);
  const [tieBreak, setTieBreak] = useState(false);
  const [tieBreakInFinalSet, setTieBreakInFinalSet] = useState(false);

  useEffect(() => {
    scoringTennisService.getAll().then((res) => {
      console.log(res);
      const data = res.data[0];
      console.log(data);
      setPlayer1(data.player1_name);
      setPlayer2(data.player2_name);
      setNumOfSets(data.number_of_sets);
      setSetType(data.set_type);
      setDecidingPoint(data.deciding_point === 1 ? true : false);
      setTieBreak(data.tie_break === 1 ? true : false);
      setTieBreakInFinalSet(data.tie_break_in_final_set === 1 ? true : false);
    });
  }, []);

  const handleStartClick = () => {
    const decidingPointConvert = decidingPoint ? 1 : 0;
    const tieBreakConvert = tieBreak ? 1 : 0;
    const tieBreakInFinalSetConvert = tieBreakInFinalSet ? 1 : 0;
    const matchConfig = {
      player1,
      player2,
      numOfSets,

      setType,
      decidingPointConvert,
      tieBreakConvert,
      tieBreakInFinalSetConvert,
    };
    onCloseModal();
    scoringTennisService.updateMatchConfig(matchConfig).then((response) => {
      console.log(response);
    });
  };

  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle>Paramètres du Tennis</DialogTitle>
      <DialogContent>
        <Grid direction="row" justifyContent="center" container>
          <Grid item xs={12} md={5}>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Nom du joueur 1</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Nom du joueur 2</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Nombre de sets</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={numOfSets}
                    onChange={(e) => setNumOfSets(e.target.value)}
                  >
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
           
          </Grid>

          {/* <Divider className="divider" orientation="vertical" flexItem md={2} />

          <Grid item xs={12} md={5}>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Type du dernier set</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={setType}
                    onChange={(e) => setSetType(e.target.value)}
                  >
                    <MenuItem value={0}>Normal </MenuItem>
                    <MenuItem value={7}>(7 points)</MenuItem>
                    <MenuItem value={10}>Tie-Break (10 points)</MenuItem>

                    
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Point décisif </Typography>
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={decidingPoint}
                      onChange={(e) => setDecidingPoint(e.target.checked)}
                    />
                  }
                  label=""
                />
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Tie-Break</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={tieBreak}
                      onChange={(e) => setTieBreak(e.target.checked)}
                    />
                  }
                  label=""
                />
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Tie-Break dans le dernier set</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={tieBreakInFinalSet}
                      onChange={(e) => setTieBreakInFinalSet(e.target.checked)}
                    />
                  }
                  label=""
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStartClick}
          >
            Valider
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ParamTennis;
