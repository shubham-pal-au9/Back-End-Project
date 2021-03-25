import React, { Fragment, useState } from "react";
import Alert from "../layout/Alert";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { setAlert } from "../../actions/alert";
import { createTicket } from "../../actions/ticket";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CreateTicket = ({ createTicket }) => {
  const [formData, setFormData] = useState({
    ticket_issue: "",
    priority: "Low",
    req_category: "Desktop/Laptop related issue",
    desc: "",
  });

  const { ticket_issue, priority, req_category, desc } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const handleReset = () => {
    setFormData({
      ticket_issue: "",
      priority: "Low",
      req_category: "Desktop/Laptop related issue",
      desc: "",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    createTicket({ ticket_issue, priority, req_category, desc });
    handleReset();
  };

  return (
    <Fragment>
      <Navbar />
      <br />

      <div className='container-fluid px-lg-4'>
        <div className='row'>
          <div className='d-sm-flex align-items-center justify-content-between mb-4'>
            <h1 className='h3 mb-0 text-gray-800'>{""}</h1>
            <Link
              to='/ticket'
              className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
            >
              <i className='fas fa-arrow-alt-circle-left'></i> <span></span>
              Go back
            </Link>
          </div>
        </div>
      </div>

      <form className='form-basic' onSubmit={(e) => onSubmit(e)}>
        <div className='form-title-row'>
          <h1>Create Ticket</h1>
        </div>
        <Alert />
        <div className='form-row'>
          <label>
            <span>Issue</span>
            <input
              type='text'
              name='ticket_issue'
              value={ticket_issue}
              onChange={(e) => onChange(e)}
            />
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span>Priority</span>
            <select
              name='priority'
              value={priority}
              onChange={(e) => onChange(e)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span>Request Category</span>
            <select
              name='req_category'
              value={req_category}
              onChange={(e) => onChange(e)}
            >
              <option>Desktop/Laptop related issue</option>
              <option>Operating System related Issue</option>
              <option>Peripheral related Issue</option>
              <option>Software related Issue</option>
              <option>System Configuration Upgradation request</option>
            </select>
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span>Description</span>
            <textarea
              name='desc'
              value={desc}
              onChange={(e) => onChange(e)}
            ></textarea>
          </label>
        </div>
        <div className='form-row'>
          <button type='submit'>Submit Form</button>
        </div>
      </form>
      <Footer />
    </Fragment>
  );
};

CreateTicket.propTypes = {
  createTicket: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, createTicket })(CreateTicket);
