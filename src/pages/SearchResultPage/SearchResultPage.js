import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PackageList from '../../components/PackageList/PackageList';
import ErrorBoundary from '../../ErrorBoundary';
import { getPackages } from '../../redux/SearchResultsSlice';
// import styles from './example.css';

function SearchResultPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const parsed = queryString.parse(location.search);

  const searchResults = useSelector((state) => state.searchResults);

  useEffect(() => {
    dispatch(getPackages({ searchTerm: parsed.q }));
  }, [searchResults.searchTerm]);

  const loadMore = () => {
    if (searchResults.packs.length && searchResults.loading === 'idle') {
      dispatch(
        getPackages({
          searchTerm: parsed.q,
          offset: searchResults.packs.length,
        })
      );
    }
  };

  return (
    <ErrorBoundary>
      <section>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={true || false}
          threshold={1000}
        >
          {searchResults.packs.length > 0 && (
            <PackageList packs={searchResults.packs} />
          )}
        </InfiniteScroll>
        {searchResults.loading === 'pending' && <p>Loading...</p>}
      </section>
    </ErrorBoundary>
  );
}

export default SearchResultPage;
