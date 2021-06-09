import React, { useContext, Suspense, useLayoutEffect } from 'react';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import {
  RoomDetails, Home, RoomsList, Favorites, HostForm, Listings, Bookings,
} from '../routes';
import ScrollToTop from './ScrollToTop';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
// import Modal from "./Components/Modal/Modal"
import Signup from '../Components/Signup/Signup';
import SearchResults from '../Components/SearchResults/SearchResults';
import styles from './Container.module.css';
import AuthContext from '../store/AuthContext';
import Spinner from '../Components/Spinner/Spinner';

interface Props {
    history: any;

}

const Container = (props: Props) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ctx = useContext(AuthContext);

  return (
    <div className={styles.Wrapper}>
      <Header {...props} />
      <ScrollToTop>
      <Switch>
        <Route
          path="/room/:roomId"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <RoomDetails />
            </Suspense>
          )}
        />
        <Route
          path="/rooms/:location"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <RoomsList />
            </Suspense>
          )}
        />
        {ctx.loggedIn && (
          <Route
            path="/:username/favorites"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Favorites />
              </Suspense>
            )}
          />
        )}
        {ctx.loggedIn && (
             <Route
             path="/:username/bookings"
             render={() => (
               <Suspense fallback={<Spinner />}>
                 <Bookings />
               </Suspense>
             )}
           />
        )}
        {ctx.userData.type === 'host' && (
          <Route
            path="/:username/listings"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Listings />
              </Suspense>
            )}
          />
        )}
        <Route
          path="/host/listroom"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <HostForm />
            </Suspense>
          )}
        />
        <Route
          path="/home"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <Home show={ctx.show} hostSignUp={ctx.hostSignUp} />
            </Suspense>
          )}
        />
        <Redirect to="/home" />
      </Switch>
      </ScrollToTop>
      <Signup />
      {ctx.showResults ? <SearchResults results={ctx.searchResults} /> : null}
      <Footer />
    </div>
  );
};

export default withRouter(Container);
