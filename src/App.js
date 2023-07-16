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
  root: ["https://randomuser.me/api/portraits/men/75.jpg", "Text", "Table"],
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
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);
  const [table, setTable] = useState([]);
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    // const urlPage = `?page=${page}`;
    try {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/?page=1`
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
        root: [
          "Table=  2017-11-04T18:48:46",
          "Table=  2017-11-04T18:50:21",
          "Table=  2017-11-04T19:09:56",
          "Table=  2017-11-04T19:22:43",
          "Table=  2017-11-04T19:26:56",
          "Table=  2017-11-04T19:50:28",
          "Table=  2017-11-04T19:59:20",
          "Table=  2017-11-04T20:03:34",
          "Table=  2017-11-04T20:06:54",
          "Table=  2017-11-04T20:19:09",
          "Table=  2017-11-04T20:20:20",
          "Table=  2017-11-04T20:32:33",
          "Table=  2017-11-04T20:33:30",
          "Table=  2017-11-04T20:51:31",
          "Table=  2017-11-04T20:56:13",
          "Table=  2017-11-04T21:12:45",
          "Table=  2017-11-04T22:21:24",
          "Table=  2017-11-04T22:25:29",
          "Table=  2017-11-04T22:28:13",
          "Table=  2017-11-04T22:34:53",
          "Table=  2017-11-04T22:39:48",
          "Table=  2017-11-04T22:41:07",
          "Table=  2017-11-05T08:43:05",
          "Table=  2017-11-05T08:48:30",
          "Table=  2017-11-05T08:54:29",
          "Table=  2017-11-05T08:56:46",
          "Table=  2017-11-05T08:59:07",
          "Table=  2017-11-05T09:02:16",
          "Table=  2017-11-05T09:06:19",
          "Table=  2017-11-05T09:13:16",
          "Table=  2017-11-05T09:15:11",
          "Table=  2017-11-05T09:18:04",
          "Table=  2017-11-05T09:21:55",
          "Table=  2017-11-05T09:24:04",
          "Table=  2017-11-05T09:27:38",
          "Table=  2017-11-05T09:31:08",
          "Table=  2017-11-05T09:38:22Z",
          "Table=  2017-11-05T09:48:44",
          "Table=  2017-11-05T09:52:31",
          "Table=  2017-11-05T10:02:26",
          "Text=  Rick Sanchez",
          "Text=  Morty Smith",
          "Text=  Summer Smith",
          "Text=  Beth Smith",
          "Text=  Jerry Smith",
          "Text=  Abadango Cluster Princess",
          "Text=  Abradolf Lincler",
          "Text=  Adjudicator Rick",
          "Text=  Agency Director",
          "Text=  Alan Rails",
          "Text=  Albert Einstein",
          "Text=  Alexander",
          "Text=  Alien Googah",
          "Text=  Alien Morty",
          "Text=  Alien Rick",
          "Text=  Amish Cyborg",
          "Text=  Annie",
          "Text=  Antenna Morty",
          "Text=  Antenna Rick",
          "Text=  Ants in my Eyes Johnson",
          "Text=  Aqua Morty",
          "Text=  Aqua Rick",
          "Text=  Arcade Alien",
          "Text=  Armagheadon",
          "Text=  Armothy",
          "Text=  Arthricia",
          "Text=  Artist Morty",
          "Text=  Attila Starwar",
          "Text=  Baby Legs",
          "Text=  Baby Poopybutthole",
          "Text=  Baby Wizard",
          "Text=  Bearded Lady",
          "Text=  Beebo",
          "Text=  Benjamin",
          "Text=  Bepisian",
          "Text=  Beta-Seven",
          "Text=  Beth Sanchez",
          "Text=  Beth's Mytholog",
          "Text=  Big Boobed Waitress",
          "Text=  Big Head Morty",
          "Text=  Big Morty",
          "Text=  Body Guard Morty",
          "Text=  Bill",
          "Text=  Birdperson",
          "Text=  Black Rick",
          "Text=  Blamph",
          "Text=  Blim Blam",
          "Text=  Blue Diplomat",
          "Text=  Blue Footprint Guy",
          "Text=  Blue Shirt Morty",
          "Text=  Bobby Moynihan",
          "Text=  Boobloosian",
          "Text=  Bootleg Portal Chemist Rick",
          "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
          "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
        ],
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
            <Container id='body' items={items.body} />
            <ContainerFooter id='footer' items={items.footer} />
            <Container3 id='trash' items={items.trash} />
          </AreasLayout>
          <ElementContainer>
            <Container2 id='root' items={items.root} />
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
    console.log(activeContainer);
    console.log(overContainer);

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
`;
