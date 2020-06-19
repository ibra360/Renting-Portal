import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";

import Users from "./user/pages/Users";
import UserAds from "./ads/pages/UserAds";
import Navbar from "./shared/components/Navigation/Navbar";
import NewAd from "./ads/pages/NewAd";
import UpdateAd from "./ads/pages/UpdateAd";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserId] = useState(false);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/ads" exact>
          <UserAds />
        </Route>
        <Route path="/ads/new" exact>
          <NewAd />
        </Route>
        <Route path="/ads/:adId" exact>
          <UpdateAd />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/ads" exact>
          <UserAds />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userID,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <main>{routes}</main>
        {/* <footer><div>Copyrights by ABDULLAH IBRAHIM</div></footer> */}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
