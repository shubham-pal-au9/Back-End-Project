import React, { Fragment, useState } from "react";

import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";
import Alert from "../layout/Alert";
import "./login.css";
import { connect } from "react-redux";
import { reset } from "../../actions/auth";

const Reset = ({ reset, isAuthenticated, user }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    reset(email);
    history.push("/");
  };

  //Redirect if logged in
  if (isAuthenticated) {
    if (user.role === "Admin") return <Redirect to="/admin-dashboard" />;
    else {
      return <Redirect to="/client-dashboard" />;
    }
  }

  return (
    <Fragment>
      <div className="my-login-page">
        <section className="h-100">
          <div className="container h-100 ">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="brand">
                  {/* <img
                    src='https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__account_male-512.png'
                    alt='logo'
                  /> */}
                </div>
                <Alert />
                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">
                      Enter your email to reset your password
                    </h4>
                    <form
                      className="my-login-validation"
                      onSubmit={(e) => onSubmit(e)}
                    >
                      <div className="form-group mt-4">
                        <label htmlFor="email" className="mb-2">
                          E-Mail Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          autoFocus
                        />
                      </div>
                      <div className="form-group mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Submit
                        </button>
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

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { reset })(Reset);
