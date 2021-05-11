import React from "react";
import { Modal, CircularProgress } from '@material-ui/core';

export default function Progress(props){
  const { open, close } = props;

  return(
    <Modal open={open} onClose={close}>
      <div style={{position: "absolute",top: "46%",left:"48%"}}>
        <CircularProgress color="secondary" />
      </div>
    </Modal>
  )
}
