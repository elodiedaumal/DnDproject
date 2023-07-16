import styled, { css } from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  if (id.includes("https")) {
    return (
      <DropContainer>
        <Img src={id} alt='' />{" "}
      </DropContainer>
    );
  }

  return (
    <DropContainer id>
      <Text>{id}</Text>
    </DropContainer>
  );
}

export default function SortableItem(props) {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
      {!props.id && (
        <ContainerEmpty>
          <AreaDropText>
            Drag and drop an element within this area.
          </AreaDropText>
        </ContainerEmpty>
      )}
    </div>
  );
}

const DropContainer = styled.li`
  font-size: 14px;
  color: #3a6b88;
  font-weight: 600;

  background-color: #fff;

  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
const Text = styled.div`
  width: 100px;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ContainerEmpty = styled.div`
  background-color: #fff;
  border: 1px dotted #3a6b88;
  padding: 64px 32px 64px 32px;
  border-radius: 2px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AreaDropText = styled.p`
  font-size: 14px;
  color: #3f3f3f;
  font-weight: 800;
`;
