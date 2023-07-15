import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ items }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: items.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ElementBox>
        {items.title === "Text" && <ElementText>{items.content}</ElementText>}
        {items.title === "Table" && <ElementText>{items.content}</ElementText>}
        {items.title === "Image" && <Image src={items.content} />}
      </ElementBox>
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
const Image = styled.img`
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
