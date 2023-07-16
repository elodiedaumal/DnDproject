import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ContainerDrop from "./containers/containers";
import ContainerRight from "./containers/Elementscontainer";
import ContainerTrash from "./containers/containertrash";
import { Item } from "./sortableItems/sortableItemsleft";

export default function App() {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);
  const [table, setTable] = useState([]);
  const [image, setImage] = useState([]);

  const fetchItems = async () => {
    setLoading(true);

    try {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/?page=0`
      );
      const data = result.data.results;

      const allNames = [...new Set(data.map((item) => "Text=  " + item.name))];
      const allImages = [...new Set(data.map((item) => item.image))];
      const allTables = [
        ...new Set(data.map((item) => "Table= " + item.created)),
      ];

      setText([...new Set(allNames.map((item) => item))]);
      setTable([...new Set(allTables.map((item) => item))]);
      setImage([...new Set(allImages.map((item) => item))]);
      const allItems = [text, table, image];

      const flattenedArray = [].concat(...allItems);

      setItems({
        root: flattenedArray,
        header: [],
        body: [],
        footer: [],
        trash: [],
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [loading]);

  const handleReset = () => {
    fetchItems();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (loading) {
    return (
      <Spinner>
        <div className='lds-facebook'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Spinner>
    );
  } else
    return (
      <Main>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <AreasLayout>
            <ContainerDrop id='header' items={items.header} />
            <ContainerDrop id='body' items={items.body} />
            <ContainerDrop id='footer' items={items.footer} />

            <ContainerTrash id='trash' items={items.trash} />
          </AreasLayout>
          <ElementContainer>
            <ContainerRight id='root' items={items.root} />
            <button className='button' onClick={handleReset}>
              Reset
            </button>
          </ElementContainer>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
      </Main>
    );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    if (
      (overContainer === "body" && activeContainer === "footer") ||
      (overContainer === "footer" && activeContainer === "body") ||
      (overContainer === "header" &&
        (id.includes("Text") || id.includes("Table"))) ||
      (overContainer === "footer" &&
        (id.includes("https") || id.includes("Table")))
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 5fr 460px;
`;
const AreasLayout = styled.section`
  margin: auto;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ElementContainer = styled.section`
  position: relative;
  background-color: #fafafa;
  height: 100%;
  min-height: 100vh;
  border-left: 1px solid #e9e9e9;
  justify-content: center;
  padding: 32px;
`;
const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
`;
