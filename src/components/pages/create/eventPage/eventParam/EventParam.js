import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EventParam.css";
import SlideshowIcon from "@mui/icons-material/Slideshow";
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
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [idEventMediaDelete, setIdEventMediaDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    props.getEvents();
    getMediasByID();
    console.log("result", props.eventMedia[0].medias);
    console.log("result", props.eventMedia[0].medias);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // trier les medias par media_pos_in_event
    const sortedMedias = props.eventMedia[0]?.medias.sort(
      (a, b) => a.media_pos_in_event - b.media_pos_in_event
    );

    if (activeMediaIndex < sortedMedias.length) {
      setCurrentMedia(sortedMedias[activeMediaIndex]);
      const timer = setTimeout(() => {
        if (activeMediaIndex === sortedMedias.length - 1) {
          setActiveMediaIndex(0); // réinitialiser à zéro à la fin du tableau
        } else {
          setActiveMediaIndex((prevIndex) => prevIndex + 1);
        }
      }, sortedMedias[activeMediaIndex].media_dur_in_event * 1000); // convertir en millisecondes

      // Nettoyer le timer lors du démontage du composant
      return () => clearTimeout(timer);
    }
  }, [activeMediaIndex, props.eventMedia]);
  function getMediasByID() {
    eventService.getById(props.id).then((result) => {
      setEvent(result.data);
      console.log("result", props.eventMedia[0].medias);
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

  function openPlayModal() {
    setIsPlayModalOpen(true);
  }

  function closePlayModal() {
    setIsPlayModalOpen(false);
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
  function closeEvent() {
    props.closeEvent();
  }

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
            <IconButton onClick={openPlayModal} className="header-button">
              <SlideshowIcon color="secondary" />
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

      <Modal open={isPlayModalOpen} onClose={closePlayModal}>
        <Box className="modalBox">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div className="modalHeader">
              <IconButton>
                <PlayArrowIcon
                  sx={{ color: "primary.light" }}
                  className="uploadIcon"
                />
              </IconButton>
              <Typography variant="h6" className="modalHeaderText">
                Play
              </Typography>
            </div>

            <IconButton onClick={closePlayModal}>
              <CloseIcon color="secondary" />
            </IconButton>
          </Stack>
          <Box className="diapoImage">
            {currentMedia &&
              (currentMedia.type === "image" ? (
                <img
                  src={currentMedia.path}
                  alt={`Media ${activeMediaIndex}`}
                />
              ) : currentMedia.type === "video" ? (
                <video src={currentMedia.path} controls />
              ) : null)}
          </Box>
        </Box>
      </Modal>

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
