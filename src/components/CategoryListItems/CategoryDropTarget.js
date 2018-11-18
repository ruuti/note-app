import React from 'react';
import { DropTarget } from 'react-dnd';
import { NOTE_ITEM } from '../../constants';

const CategoryDropTarget = ({shoudHighlight, dropTarget, children}) => (
  dropTarget(
    <div className={ shoudHighlight ? 'droppable' : undefined }>
      { children }
    </div>
  )
)

const target = {
  drop(props) {
    const { category } = props;
    return ({category});
  }
}

const collect = (connect,  monitor) => ({
  dropTarget: connect.dropTarget(),
  shoudHighlight: monitor.isOver() && monitor.canDrop()
});

export default DropTarget(NOTE_ITEM, target, collect)(CategoryDropTarget);