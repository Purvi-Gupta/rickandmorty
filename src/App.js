import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [items, setItems] = useState([]);
  const [, setIsLoading] = useState(false);
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
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="container">
          {items.map((data, index) => {
            return <Card key={index} data={data} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
