import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import SortableItem2 from "../sortableItems/sortableElements";

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items}>
      <ElementsTitle>Elements</ElementsTitle>
      <ul ref={setNodeRef}>
        {items.map((id) => (
          <SortableItem2 key={id} id={id} />
        ))}
      </ul>
      <DiscardContainer>Discard</DiscardContainer>
    </SortableContext>
  );
}

const ElementsTitle = styled.h2`
  font-size: 18px;
  color: #3a6b88;
  font-weight: 600;
`;
const DiscardContainer = styled.div`
  width: 100%;
  background-color: #3a6b88;
  height: 150px;
  margin-top: 10rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 800;
  z-index: -999;
  &:hover {
    background-color: #72afd3;
  }
`;
