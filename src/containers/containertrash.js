import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaTrashAlt } from "react-icons/fa";

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
      <AreasSection className='trash' ref={setNodeRef}>
        <AreaContainer>
          <TrashContainer>
            <FaTrashAlt />
          </TrashContainer>
        </AreaContainer>
      </AreasSection>
    </SortableContext>
  );
}

const AreasSection = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const AreaContainer = styled.div`
  background-color: #fff;
  width: 600px;
`;

const TrashContainer = styled.div`
  width: 100%;
  font-size: 100px;
  color: #3a6b88;
  justify-content: center;
  display: flex;
  z-index: 999;
  margin-bottom: 32px;
  margin-top: 32px;
  :hover {
    padding: 10px;
  }
  @media (max-width: 1300px) {
    width: 90%;
  }
`;
