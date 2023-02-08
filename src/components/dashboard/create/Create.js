import React, { useEffect, useState } from "react";
import Media from "./media/Medias";
import Event from "./event/Event";
import Grid from "@mui/material/Grid";
import { DragDropContext } from 'react-beautiful-dnd';

function Create() {
  const [eventMedia, setEventMedia] = useState([]);
  const onDragEnd = result => {
    const {destination, source, draggableId} = result;
    
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }
    
    console.log(destination, source, draggableId);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Event eventMedia = {eventMedia} setEventMedia = {setEventMedia}/>
      </Grid>
      <Grid item xs={4}>
        <Media />
      </Grid>
    </Grid>
    </DragDropContext>
  );
}

export default Create;
