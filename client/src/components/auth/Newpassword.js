import React, { Fragment, useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

import "./login.css";
import { connect } from "react-redux";
import { newPassword } from "../../actions/auth";

const Newpassword = ({ newPassword, setAlert }) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const history = useHistory();

  const { password, password2 } = formData;
  const { token } = useParams();

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      newPassword(password, token);
      history.push("/");
    }
  };

  //Redirect if logged in
  /* if (isAuthenticated) {
    if (user.role === "Admin") return <Redirect to='/admin-dashboard' />;
    else {
      return <Redirect to='/client-dashboard' />;
    }
  } */

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
                    <h4 className='card-title'>Reset Password</h4>
                    <Alert />
                    <form
                      className='my-login-validation'
                      onSubmit={(e) => onSubmit(e)}
                    >
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
                        <label htmlFor='password' className='mb-2'>
                          Confirm Password
                        </label>

                        <input
                          id='password2'
                          type='password'
                          className='form-control'
                          name='password2'
                          value={password2}
                          onChange={(e) => onChange(e)}
                          minLength='6'
                        />
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

Newpassword.propTypes = {
  newPassword: PropTypes.func.isRequired,
};

export default connect(null, { newPassword, setAlert })(Newpassword);
