import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../sortableItems/sortableItemsleft";

export default function ContainerHeader(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <AreaContainer ref={setNodeRef}>
        <AreaTitle>{id}</AreaTitle>

        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}

        {items.length === 0 && (
          <ContainerEmpty>
            <AreaDropText>
              Drag and drop an element within this area.
            </AreaDropText>
          </ContainerEmpty>
        )}
      </AreaContainer>
    </SortableContext>
  );
}

const ContainerEmpty = styled.div`
  background-color: #fff;
  border: 1px dotted #3a6b88;
  padding: 64px 32px 64px 32px;
  border-radius: 2px;
`;

const AreaDropText = styled.p`
  font-size: 14px;
  color: #3f3f3f;
  font-weight: 400;
`;

const AreaContainer = styled.div`
  /* background-color: #eff4f0; */
  background-color: ${(props) =>
    props.backgroundColor}; // Dynamic background color
  border-radius: 4px;
  padding: 8px 8px 8px 8px;
  width: 834px;
  text-align: center;
`;
const AreaTitle = styled.h2`
  font-size: 14px;
  color: #3a6b88;
  text-align: left;
  text-transform: capitalize;
  font-weight: 600;
`;
