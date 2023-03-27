import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import eventService from "../../../../services/eventService";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import "../../../../styles/App.css";

function EventList({ onEventClick }) {
  useEffect(() => {
    getEvent();
    console.log("event" + event);
  }, []);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  function getEvent() {
    eventService.get().then((result) => {
      setEvent(result.data);
    });
  }
  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function addEvent() {
    eventService.create(name).then(() => {
      toggleModal();
      getEvent();
    });
  }
  function handleRowHover(rowId) {
    setHoveredRow(rowId);
  }

  function openDeleteDialog(event) {
    setDeleteDialogOpen(true);
    setEventToDelete(event);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  function deleteEvent() {
    eventService.delete(eventToDelete.id).then(() => {
      closeDeleteDialog();
      getEvent();
    });
  }

  return (
    <div>
      <Paper
        style={{
          maxHeight: "calc(94vh - 56px )",
          minHeight: "calc(94vh - 56px )",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <PermMediaIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography color="white" sx={{ padding: 2 }}>
              Event
            </Typography>
          </div>
          <IconButton onClick={toggleModal}>
            <AddIcon color="secondary" />
          </IconButton>
        </Stack>

        {event !== undefined ? (
          event.length > 0 ? (
            event.map((row) => (
              <Table size="small" key={row.id}>
                <TableBody>
                  <TableRow 
                    onMouseEnter={() => handleRowHover(row.id)}
                    onMouseLeave={() => handleRowHover(null)}
                    hover
                    onClick={() => onEventClick(row.id)}
                    key={row.id}
                  >
                    <TableCell >{row.name}</TableCell>
                    <TableCell p={0} align="right">
                      {hoveredRow === row.id && (
                        <IconButton
                          sx={{ p: 0 }}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(row);
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 15 }} color="secondary" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))
          ) : (
            <Box className="Info">
              <Typography variant="body1" color="text.secondary">
                Ajouter event "+"
              </Typography>
            </Box>
          )
        ) : (
          ""
        )}
      </Paper>
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer l'événement{" "}
            {eventToDelete && eventToDelete.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={deleteEvent} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalOpen} onClose={toggleModal}>
        <DialogTitle>
          <Typography variant="h6">New Event</Typography>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={toggleModal}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            id="standard-basic"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button disableElevation sx={{ color: "white" }} onClick={addEvent}>
              Add
            </Button>
            <Button
              sx={{ color: "white" }}
              disableElevation
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventList;
