import React, { useEffect, useState } from "react";
import Media from "./media/Medias";
import Event from "./event/Event";
import Grid from "@mui/material/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import mediaService from "../../../services/UploadService";
import authService from "../../../services/authService";
import EventMediaService from "../../../services/eventmediaService"
function Create() {
  const [isDragging, setIsDragging] = useState(false);
  const [eventMedia, setEventMedia] = useState([
    {
      id: 0,
      title: "eventMedia",
      medias: [],
    },
    {
      id: 1,
      title: "uploadMedia",
      medias: [],
    },
  ]);

  const { id } = useParams();

  useEffect(() => {
    getEvents();
    getMedias();
  }, []);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  function getEvents() {
    if (id != undefined) {
      EventMediaService.getAllByEvent(id).then((result) => {
        
        const newMedias = result.data.map((media) => {
          return { ...media, id: uuidv4(), idBdd: media.id };
        });
        setEventMedia((prevState) => {
          console.log(newMedias);
          return prevState.map((column) => {
            if (column.id === 0) {
              if (newMedias.length > 0) {
                return { ...column, medias: newMedias };
              } else {
                return { ...column, medias: newMedias };
              }
            }
            return column;
          });
        });
      });
    }
  }
  function getMedias() {
    mediaService.get().then((result) => {
      const newMedias = result.data.map((media) => {
        return { ...media, id: uuidv4(), idBdd: media.id };
      });
      setEventMedia((prevState) => {
        return prevState.map((column) => {
          if (column.id === 1) {
            return { ...column, medias: newMedias };
          }
          return column;
        });
      });
    });
  }
  const onDragStart = () => {
    setIsDragging(true);
  };
  const onDragEnd = (result) => {
    setIsDragging(false);
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log(destination);
      console.log("no destination");
      return;
    }
    const start = eventMedia[source.droppableId];

    switch (source.droppableId) {
      case destination.droppableId:
        console.log("meme colonne");
        const newMedias = Array.from(start.medias);
        newMedias.splice(source.index, 1);
        newMedias.splice(
          destination.index,
          0,
          eventMedia[source.droppableId].medias[source.index]
        );
        setEventMedia((prevState) => {
          return prevState.map((column) => {
            if (column.id === start.id) {
              return { ...column, medias: newMedias };
            }
            return column;
          });
        });
        break;
      case "1":
        console.log("copy");
        const sourceClone = Array.from(eventMedia[1].medias);
        const destClone = Array.from(
          eventMedia[destination.droppableId].medias
        );
        const item = sourceClone[source.index];

        destClone.splice(destination.index, 0, { ...item, id: uuidv4() });
        setEventMedia((prevState) => {
          return prevState.map((column) => {
            if (column.id === 0) {
              return { ...column, medias: destClone };
            }
            return column;
          });
        });

        console.log();
        EventMediaService.create({
          mediaId: item.idBdd,
          eventId: id,
          duration: 0,
          userId:authService.getCurrentUser().user.id
        }).then((result) => {
          console.log(result);
        });

        break;
      default:
        console.log("move");
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid item xs={12} md={8}>
        <Event
          eventMedia={eventMedia}
          setEventMedia={setEventMedia}
          id={id}
          isDragging={isDragging}
          getEvents={getEvents}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Media
          eventMedia={eventMedia}
          setEventMedia={setEventMedia}
          getEvents={getEvents}
          getMedias={getMedias}
        />
      </Grid>
    </DragDropContext>
  );
}

export default Create;
