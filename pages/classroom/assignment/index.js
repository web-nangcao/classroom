import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd-next";
import {useState} from "react"
import Button from "@mui/material/Grid";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default function Assignment() {
  const [items, setItems] = useState(getItems(2));

  
  const createAssignment = (list, index, element) => {  
    const items_m = items.push({id:1,}) 
}
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items_m = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(items_m)
    
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <input />
                    <div>{item.content}</div>
                    
                  </div>
                )}
              </Draggable>
            ))}
            <Button variant="text" onClick={createAssignment}>text</Button>
          </div>
          
        )}
      </Droppable>
    </DragDropContext>
  );
}

// Put the thing into the DOM!
