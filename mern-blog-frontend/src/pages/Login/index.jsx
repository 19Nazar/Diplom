import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { fetchUserData, Authornot } from '../../reduxe/slices/auth';


import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(Authornot)
  const dispatch = useDispatch();
  
  const { register, handleSubmit, setError, formState: { errors, isValid }, 
} = useForm ({
    defaultValues: {
      email: '', //Maiern@gmail.com
      password: '' //43213qwe
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      return alert('Не вдалося авторизуватися');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } // else {
    //   alert('Не вдалося авторизуватися');
    // }

  };


    if (isAuth){
      return <Navigate to="/"/>;
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {... register('email', {required: 'Вкажіть свою пошту'})}
        fullWidth
      />
      <TextField 
      className={styles.field} 
      label="Пароль" 
      error = {Boolean(errors.password?.message)}
      helperText={errors.password?.message}
        {... register('password', {required: 'Вкажіть свій пароль'})}
      fullWidth 
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Вхід
      </Button>
      </form>
    </Paper>
  );
};
