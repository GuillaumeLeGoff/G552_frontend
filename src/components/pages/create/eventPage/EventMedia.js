import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  InputLabel,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../../../../styles/App.css";

function Media(props) {
  function handleDurationChange(event) {
    props.updateMedia(event.target.value, props.index);
  }

  return (
    <Draggable
      draggableId={props.item.id.toString()}
      index={props.index}
      key={props.item.id}
    >
      {(provided, snapshot) => (
        <TableRow
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => props.handleRowHover(props.item.id)}
          onMouseLeave={() => props.handleRowHover(null)}
          hover
          key={props.item.id}
        >
          <TableCell sx={{ borderBottom: "0" }} p={0} align="center">
            {props.item.type === "video" ? (
              <video
                style={{ maxWidth: "calc(20vh )", maxHeight: "calc(20vh )" }}
                alt={props.item.title}
              >
                <source src={props.item.path} type="video/mp4" />
              </video>
            ) : (
              <div>
                <img
                  style={{ minWidth: "calc(15vh )", maxHeight: "calc(20vh )" }}
                  src={props.item.path}
                  alt={props.item.title}
                />
              </div>
            )}
          </TableCell>
          <TableCell align="right" sx={{ borderBottom: "0" }} p={0}>
            <TextField
              value={props.item.media_dur_in_event}
              onChange={(e) => handleDurationChange(e, props.index)}
              size="small"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 999 } }}
            />
          </TableCell>
          <TableCell sx={{ borderBottom: "0" }} p={0} align="right">
            {props.hoveredRow === props.item.id ? (
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.openDeleteDialog(props.index);
                }}
              >
                <DeleteIcon sx={{ fontSize: 20 }} color="secondary" />
              </IconButton>
            ) : (
              <IconButton
                sx={{ p: 0, opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.openDeleteDialog(props.index);
                }}
              >
                <DeleteIcon sx={{ fontSize: 20 }} color="secondary" />
              </IconButton>
            )}
          </TableCell>
          {provided.placeholder}
        </TableRow>
      )}
    </Draggable>
  );
}

export default Media;
