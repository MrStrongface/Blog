import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { selectIsAuth } from '../../Redux/slices/Auth';
import { logout } from '../../Redux/slices/Auth'

export const Header = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)


  const Ext = () =>{
    if(window.confirm('want to go out?')){
      dispatch(logout());
    }
    window.localStorage.removeItem('token');
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Go to title</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Сreate article</Button>
                </Link>
                <Button onClick={Ext} variant="contained" color="error">
                  Exit
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">SignIn</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">SignUp</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
