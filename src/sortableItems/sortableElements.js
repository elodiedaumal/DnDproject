import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  return (
    <ElementBox>
      <ElementText>{id}</ElementText>
    </ElementBox>
  );
}

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}

const ElementText = styled.p`
  font-size: 14px;
  color: #3a6b88;
  font-weight: 600;
`;
const ElementBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 110px;
  height: 110px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.13);
`;
