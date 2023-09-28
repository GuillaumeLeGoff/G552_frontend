import React, { useEffect, useState } from "react";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import DeleteIcon from "@mui/icons-material/Delete";

import eventService from "../../../services/eventService";
import DeleteEventDialog from "../../dialogs/DeleteEventDialog";
import AddEventDialog from "../../dialogs/AddEventDialog";

function DiaporamaList({ onEventClick }) {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const { t } = useTranslation();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    getEvent();
  }, []);

  async function getEvent() {
    const result = await eventService.get();
    console.log("result", result);
    setEvent(result);
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
    try {
      await eventService.create(name);
      toggleModal();
      getEvent();
      setName("");
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un événement :", error);
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function handleRowHover(rowId) {
    if (rowId === hoveredRow) {
      setHoveredRow(null);
    } else {
      setHoveredRow(rowId);
    }
  }

  function openDeleteDialog(event) {
    setDeleteDialogOpen(true);
    setEventToDelete(event);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  return (
    <Box>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <PermMediaIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("eventListTitle")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton className="headerButton" onClick={toggleModal}>
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Stack>

        {event && event.length ? (
          <Box className="containerPage">
            {event.map((row) => (
              <Table size="big" key={row.id}>
                <TableBody>
                  <TableRow
                    {...(isMobile
                      ? { onClick: () => handleRowHover(row.id) }
                      : {
                          onMouseEnter: () => handleRowHover(row.id),
                          onMouseLeave: () => handleRowHover(null),
                        })}
                    hover
                    onClick={() => onEventClick(row.id)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell sx={{ p: 0 }} align="right">
                      {hoveredRow === row.id && (
                        <IconButton
                          sx={{ p: 0 }}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(row);
                          }}
                        >
                          <DeleteIcon
                            sx={{ fontSize: 15, color: "secondary.main" }}
                          />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </Box>
        ) : (
          <Box className="infoPage">
            <Typography sx={{ color: "text.secondary" }}>
              {t("eventListEmptyText")}
            </Typography>
          </Box>
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
    </Box>
  );
}

export default DiaporamaList;
