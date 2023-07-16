import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../sortableItems/sortableItemsleft";

export default function Containers(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });
  const getBackgroundColor = (id) => {
    if (id === "header") {
      return "#eff4f0";
    } else if (id === "body") {
      return "#f0f4f8";
    } else if (id === "footer") {
      return "#f8f4f0";
    } else {
      return "#fff";
    }
  };
  const backgroundColor = getBackgroundColor(id);
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <AreaContainer ref={setNodeRef} backgroundColor={backgroundColor}>
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
  background-color: ${(props) => props.backgroundColor};
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
