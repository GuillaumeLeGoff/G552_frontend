import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

function Media({ index, item }) {

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provider) => (
        <div
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          <img src={item.path} />
        </div>
      )}
    </Draggable>
  );
}

export default Media;
