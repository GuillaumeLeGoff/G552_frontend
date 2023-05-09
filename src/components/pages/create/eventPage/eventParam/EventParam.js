import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EventParam.css";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import eventMediaService from "../../../../../services/eventMediaService";
import eventService from "../../../../../services/eventService";
import "../../../../../styles/App.css";
import DeleteMediaEventDialog from "../../../../dialogs/DeleteMediaEventDialog";
import Media from "../eventMedia/EventMedia";
import DeleteEventDialog from "../../../../dialogs/DeleteEventDialog";

function EventParam(props) {
  const [event, setEvent] = useState({});
  const [deleteMediaDialogOpen, setDeleteMediaDialogOpen] = useState(false);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const [idEventMediaDelete, setIdEventMediaDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    props.getEvents();
    getMediasByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMediasByID() {
    eventService.getById(props.id).then((result) => {
      setEvent(result.data);
      props.getEvents();
    });
  }
  function handleRowHover(rowId) {
    setHoveredRow(rowId);
  }

  function openDeleteEventDialog() {
    setDeleteEventDialogOpen(true);
  }

  function closDeleteEventDialog() {
    setDeleteEventDialogOpen(false);
  }

  function openDeleteDialog(index) {
    setDeleteMediaDialogOpen(true);
    setIdEventMediaDelete(index);
  }

  function closeDeleteDialog() {
    setDeleteMediaDialogOpen(false);
    setIdEventMediaDelete(null);
  }

  async function deleteEventMedia() {
    const eventMediaDelete = props.eventMedia[0].medias[idEventMediaDelete];
    try {
      await eventMediaService.delete(id, eventMediaDelete);
      await getMediasByID();
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEvent() {
    try {
      await eventService.delete(event.id);
      closeDeleteDialog();
      navigate("/create");
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }
  function closeEvent() {props.closeEvent()}

  return (
    <div>
      <Paper className="mainPaper">
        <Stack className="headerSection">
          <div className="headerItemLeft">
            <IconButton
              className="header-button"
              onClick={() => {
                props.onEventClick("");
                closeEvent();
              }}
            >
              <CloseIcon color="secondary" />
            </IconButton>
            <IconButton className="main-header-button header-button">
              <PermMediaIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h7" className="headerTitle">
              Event: {event.name}
            </Typography>
          </div>
          <div className="headerItemRight">
            <IconButton
              className="header-button"
              onClick={openDeleteEventDialog}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
            <IconButton className="header-button">
              <PlayArrowIcon color="secondary" />
            </IconButton>
          </div>
        </Stack>

        <TableContainer
          sx={{
            maxHeight: "calc(94vh - 125px)",
            overflowY: "scroll",
            border: props.isDragging ? "1px dashed grey" : "none", // ajout de la bordure pointillée
          }}
        >
          <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <Droppable droppableId={`${props.eventMedia[0].id}`}>
              {(provided, snapshot) => (
                <TableBody ref={provided.innerRef}>
                  {props.eventMedia[0].medias.length ? (
                    props.eventMedia[0].medias.map((item, index) => (
                      <Media
                        updateMedia={props.updateMedia}
                        handleRowHover={handleRowHover}
                        openDeleteDialog={openDeleteDialog}
                        hoveredRow={hoveredRow}
                        key={item.id}
                        index={index}
                        item={item}
                      />
                    ))
                  ) : (
                    <Box className="Info">
                      <Typography variant="body1" color="text.secondary">
                        Drop medias here
                      </Typography>
                    </Box>
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </Paper>

      <DeleteEventDialog
        open={deleteEventDialogOpen}
        onClose={closDeleteEventDialog}
        onDelete={deleteEvent}
        eventName={event.name}
      />

      <DeleteMediaEventDialog
        open={deleteMediaDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={deleteEventMedia}
      />
    </div>
  );
}

export default EventParam;
