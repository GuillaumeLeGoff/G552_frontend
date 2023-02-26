import React, { useEffect, useState } from "react";
import Media from "./media/Medias";
import Event from "./event/Event";
import Grid from "@mui/material/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import eventmediaService from "../../../services/eventmediaService";
import { v4 as uuidv4 } from "uuid";
import uploadService from "../../../services/uploadService";

function Create() {
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
    if (id != undefined) {
      eventmediaService.getAllByEvent(id).then((result) => {
        const newMedias = result.data.map((media) => {
          return { ...media, id: uuidv4() };
        });
        setEventMedia((prevState) => {
          return prevState.map((column) => {
            if (column.id === 0) {
              return { ...column, medias: newMedias };
            }
            return column;
          });
        });
      });
    }
    uploadService.get().then((result) => {
      const newMedias = result.data.map((media) => {
        return { ...media, id: uuidv4() };
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
  }, [id, setEventMedia]);

  /**
   * Moves an item from one list to another list.
   */
  const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log("==> dest", destination);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
    return destClone;
  };

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log(destination);
      console.log("no destination");
      return;
    }
    /* if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("no destination");
      return;
    } */
    const start = eventMedia[source.droppableId];
    const finish = eventMedia[destination.droppableId];

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
        const sourceClone = Array.from(eventMedia[1].medias);
        const destClone = Array.from(eventMedia[destination.droppableId].medias);
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
        
        console.log(item);
        console.log(destClone);
        console.log("copy");
      
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
    /* 


    if (start === finish) {
      console.log("start === finish");
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
    } else {
      console.log("else");
      console.log(source);
      const startMedias = Array.from(start.medias);
      startMedias.splice(source.index, 1);

      const finishMedias = Array.from(finish.medias);
      finishMedias.splice(destination.index, 0, draggableId);

      setEventMedia((prevState) => {
        return prevState.map((column) => {
          if (column.id === start.id) {
            return { ...column, medias: startMedias };
          }
          if (column.id === finish.id) {
            return { ...column, medias: finishMedias };
          }
          return column;
        });
      });
    } */
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Event
            eventMedia={eventMedia}
            setEventMedia={setEventMedia}
            id={id}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Media eventMedia={eventMedia} setEventMedia={setEventMedia} />
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default Create;
