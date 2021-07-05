import React, { useState } from "react";
import { Add, Check } from '@material-ui/icons';
import { Fab, Zoom, Grid } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
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
    <Grid container>
      <Grid items xs={12} style={{ padding:isWidthUp("sm",props.width)?'20px':'20px'}}>
        <form className="create-note" style={{width:isWidthUp("sm",props.width)?'480px':'100%'}}>
          {
            isExpanded && (<input name="title" placeholder="Title" value={note.title} onChange={handleChange} /> )
          }
          <textarea name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={note.content} onChange={handleChange}
          onClick={expand} />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              { props.type !== "EDIT" ? <Add /> : <Check /> }
            </Fab>
          </Zoom>
        </form>
        <Progress open={props.open} close={props.closeProgress}/>
      </Grid>
    </Grid>
  );
}

export default withWidth()(CreateArea);
