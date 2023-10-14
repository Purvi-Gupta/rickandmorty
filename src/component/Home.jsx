import React from "react";
import { useState,useContext} from "react";
import Card from "./Card";
import { Store } from "../App";
import InfiniteScroll from "react-infinite-scroll-component";


const Home = () => {
    const {items,fetchData,loding} = useContext(Store);
    const [searchString,SetsearchString] = useState("");
    const oChangeSearchString = (e) => {
        SetsearchString(e.target.value)
    }

    return(
    <>
     <input className="searchBar" type="text" value={searchString}
onChange={(e)=>{oChangeSearchString(e)}} placeholder="write here to
search"/>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={loding}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="container">
      <Card searchString={searchString}/>;
        </div>
      </InfiniteScroll>
    </>)
}

export default Home;