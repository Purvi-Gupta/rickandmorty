import React, { createContext, useEffect, useState} from "react";
import "./App.css";
import Profile from "./component/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import axios from "axios";


export const Store = createContext();

function App() {

  const [items, setItems] = useState([]);
  const [loding, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {

      const data = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      setItems((prevItems) => [...prevItems, ...data.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      // setError(error);
      console.log(`server is not responding`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page<2) {

      fetchData();
    }
  },[items]);

  return (
    <>
    <Store.Provider value={{items,fetchData,loding}}>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile/:id" element={<Profile/>}/>
     </Routes>
      </BrowserRouter>
      </Store.Provider>
    </>
  );
}

export default App;
