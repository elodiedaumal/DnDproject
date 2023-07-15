import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem2 from "../sortableItems/sortableElements";

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
      <ElementsSection>
        <ElementsTitle>Elements</ElementsTitle>
        <ElementsList ref={setNodeRef}>
          {items.map((id) => (
            <SortableItem2 key={id} id={id} />
          ))}
        </ElementsList>
      </ElementsSection>
    </SortableContext>
  );
}

const ElementsSection = styled.section`
  background-color: #fafafa;
  height: 100%;
  min-height: 100vh;
  padding-top: 32px;
  border-left: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const ElementsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: center;
  gap: 32px;
`;

const ElementsTitle = styled.h2`
  font-size: 18px;
  color: #3a6b88;
  font-weight: 600;
  padding-left: 32px;
`;
