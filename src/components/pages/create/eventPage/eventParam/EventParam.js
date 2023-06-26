import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import PauseIcon from "@mui/icons-material/Pause";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import eventService from "../../../../../services/eventService";
import eventMediaService from "../../../../../services/eventMediaService";
import DeleteEventDialog from "../../../../dialogs/DeleteEventDialog";
import DeleteMediaEventDialog from "../../../../dialogs/DeleteMediaEventDialog";
import Media from "../eventMedia/EventMedia";
import "./EventParam.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function EventParam(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [deleteMediaDialogOpen, setDeleteMediaDialogOpen] = useState(false);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [idEventMediaDelete, setIdEventMediaDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  useEffect(() => {
    props.getEvents();
    getMediasByID();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("activeMediaIndex");
    var sortedMedias = "";
    if (props.eventMedia[0]?.medias.length > 0) {
      sortedMedias = props.eventMedia[0]?.medias.sort(
      (a, b) => a.media_pos_in_event - b.media_pos_in_event
    );
    }

    if (activeMediaIndex < sortedMedias.length) {
      setCurrentMedia(sortedMedias[activeMediaIndex]);
      if (isAutoPlayEnabled) {
        const timer = setTimeout(() => {
          if (activeMediaIndex === sortedMedias.length - 1) {
            setActiveMediaIndex(0);
          } else {
            setActiveMediaIndex((prevIndex) => prevIndex + 1);
          }
        }, sortedMedias[activeMediaIndex].media_dur_in_event * 1000);

        return () => clearTimeout(timer);
      }
    }
   
  }, [ props.eventMedia, isAutoPlayEnabled]);

  async function getMediasByID() {
    try {
      const result = await eventService.getById(props.id);
      setEvent(result.data);
      props.getEvents();
    } catch (error) {
      console.error("Erreur lors de la récupération des médias :", error);
    }
  }

  function handlePreviousSlide() {
    if (activeMediaIndex === 0) {
      setActiveMediaIndex(props.eventMedia[0].medias.length - 1);
    } else {
      setActiveMediaIndex((prevIndex) => prevIndex - 1);
    }
  }

  function handleNextSlide() {
    if (activeMediaIndex === props.eventMedia[0].medias.length - 1) {
      setActiveMediaIndex(0);
    } else {
      setActiveMediaIndex((prevIndex) => prevIndex + 1);
    }
  }

  function toggleAutoPlay() {
    setIsAutoPlayEnabled((prevState) => !prevState);
  }

  function handleRowHover(rowId) {
    setHoveredRow(rowId);
  }

  function openDeleteEventDialog() {
    setDeleteEventDialogOpen(true);
  }

  function closeDeleteEventDialog() {
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
         className="tableContainer"
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
        <Box
          className="modalBox"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
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
                Diapo
              </Typography>
            </div>

            <IconButton onClick={closePlayModal}>
              <CloseIcon color="secondary" />
            </IconButton>
          </Stack>
          <Box className="diapoBox">
            {currentMedia &&
              (currentMedia.type === "image" ? (
                <img
                  className="diapoImage"
                  src={currentMedia.path}
                  alt={`Media ${activeMediaIndex}`}
                />
              ) : currentMedia.type === "video" ? (
                <video src={currentMedia.path} controls />
              ) : null)}
            <Box sx={{ textAlign: "center", marginTop: "16px" , display:"flex"}}>
              <>
                <IconButton onClick={handlePreviousSlide}>
                  <NavigateBeforeIcon color="secondary"  />
                </IconButton>
                <Typography p={1}variant="body2" color="text.secondary">
                  Diapo {activeMediaIndex + 1} /{" "}
                  {props.eventMedia[0].medias.length}
                </Typography>
                <IconButton onClick={handleNextSlide}>
                  <NavigateNextIcon color="secondary" />
                </IconButton>
              </>

              <IconButton variant="contained" onClick={toggleAutoPlay}>
                {isAutoPlayEnabled ? (
                  <>
                    <PauseIcon color="secondary" />
                    
                  </>
                ) : (
                  <>
                    <PlayArrowIcon color="secondary" />
                  
                  </>
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      <DeleteEventDialog
        open={deleteEventDialogOpen}
        onClose={closeDeleteEventDialog}
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

EventParam.propTypes = {
  // PropTypes here
};

export default EventParam;
