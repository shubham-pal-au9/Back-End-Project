import React, { Fragment, useState } from "react";

import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";
import Alert from "../layout/Alert";
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    if (user.role === "Admin") return <Redirect to='/admin-dashboard' />;
    else {
      return <Redirect to='/client-dashboard' />;
    }
  }

  return (
    <Fragment>
      <div className='my-login-page'>
        <section className='h-100'>
          <div className='container h-100 '>
            <div className='row justify-content-md-center h-100'>
              <div className='card-wrapper'>
                <div className='brand'>
                  <img
                    src='https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__account_male-512.png'
                    alt='logo'
                  />
                </div>
                <div className='card fat'>
                  <div className='card-body'>
                    <h4 className='card-title'>Login</h4>
                    <Alert />
                    <form
                      className='my-login-validation'
                      onSubmit={(e) => onSubmit(e)}
                    >
                      <div className='form-group mt-4'>
                        <label htmlFor='email' className='mb-2'>
                          E-Mail Address
                        </label>
                        <input
                          id='email'
                          type='email'
                          className='form-control'
                          name='email'
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          autoFocus
                        />
                      </div>

                      <div className='form-group mt-4'>
                        <label htmlFor='password' className='mb-2'>
                          Password
                        </label>

                        <input
                          id='password'
                          type='password'
                          className='form-control'
                          name='password'
                          value={password}
                          onChange={(e) => onChange(e)}
                          minLength='6'
                        />
                      </div>

                      <div className='form-group mt-4'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-lg'
                        >
                          Login
                        </button>
                      </div>
                      <div className='mt-4 text-center forgot-link'>
                        Forgot Password? <Link to='/reset'>Click Here</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
