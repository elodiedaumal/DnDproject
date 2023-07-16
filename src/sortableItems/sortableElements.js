import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
export function Item(props) {
  const { id } = props;

  if (id.includes("https")) {
    return (
      <ImageContainer>
        <ElementBox>
          <Img src={id} alt='image' />
        </ElementBox>
      </ImageContainer>
    );
  } else if (id.includes("Text")) {
    return (
      <TextContainer>
        <ElementBox>{id}</ElementBox>
      </TextContainer>
    );
  }
  return (
    <TableContainer>
      <ElementBox>{id}</ElementBox>
    </TableContainer>
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

const Img = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
`;
const ElementBox = styled.article`
  font-size: 12px;
  color: #3a6b88;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  display: flex;
  text-align: center;
  width: 120px;
  height: 120px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`;
const ImageContainer = styled.div`
  position: absolute;
  top: 5rem;
  left: 32px;
`;
const TextContainer = styled.div`
  position: absolute;
  top: 5rem;
  left: 11rem;
`;
const TableContainer = styled.div`
  position: absolute;
  top: 5rem;
  left: 20rem;
`;
