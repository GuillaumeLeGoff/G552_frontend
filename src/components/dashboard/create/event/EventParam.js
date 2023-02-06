import { Accordion, Box, Button, ImageList, ImageListItem, Stack } from "@mui/material";

import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CloseIcon from "@mui/icons-material/Close";
import Media from "../media/Media";

import React, { useCallback, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import eventService from "../../../../services/eventService";
import eventMediaService from "../../../../services/eventmediaService";

function EventParam({ id, onEventClick }) {
  const [event, setEvent] = useState({});
  const [eventMedia, setEventMedia] = useState([]);
  useEffect(() => {
    eventService
      .getById(id)
      .then((result) => {
        setEvent(result.data);
        console.log(result.data);
        eventMediaService.getAllByEvent(id).then((result) => {
          setEventMedia(result.data);
          console.log(result.data);
        });
      })
      .catch((error) => {
        onEventClick("");
      });
  }, [id]);

  const movePetListItem = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = eventMedia[dragIndex]
        const hoverItem = eventMedia[hoverIndex]
        setEventMedia(eventMedia => {
            const updatedEventMedia = [...eventMedia]
            updatedEventMedia[dragIndex] = hoverItem
            updatedEventMedia[hoverIndex] = dragItem
            return updatedEventMedia
        })
    },
    [eventMedia],
)
  

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => onEventClick("")} sx={{ ml: 2 }}>
            <CloseIcon color="secondary" />
          </IconButton>
          <IconButton sx={{ ml: 2 }}>
            <PermMediaIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" color="white" sx={{ padding: 2 }}>
            Event : {event.name}
          </Typography>
        </div>
      </Stack>
      <Box p={1}>
        
        {eventMedia.map((item, index) => (
          <Media  key={item.id}
          index={index}
          path={item.path}
          moveListItem={movePetListItem} />
        ))}
        
      </Box>
    </div>
  );
}

export default EventParam;
