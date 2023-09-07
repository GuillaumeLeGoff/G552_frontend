import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./Badminton.css";
import scoringTennisService from "../../../../services/scoringTennisService";

function SettingsModal(props) {
  return (
    <Dialog open={props.open} onClose={props.onCloseModal}>
      <DialogTitle>Paramètres Badminton</DialogTitle>
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
                <Typography>Nom équipe 1</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.player1}
                  onChange={(e) => props.setPlayer1(e.target.value)}
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
                <Typography>Nom équipe 2</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.player2}
                  onChange={(e) => props.setPlayer2(e.target.value)}
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
                <TextField
                  value={props.numOfSets}
                  onChange={(e) => props.setNumOfSets(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              className="Param"
              container
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Nombre de sets max</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.maxSetPoints}
                  onChange={(e) => props.setMaxSetPoints(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ color: "secondary.main" }}
            onClick={props.handleOpenSettingsModal}
          >
            Valider
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
