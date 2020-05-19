import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchFor } from '../../redux/SearchResultsSlice';
import './SearchBox.css';

function SearchBox(props) {
  const [tempSearch, setTempSearch] = useState('');
  const [animationClass, setAnimationClass] = useState(
    props.searchInputClass === 'navSearchInput' ? 'searchSlideOut' : ''
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const hideSearch = () => {
    if (props.searchInputClass === 'navSearchInput') {
      setAnimationClass('searchSlideIn');
      setTimeout(() => {
        props.unmountSearch();
      }, 1000);
    }
  };

  const setSearch = (input) => {
    setTempSearch(input);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(searchFor(tempSearch));
    history.push(`/search?q=${tempSearch}`);
  };

  return (
    <div className={`${props.classProps} ${animationClass}`}>
      <form
        className={props.searchFormClass}
        onSubmit={handleSubmit}
        aria-label="npm package search"
        autoComplete="off"
      >
        <input
          placeholder="Search packages"
          autoFocus
          type="text"
          name="packageSearch"
          id="packageSearch"
          className={props.searchInputClass}
          aria-label="npm package search"
          onBlur={hideSearch}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        {props.searchInputClass === 'navSearchInput' && (
          <div className="searchDivider" />
        )}
        <button
          type="submit"
          className={props.searchButtonClass}
          aria-label="search button"
        >
          {props.searchButton}
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
