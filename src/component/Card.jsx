import React, { useContext } from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Store } from "../App";

function Card({ searchString }) {
  // const [episode, setEpisode] = useState([]);
    const [filterItem,SetfilterItems] = useState([]);
    const {items} = useContext(Store);

  const searchHandler = () =>{
      try {
        const search = items.filter((item)=>{
          return item.name.toLowerCase().includes(searchString.toLowerCase())
          || item.status.toLowerCase().includes(searchString.toLowerCase())
          || item.gender.toLowerCase() === searchString.toLocaleLowerCase()
          || item.species.toLowerCase().includes(searchString.toLowerCase())
          || item.location.name.toLowerCase().includes(searchString.toLowerCase())
        });
        SetfilterItems(search);

      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    SetfilterItems(items)
    // let epiurl = data.episode[0];
    // const fetchData = async () => {
    //   const epidata = await axios.get(`${epiurl}`);
    //   //   console.log(epidata);
    //   setEpisode(epidata.data.name);
    // };
    // fetchData();
    searchHandler();
  },[searchString,items]);

  return (
    <>
    {
    filterItem.map((data,index)=>{
      return(
        <Link to={`/profile/${data.id}`} key={index}>
        <div className="card" >
        <div className="card-img">
          <img src={data.image} />
        </div>
        <div className="card-body">
          <div className="information">
            <h1>{data.name}</h1>
            <p>
              {data.status} | {data.species} | {data.gender}
            </p>
          </div>
          <br />
          <div className="location">
            <p>Last known Location</p>
            <h3>
              {data.location.name}{" "}
              {data.origin.name == "unknown" ? "" : `|
${data.origin.name}`}{" "}
            </h3>
          </div>
          <br />
          <div className="Chapter" >
            <p>Character in Episode</p>
            {/* <h3>{episode}</h3> */}
          </div>
          <br />
        </div>
      </div>
      </Link>
      )
    })}

    </>
  );
}

export default Card;

Card.propTypes = {
  data: PropTypes.object,
};