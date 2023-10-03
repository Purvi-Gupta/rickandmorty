import { useState, useEffect } from "react";
import axios from "axios";

function Card({ data }) {
  const [episode, setEpisode] = useState([]);

  useEffect(() => {
    let epiurl = data.episode[0];
    const fetchData = async () => {
      const epidata = await axios.get(`${epiurl}`);
    //   console.log(epidata);
      setEpisode(epidata.data.name);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-img">
          <img src={data.image} />
        </div>
        <div className="card-body">
          <div className="information">
            <h1>{data.name}</h1>
            <p>
              {data.status} | {data.species} | {data.gender}
            </p>
          </div><br/>
          <div className="location">
          <p>Last known Location</p>
            <h3>
              {data.location.name}{" "}
              {data.origin.name == "unknown" ? "" : `| ${data.origin.name}`}{" "}
            </h3>
          </div><br/>
          <div className="Chapter">
          <p>Character in Episode</p>
            <h3>{episode}</h3>
          </div><br/>
        </div>
      </div>
    </>
  );
}

export default Card;
