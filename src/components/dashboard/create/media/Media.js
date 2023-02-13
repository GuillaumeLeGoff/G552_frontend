import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

function Media({ index, item }) {
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <img src={item.path} />
          {provided.placeholder} 
        </div>
       
      )}
    </Draggable>
  );
}

export default Media;
