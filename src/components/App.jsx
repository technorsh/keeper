import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { setUser ,setLogin , setNotes } from "./../appStore/actions";
import { URL } from "./../common";

function App(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);

  const { data, setLogin, setNotes, setUser } = props;
  const { isLogin, notes, user } = data;

  useEffect(() => {
    fetchNotes(user.userId)
  }, [user]);

  const fetchNotes = (userId) => {
    fetch(URL + "/notes/" + userId).
    then((res)=>{
      return res.json()
    }).then((res)=>{
      setNotes(res);
      setLoading(false);
    })
  }

  function addNote(newNote, type , id) {
    if(newNote.title !== "" && newNote.title !== undefined && newNote.content !== "" && newNote.content !== undefined ){
      if(isLogin){
        setLoading(true);
        if(type === "EDIT"){
          fetch( URL + '/notes/update/'+user.userId + "/" + id, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: newNote.title, content : newNote.content})
          }).then((res)=>res.json())
          .then((res)=>{
            fetchNotes(user.userId)
            enqueueSnackbar(res.message, { variant:"success" });
          }).catch((err)=>{
            console.log("Error",err);
            setLoading(false);
          })
        }else{
          fetch( URL + '/notes/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: newNote.title, content : newNote.content, userid : user.userId})
          }).then((res)=>res.json())
          .then((res)=>{
            fetchNotes(user.userId)
            enqueueSnackbar(res.message, { variant:"success" });
          }).catch((err)=>{
            console.log("Error",err);
            setLoading(false);
          })
        }
      }else{
        setLoading(false);
        enqueueSnackbar('Login First', { variant:"info"});
      }
    } else{
      setLoading(false);
      enqueueSnackbar('Please enter title and content', { variant:"warning" });
    }
  }

  function deleteNote(id) {
    setLoading(true);
    fetch(URL+"/notes/delete/"+user.userId+"/"+id,{
      method: 'DELETE',
    })
    .then((res)=>res.json())
    .then((res)=>{
      fetchNotes(user.userId)
      enqueueSnackbar(res.message, { variant:"success" });
    }).catch((err)=>{
      console.log("Error",err);
      setLoading(false);
    })
  }

  return (
    <Grid container direction="column">
      <Grid items xs={12}>
        <Header fetchNotes = {fetchNotes} />
      </Grid>
      <Grid items xs={12}>
        <CreateArea onAdd={addNote} type={"ADD"} close={()=>{}} open={isLoading} closeProgress={()=>{setLoading(false)}}/>
      </Grid>
      <Grid items xs={12}>
        {notes.map((noteItem,index) => {
          return(
            <Note
              key={index}
              onAdd={addNote}
              id={noteItem.id}
              title={noteItem.title}
              content= {noteItem.content}
              onDelete={deleteNote}
            />
          )})}
      </Grid>
      <Grid items>
        <Footer/>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state
  };
}

const mapDispatchToProps = {
  setUser,
  setLogin,
  setNotes
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
