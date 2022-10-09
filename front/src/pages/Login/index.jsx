import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth , selectIsAuth} from '../../Redux/slices/Auth';
import { Navigate } from 'react-router-dom';

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch()

  const { register, handleSubmit, formState : {errors, isValid}} = useForm({
       defaultValues:{
           email: 'Daufnito@gmail.com',
           password: 'Marie1234'
       },
       mode: 'onChange'
  });

  const onSubmit = async (values) =>{
      const data = await dispatch(fetchAuth(values)); 
      console.log(data);
      if( !data.payload ){
        return alert('Не удалось авторизоваться!');
      }
      
      if('token' in data.payload){
        window.localStorage.setItem('token', data.payload.token);
      }
  };
  
  console.log("Auth", isAuth);

  if(isAuth){
     return <Navigate to="/"/>
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
  <form onSubmit = {handleSubmit(onSubmit)} >
      <TextField
        className={styles.field}
        label="E-Mail"
        type = "email"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Укажите почту'})}
        fullWidth
      />
      <TextField className={styles.field}
       label="Password"
       helperText={errors.password?.message}
       error = {Boolean(errors.password?.message)}
        {...register('password', {required: 'Enter a password'})}
        fullWidth />
      <Button size="large" disabled = { !isValid } type = "submit" variant="contained" fullWidth>
        SignIn
      </Button>
  </form>
    </Paper>
  );
};
