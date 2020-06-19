import React, { useContext } from "react";
import { Link, NavLink} from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" class="navbar-brand">
          Rent Me
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <NavLink to="/" exact>
              <li class="nav-link">
                All Users
              </li>
            </NavLink>
            {auth.isLoggedIn && (
              <NavLink to={`/${auth.userId}/ads`}>
                <li class="nav-link">My Ads</li>
              </NavLink>
            )}

            {auth.isLoggedIn && (
              <NavLink to="/ads/new" exact>
                <li class="nav-link">
                  Post Ad
                </li>
              </NavLink>
            )}
            {!auth.isLoggedIn && (
              <NavLink to="/auth" exact>
                <li class="nav-link">
                  Authenticate
                </li>
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <NavLink to="/">
                <li onClick={auth.logout} class="nav-link">LOGOUT</li>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
