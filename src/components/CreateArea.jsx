import React, { useState } from "react";
import { Add, Check } from '@material-ui/icons';
import { Fab, Zoom} from '@material-ui/core';
import Progress from "./Progress";

function CreateArea(props) {
  const [isExpanded,setExpanded] = useState(false);

  const [note,setNote] = useState({
      title:props.title,
      content:props.content
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevValue => {
        return {
            ...prevValue,
            [name]: value
        }
    })
  }

  const submitNote = (event) => {
      props.onAdd(note, props.type, props.id);
      setNote({
        title:"",
        content:""
      });
      props.close();
     event.preventDefault();
  }

  const expand = () => {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {
          isExpanded && (<input name="title" placeholder="Title" value={note.title} onChange={handleChange} /> )
        }
        <textarea name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={note.content} onChange={handleChange}
        onClick={expand} />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            { props.type !== "EDIT" ?<Add />:<Check /> }
          </Fab>
        </Zoom>
      </form>
      <Progress open={props.open} close={props.closeProgress}/>
    </div>
  );
}

export default CreateArea;
