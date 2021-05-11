import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  InputLabel,
  Input,
  FormHelperText,
  FormControl,
  FilledInput,
  OutlinedInput,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { setUser ,setLogin , setNotes } from "./../appStore/actions";
import { URL } from "./../common";
import Progress from "./Progress";

const Form = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [state, setState] = useState(true);

  const reset = () => {
    setUserName('');
    setPassword('');
    props.refresh();
    props.close();
  }

  const signIn = async () => {
    return await fetch( URL + '/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password : password})
    })
  }

  const signUp = async () => {
    return await fetch( URL + '/user/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password : password})
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username!=='' && password!==''){
      setLoading(true);
      if(state){
        await signIn()
        .then(res => res.json())
        .then((res)=>{
          if (res.statusCode === 200){
            localStorage.setItem('userToken', JSON.stringify({userId:res.user.id,token:res.token}));
            props.fetchNotes(res.user.id)
            reset();
          }
          setLoading(false);
          enqueueSnackbar(res.message, { variant:"info" });
        }).catch((err) => {
          console.log("Error",err);
          setLoading(false);
        });
      }else{
        await signUp()
        .then(res => res.json())
        .then(async (res)=>{
          if (res.statusCode === 201){
            await signIn()
            .then(res => res.json())
            .then((res)=>{
              if (res.statusCode === 200){
                localStorage.setItem('userToken', JSON.stringify({userId:res.user.id,token:res.token}));
                reset();
              }
              setLoading(false);
            }).catch((err) => {
              console.log("Error",err);
              setLoading(false);
            });
          }
          setLoading(false);
          enqueueSnackbar(res.message, { variant:"info" });
        }).catch((err) => {
          console.log("Error",err);
          setLoading(false);
        });
      }
    }else{
      setLoading(false);
      enqueueSnackbar('Enter Username or Password', { variant:"info" });
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.headerText}>Sign In / Sign Up User</div>
      <Grid container className={classes.main} spacing={2} direction="column" justify="center" alignItems="center">
        <Grid item>
          <FormControl>
             <InputLabel htmlFor="component-helper" className={classes.inputLabelText}>Username</InputLabel>
             <Input
               id="component-helper"
               value={username}
               className={classes.inputLabelText}
               onChange={e => setUserName(e.target.value)}
               aria-describedby="component-helper-text"
             />
           </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
             <InputLabel htmlFor="component-helper" className={classes.inputLabelText}>Password</InputLabel>
             <Input
               id="component-helper"
               value={password}
               type="password"
               className={classes.inputLabelText}
               onChange={e => setPassword(e.target.value)}
               aria-describedby="component-helper-text"
             />
           </FormControl>
        </Grid>
        <Progress open={isLoading} close={()=>setLoading(false)}/>
        <Grid item style={{marginTop:5}}>
          <Grid item>
            <Button type="submit" style = {{textTransform: "none",color:"#fff"}} className={classes.inputBottomText} variant="contained" color="primary" onClick={(e)=>{handleSubmit(e)}}>
              {state?'Login':'Register'}
            </Button>
          </Grid>
        </Grid>
        <div style={{alignItems:"center",justify:"center"}} className={classes.inputBottomText}>{state?'New User ?':'Already User ?'} <Button style = {{textTransform: "none",padding:0,fontWeight:"bold"}} className={classes.inputBottomText} onClick={()=>{setState(!state)}}>{state?'Register':'Login'}</Button></div>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root:{
    padding:30,
    backgroundColor:'#F7CAC9',
  },
  main:{
    marginTop:8
  },
  headerText:{
    fontFamily:'McLaren, cursive',
    color:"#ff0080",
    fontSize:"22px",
    fontWeight: '200',
  },
  inputLabelText:{
    fontFamily:'McLaren, cursive',
    color:"#D65076",
    fontSize:"16px",
    fontWeight: '200',
  },
  inputBottomText:{
    marginTop:5,
    fontFamily:'McLaren, cursive',
    color:"#ff0080",
    fontSize:"16px",
    fontWeight: '200',
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

export default connect(mapStateToProps,mapDispatchToProps)(Form);
