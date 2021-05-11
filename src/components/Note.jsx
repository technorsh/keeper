import React from "react";
import { Delete, Edit } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import CreateArea from "./CreateArea";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

function Note(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{handleOpen()}}>
        <Edit />
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={()=>{handleClose()}}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
       >
       <CreateArea
          onAdd={props.onAdd}
          title={props.title}
          content={props.content}
          close={()=>{handleClose()}}
          type={"EDIT"}
          id={props.id}
        />
      </Modal>
      <button onClick={handleClick}>
      <Delete />
      </button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Note;
