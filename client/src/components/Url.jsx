import Axios  from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Url(props) {
  function link(){
    <Navigate to={props.short}/>
  }

  return (
    <tr>
      <td className="col long"><Link to={props.full}>{props.full}</Link></td>
      <td className="col short"><Link onClick={link} to={props.short}>localhost:3000/main/{props.short}</Link></td>
      <td className="col clicks">{props.note}</td>
      {/* <p className="note-para">{props.content}</p>
      <p className="note-time">{props.time}</p> */}
    </tr>
  );
}

export default Url;
