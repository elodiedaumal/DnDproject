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

import ContainerHeader from "./containers/containerHeader";
import ContainerFooter from "./containers/containerFooter";
import Container from "./containers/containerslesft";
import Container2 from "./containers/Elementscontainer";
import Container3 from "./containers/containertrash";
import { Item } from "./sortableItems/sortableItemsleft";

const url = "https://randomuser.me/api/";

const initialstate = {
  root: [
    "https://randomuser.me/api/portraits/men/75.jpg",
    "data.name.first",
    "data.phone",
  ],
  header: [],
  body: [],
  footer: [],
  trash: [],
};
const defaultAnnouncements = {
  onDragStart(id) {},
  onDragOver(id, overId) {
    if (overId) {
      return;
    }
  },
  onDragEnd(id, overId) {
    if (overId) {
      return;
    }
  },
  onDragCancel(id) {},
};

export default function App() {
  const [items, setItems] = useState(initialstate);
  const [activeId, setActiveId] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);
  const [table, setTable] = useState([]);
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [myVariable, setMyVariable] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    // const urlPage = `?page=${page}`;
    try {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/?page=1`
      );
      const data = result.data.results;
      if (index === 0) {
        const allNames = [...new Set(data.map((item) => item.name))];
        const allImages = [...new Set(data.map((item) => item.image))];
        const allTables = [...new Set(data.map((item) => item.created))];
        setText(allNames.map((image) => "Text= " + image)[`${index}`]);
        setTable(allTables.map((image) => "Table= " + image)[`${index}`]);
        setImage(allImages[`${index}`]);
        const initialstate2 = {
          root: [image, text, table],
          header: [],
          body: [],
          footer: [],
          trash: [],
        };
        setItems(initialstate);
      }

      if (index >= 1) {
        setText((oldText) => {
          return [...oldText, text];
        });
        setTable((oldTable) => {
          return [...oldTable, text];
        });
        setImage((oldImage) => {
          return [...oldImage, text];
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlereset = () => {
    fetchItems();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (loading) {
    return <div>loading...</div>;
  } else
    return (
      <Main>
        <DndContext
          announcements={defaultAnnouncements}
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <AreasLayout>
            <ContainerHeader id='header' items={items.header} />
            {/* <Container id='header' items={items.header} /> */}
            <Container id='body' items={items.body} />
            <ContainerFooter id='footer' items={items.footer} />
            <Container3 id='trash' items={items.trash} />
          </AreasLayout>
          <ElementContainer>
            <Container2 id='root' items={items.root} />
            <button className='button' onClick={handlereset}>
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
        const activeElement = document.getElementById(id);
        const overElement = document.getElementById(overId);

        if (!activeElement || !overElement) {
          return prev; // Skip updating if elements are not available
        }

        const isBelowLastItem =
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop >
            overElement.offsetTop + overElement.offsetHeight;

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
      setMyVariable(true);
      setItems((items) => ({
        ...items,
        overIndex,
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
`;
