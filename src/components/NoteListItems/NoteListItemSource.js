import React from 'react';
import { DragSource } from 'react-dnd';
import { moveNoteToCategory }  from '../../firebase';
import { NOTE_ITEM } from '../../constants';

const NoteListItemSource = ({connectDragSource, isDragging, children}) => {

  return connectDragSource(
    <div className={ isDragging ? 'isDragging' : undefined}>
      { children }
    </div>
  )
}

const source = {
  beginDrag(props) {
    return ({});
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const { note } = props;
    const { category } = monitor.getDropResult();
    moveNoteToCategory(note.id, category.id);
  }
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(NOTE_ITEM, source, collect)(NoteListItemSource);