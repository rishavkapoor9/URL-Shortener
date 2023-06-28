import React, { useState } from "react";
import Axios from "axios";


function CreateArea(props) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  function updateUrl(event) {
    setUrl(event.target.value);
  }
  function updateNote(event) {
    setNote(event.target.value);
  }

  function submitUrl(event) {
    url.length !== 0 &&
      Axios.post("http://localhost:4000/api/insert", { url: url, user: props.user, note: note }).then(() => { });
    setUrl("");
    setNote("");
    url.length !== 0 &&
      props.onAdd(url, note);
    event.preventDefault();
  }


  return (
    <div>
      <form className="create-note">
        <div>
          <input type="text" placeholder="URL here" onChange={updateUrl} value={url}></input>
          <textarea placeholder="note here" onChange={updateNote} value={note}/>
        </div>

        <button className="btn btn-success my_btn" onClick={submitUrl}>Generate</button>
      </form>
    </div>
  );
}

export default CreateArea;
