import { Box, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CloseIcon from "@mui/icons-material/Close";
import Media from "../media/Media";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import eventService from "../../../../services/eventService";

function EventParam({ eventMedia, setEventMedia, id, onEventClick }) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    eventService
      .getById(id)
      .then((result) => {
        setEvent(result.data);
      })
      .catch((error) => {
        onEventClick("");
      });
  }, [id, onEventClick, setEventMedia]);

  return (
    <div>
      <Paper
        sx={{
          position: "relative",
          maxHeight: "calc(83vh )",
          minHeight: "calc(83vh )",
          
        }}
        
      >
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

      <Box sx={{ maxHeight: "calc(80vh - 66px)", overflowY: "scroll" }} p={1}>
        <Droppable droppableId={`${eventMedia[0].id}`}>
          {(provided, snapshot) => (
            <div
             
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {eventMedia[0].medias.map((item, index) => (
                <Media key={item.id} index={index} item={item} />
              ))}
              {provided.placeholder}
            </div>
            
          )}
         
        </Droppable>
      </Box>
      </Paper>
    </div>
  );
}

export default EventParam;
