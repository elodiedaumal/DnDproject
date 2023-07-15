import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaTrashAlt } from "react-icons/fa";
import SortableItem from "../sortableItems/sortableItemsleft";

export default function Container(props) {
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
      <AreasSection ref={setNodeRef}>
        <AreaContainer>
          <AreaTitle>{id}</AreaTitle>
          <TrashContainer>
            <FaTrashAlt className='trash' />
          </TrashContainer>
        </AreaContainer>
      </AreasSection>
    </SortableContext>
  );
}

const ContainerEmpty = styled.div`
  background-color: #fff;

  display: flex;

  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AreaDropText = styled.p``;

const AreasSection = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const AreaContainer = styled.div`
  background-color: #fff;

  width: 834px;
`;
const AreaTitle = styled.h2`
  color: #fff;
`;
const TrashContainer = styled.div`
  font-size: 100px;
  color: #3a6b88;
  justify-content: center;
  display: flex;
  z-index: 999;
  margin-bottom: 32px;
  :hover {
    padding: 10px;
  }
`;
