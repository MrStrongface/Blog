import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../Redux/slices/Auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

    const { register, handleSubmit, formState : {errors, isValid}} = useForm({
     defaultValues:{
        fullName: '',
        email: '',
        password: ''
    },
    mode: 'onChange'
   });
    
   const onRegist = async (values) =>{
    const data = await dispatch(fetchRegister(values)); 
    console.log(data);
    if( !data.payload ){
      return alert('Не удалось Зарегестрироваться!');
    }
};

 
      if(isAuth){
     return <Navigate to="/"/>
     };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
      New user
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit = {handleSubmit(onRegist)}>

      <TextField className={styles.field} 
      label="Full name"
       fullWidth 
      error = {Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {...register('fullName', {required: 'Укажите имя'})} 
      />

      <TextField className={styles.field}
      label="E-Mail"
      type = "email"
      error = {Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      {...register('email', {required: 'Укажите почту'})} 
      fullWidth />

      <TextField className={styles.field} 
      label="Password"
      error = {Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password', {required: 'Enter to Pass'})}
       fullWidth />
      <Button  disabled = { !isValid } size="large" type ="submit" variant="contained" fullWidth>
        SignUp
      </Button>
      </form>
    </Paper>
  );
};
