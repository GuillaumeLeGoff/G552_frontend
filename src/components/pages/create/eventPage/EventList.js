import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import eventService from "../../../../services/eventService";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import "../../../../styles/App.css";
import DeleteEventDialog from "../../../dialogs/DeleteEventDialog";
import AddEventDialog from "../../../dialogs/AddEventDialog";

function EventList({ onEventClick }) {
  useEffect(() => {
    getEvent();
  }, []);

  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  async function getEvent() {
    try {
      const result = await eventService.get();
      setEvent(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
    }
  }

  async function deleteEvent() {
    try {
      await eventService.delete(eventToDelete.id);
      closeDeleteDialog();
      getEvent();
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }
  async function addEvent() {
    console.log('addEvent');
    try {
      await eventService.create(name);
      toggleModal();
      getEvent();
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un événement :", error);
    }
  }

  function toggleModal() {
    console.log("toggleModal");
    setModalOpen(!modalOpen);
  }

  function handleRowHover(rowId) {
    setHoveredRow(rowId);
  }

  function openDeleteDialog(event) {
    console.log(event);
    setDeleteDialogOpen(true);
    setEventToDelete(event);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
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
                    <TableCell>{row.name}</TableCell>
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

      <DeleteEventDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={deleteEvent}
        eventName={eventToDelete && eventToDelete.name}
      />

      <AddEventDialog
        open={modalOpen}
        onClose={toggleModal}
        onAdd={addEvent}
        name={name}
        setName={setName}
      />
    </div>
  );
}
EventList.propTypes = {
  onEventClick: PropTypes.func.isRequired,
};

export default EventList;
