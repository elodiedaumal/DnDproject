import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  return <DroppedItem>{id}</DroppedItem>;
}

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DropContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Item id={props.id} />
    </DropContainer>
  );
}

const DroppedItem = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
`;

const DropContainer = styled.li`
  font-size: 14px;
  color: #3a6b88;
  font-weight: 600;
  background-color: #e1dcf2;
  border: 1px solid #e9e9e9;

  border-radius: 4px;
  padding: 24px;
  position: relative;
`;
