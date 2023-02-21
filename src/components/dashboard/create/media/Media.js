import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Media({ index, item }) {
  return (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {(provided, snapshot) => (
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
