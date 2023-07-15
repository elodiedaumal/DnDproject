import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

export function Item(props) {
  const { id } = props;

  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "110px",
    height: "110px",
    border: "1px solid #e9e9e9",
    borderRadius: "4px",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.13)",
  };

  if (id.includes("randomuser")) {
    return (
      <ElementText style={style}>
        <Img src={id} alt='' />
      </ElementText>
    );
  } else if (id.includes("Text")) {
    return <ElementText style={style}>{id}</ElementText>;
  } else if (id.includes("Table")) {
    return <ElementText style={style}>{id}</ElementText>;
  }
}

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    width: "30%",
    marginRight: "10px",
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
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
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
