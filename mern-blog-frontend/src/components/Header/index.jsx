import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Authornot, logout } from '../../reduxe/slices/auth';


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(Authornot)

  const onClickLogout = () => {
    if (window.confirm('Ви впевнені що хочете вийти?')){
    dispatch(logout());
    window.localStorage.removeItem('token'); //видалення токіну
    };
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Головна сторінка</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Вихід
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Вхід</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити користувача</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
