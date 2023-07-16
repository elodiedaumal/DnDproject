import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchItems = async () => {
  //   setLoading(true);
  //   // const urlPage = `?page=${page}`;
  //   try {
  //     const result = await axios(
  //       `https://rickandmortyapi.com/api/character/?page=1`
  //     );
  //     const data = result.data.results;

  //     const allNames = [...new Set(data.map((item) => "Text= " + item.name))];
  //     const allImages = [...new Set(data.map((item) => item.image))];
  //     const allTables = [
  //       ...new Set(data.map((item) => "Table= " + item.created)),
  //     ];

  //     const allItems = [allImages, allNames, allTables];
  //     const allItemsJoins = [allItems.join()];
  //     const initialstate2 = {
  //       root: [allItemsJoins],
  //       header: [],
  //       body: [],
  //       footer: [],
  //       trash: [],
  //     };
  //     console.log(initialstate2);
  //     setItems({
  //       root: [allItemsJoins],
  //       header: [],
  //       body: [],
  //       footer: [],
  //       trash: [],
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchItems();
  // }, [loading]);
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
