import { useState } from "react";
import "./App.css";
import Card from "./component/Card";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [items, setItems] = useState([]);
  let page = 1;
const fetchData = (setItems, items) => {
  axios
   .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
   .then((data) => {
     setItems([...data.data.results]);
     page = page + 1;
   });
};


  return (
    <>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData(setItems, items)}
          hasMore={true} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
        >
      <div className="container">
          {items.map((data) => {
            return <Card key={data.id} data={data} />;
          })}
      </div>
        </InfiniteScroll>
    </>
  );
}

export default App;
