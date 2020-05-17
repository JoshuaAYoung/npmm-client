import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import randomWords from 'random-words';
import NavCollections from '../NavCollections/NavCollections';
import TokenService from '../../services/token-service';
import { createCollection } from '../../redux/CollectionListSlice';
import './NavMenu.css';
// import styles from './example.css';

function NavMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.collectionList.loading);
  const isLoggedIn = TokenService.hasAuthToken();

  const setupCollection = () => {
    dispatch(createCollection(randomWords({ min: 2, max: 4, join: '-' }))).then(
      (res) => {
        history.push(`/collection/${res.payload.id}?edit=true`);
      }
    );
  };

  return (
    <>
      <NavLink to="/">Home</NavLink>
      {!isLoggedIn ? (
        <>
          <NavLink to="login" className="menuLink">
            Login
          </NavLink>
          <NavLink to="signup" className="menuLink">
            SignUp
          </NavLink>
        </>
      ) : (
        <NavLink to="/" onClick={TokenService.clearAuthToken}>
          Logout
        </NavLink>
      )}
      {TokenService.hasAuthToken() && (
        <>
          <h3>Collections</h3>
          <button type="button" onClick={setupCollection}>
            +
          </button>
          {loading === 'idle' && <NavCollections />}
        </>
      )}
    </>
  );
}

export default NavMenu;
