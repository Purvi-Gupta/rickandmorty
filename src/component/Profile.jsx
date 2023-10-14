import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Store } from "../App";
import { Link } from "react-router-dom";
const Profile = () =>{
    const params = useParams();
  const { id } = params;
  const {items} = useContext(Store);

  const [data,Setdata] = useState([]);

  useEffect(()=>{
    const userData = items.find((item)=>{
        return item.id == id;
    });

    Setdata(userData)

},[id])

// console.log(data.location.name);

    return(<>
    <Link to="/">/Home</Link>
    {data &&
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
          </div>
          <br />
          <div className="location">
            <p>Last known Location</p>
            <h3>
               {data?.location?.name}{" "}
               {data?.origin?.name =="unknown" ? "" : `| ${data?.origin?.name}`}
            </h3>
          </div>
        </div>
    </div>
    }

    </>)
}

export default Profile;