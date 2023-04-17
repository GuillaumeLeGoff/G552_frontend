import CloseIcon from "@mui/icons-material/Close";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import eventMediaService from "../../../../services/eventMediaService";
import eventService from "../../../../services/eventService";
import "../../../../styles/App.css";
import DeleteMediaEventDialog from "../../../dialogs/DeleteMediaEventDialog";
import DeleteDialog from "../../../dialogs/DeleteMediaEventDialog";
import Media from "./EventMedia";

function EventParam(props) {
  const [event, setEvent] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idEventMediaDelete, setIdEventMediaDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    props.getEvents();
    getMediasByID();
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

  function openDeleteDialog(index) {
    setDeleteDialogOpen(true);
    setIdEventMediaDelete(index);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setIdEventMediaDelete(null);
  }

  async function deleteEventMedia() {
    const eventMediaDelete = props.eventMedia[0].medias[idEventMediaDelete];
    try {
      const result = await eventMediaService.delete(id, eventMediaDelete);
      await getMediasByID();
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Paper className="mainPaper">
        <Stack className="headerSection">
          <div className="headerItemLeft">
            <IconButton onClick={() => props.onEventClick("")}>
              <CloseIcon color="secondary" />
            </IconButton>
            <IconButton sx={{ ml: 2 }}>
              <PermMediaIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Event : {event.name}
            </Typography>
          </div>
          <div className="headerItemRight">
            <IconButton>
              <PlayArrowIcon color="secondary" />
            </IconButton>
          </div>
        </Stack>

        <TableContainer
          sx={{
            maxHeight: "calc(94vh - 120px)",
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
      <DeleteMediaEventDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={deleteEventMedia}
      />
    </div>
  );
}

export default EventParam;
