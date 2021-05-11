import React, { useState, useEffect } from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import { Grid, Paper, Button, Dialog } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setUser ,setLogin , setNotes } from "./../appStore/actions";
import Form from './Form';
import { URL } from "./../common";

function Header(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { data, setLogin, setNotes, setUser, fetchNotes } = props;
  const { isLogin, user, notes } = data;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    let data = localStorage.getItem('userToken');
    let token = JSON.parse(data);
    if(token){
      await fetch(URL +'/user/verify',{
          method: 'GET',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Token '+token.token},
      }).then( res => res.json() )
      .then((res)=>{
        setLogin(true);
        setUser(res);
      })
    }else{
      setUser([]);
      setLogin(false);
      setNotes([]);
    }
  }

  const close = () => {
    setOpen(false);
  }

  const signOut = () => {
    localStorage.setItem('userToken',JSON.stringify(''))
    setLogin(false);
    setUser([]);
    setNotes([]);
    enqueueSnackbar('SignOut Successfull !!', { variant:"success" });
  }

  return (
    <Grid className={classes.header} container justify="space-between" alignItems="center">
      <Grid item>
        <div className={classes.headerText}> <HighlightIcon/> Keeper</div>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={1} justify="center"  alignItems="center">
          <Grid item>
            <Button className={classes.headerLoginText} disabled={isLogin?true:false} onClick={() => { setOpen(true) }}>{!isLogin?'Login':user.username}</Button>
          </Grid>
          {isLogin?<Grid item>
              <Button className={classes.headerSignOutText} onClick={() => { signOut() }}>SignOut</Button>
            </Grid>:''}
        </Grid>
        <Dialog open={open} onClose={close}>
          <Form close={close} refresh={()=>setData()} fetchNotes={fetchNotes}/>
        </Dialog>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#f5ba13',
    padding: '16px 32px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
  },
  headerText : {
    color: '#fff',
    fontFamily: 'McLaren, cursive',
    fontWeight: '200',
    fontSize:"28px"
  },
  headerLoginText : {
    color: '#fff',
    fontFamily:'McLaren, cursive',
    backgroundColor:'transparent',
    fontWeight: '200',
    fontSize:"18px",
    textTransform: "none"
  },
  headerSignOutText:{
    color: '#fff',
    fontFamily:'McLaren, cursive',
    backgroundColor:'transparent',
    fontWeight: '200',
    fontSize:"12px",
    textTransform: "none"
  }
}));

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

export default connect(mapStateToProps,mapDispatchToProps)(Header);
