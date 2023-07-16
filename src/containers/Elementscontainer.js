import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem2 from "../sortableItems/sortableElements";
export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items}>
      <ElementsSection>
        <ElementsTitle>Elements</ElementsTitle>
        <ul ref={setNodeRef}>
          {items.map((id) => (
            <SortableItem2 key={id} id={id} />
          ))}
        </ul>
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
  justify-content: center;
  gap: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 20px 1fr;
`;

const ElementsTitle = styled.h2`
  font-size: 18px;
  color: #3a6b88;
  font-weight: 600;
  padding-left: 32px;
  grid-column: 1 / -1;
`;
