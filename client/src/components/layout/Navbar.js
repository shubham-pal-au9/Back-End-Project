import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const client_links = (
    <nav className='navbar bg-dark'>
      <p>
        <Link to='/client-dashboard'>
          <i className='fas fa-user'></i> CRM Ticket System
        </Link>
      </p>
      <ul>
        <li>
          <Link className='nav-link' to='/client-dashboard'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/ticket'>
            Ticket
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='#' onClick={logout}>
            <i className='fas fa-sign-out-alt'></i>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );

  const admin_links = (
    <nav class='navbar bg-dark'>
      <p>
        <Link to='/admin-dashboard'>
          <i class='fas fa-user'></i> CRM Ticket System
        </Link>
      </p>
      <ul>
        <li>
          <Link className='nav-link' to='/admin-dashboard'>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/user-page'>
            <span> Users </span>
          </Link>
        </li>

        <li>
          <Link className='nav-link' to='/ticket'>
            Ticket
          </Link>
        </li>

        <li>
          <Link className='nav-link' to='#' onClick={logout}>
            <i className='fas fa-sign-out-alt'></i>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <Fragment>{user.role === "Admin" ? admin_links : client_links}</Fragment>
  );
};

Navbar.propsTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
