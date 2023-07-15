import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../sortableItems/sortableItemsleft";
import SortableItem2 from "../sortableItems/sortableElements";

const containerStyle = {
  background: "red",
  padding: 10,
  margin: 10,
  flex: 1,
  flexDirection: "row",
  display: "flex",
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={horizontalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((id) => (
          <SortableItem2 key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}
