import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegistMe, Authornot } from '../../reduxe/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(Authornot)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid }, 
} = useForm ({
    defaultValues: {
      nickname: '', //Maier
      email: '', //naza@gmail.com
      password: '' //43213
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegistMe(values));
    if (!data.payload) {
      return alert('Не вдалося зареєструватися');
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
        Створення власного аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
      error = {Boolean(errors.nickname?.message)}
      helperText={errors.nickname?.message}
      {... register('nickname', {required: 'Вкажіть повний nickname'})}
      className={styles.field} 
      label="Ваш nickname" 
      fullWidth />
      <TextField 
      error = {Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      type="email"
      {... register('email', {required: 'Вкажіть свою пошту'})}
      className={styles.field} 
      label="E-Mail" 
      fullWidth />
      <TextField         
      error = {Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      type="password"
      {... register('password', {required: 'Вкажіть пароль'})}
      className={styles.field} 
      label="Пароль" 
      fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Зареєструватися
      </Button>
      </form>
    </Paper>
  );
};
