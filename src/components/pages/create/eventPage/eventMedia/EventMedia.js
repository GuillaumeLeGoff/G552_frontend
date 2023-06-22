import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./EventMedias.css";

function EventMedia(props) {
  useEffect(() => {
    console.log('props.item',props.item);
  }, [props.item]);
  function handleDurationChange(event) {
    props.updateMedia(event.target.value, props.index);
  }
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <Draggable draggableId={props.item.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <TableRow
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...(isMobile
            ? {
                onClick: () => props.handleRowHover(props.item.id),
              }
            : {
                onMouseEnter: () => props.handleRowHover(props.item.id),
                onMouseLeave: () => props.handleRowHover(null),
              })}
          hover
          key={props.item.id}
        >
          <TableCell className="event-media-cell" align="center">
            {props.item.type === "video" ? (
              <div>
                <video className="event-media" alt={props.item.title}>
                  <source src={props.item.path} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div>
                <img
                  className="event-media"
                  src={props.item.path}
                  alt={props.item.title}
                />
              </div>
            )}
          </TableCell>
          <TableCell p={0} className="event-media-duration-cell" align="right">
            <TextField
              value={props.item.media_dur_in_event}
              onChange={handleDurationChange}
              size="small"
              type="number"
              inputProps={{ min: 0, max: 999 }}
              disabled={props.item.type === "video"}
              style={{ width: "90px" }}
            />
          </TableCell>
          <TableCell className="event-media-icon-cell" p={0} align="right">
            {props.hoveredRow === props.item.id ? (
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.openDeleteDialog(props.index);
                }}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton sx={{ p: 0 }} className="event-media-icon-button">
                <DeleteIcon />
              </IconButton>
            )}
          </TableCell>
          {provided.placeholder}
        </TableRow>
      )}
    </Draggable>
  );
}

export default EventMedia;
