import React from "react";
import { connect } from "react-redux";

import { updateStatus } from "../../actions/ticket";

import PropTypes from "prop-types";

const TicketDetail = ({ ticket, user, updateStatus }) => {
  const onChange = async (e) => {
    e.preventDefault();
    /* console.log(e.target.value); */
    updateStatus(ticket._id, e.target.value);
  };
  return (
    <div className='page-content page-container' id='page-content'>
      <div className='padding'>
        <div className='row container d-flex justify-content-center'>
          <div className='col-xl-12 col-md-12'>
            <div className='card user-card-full'>
              <div className='row m-l-0 m-r-0'>
                <div className='col-sm-12'>
                  <div className='card-block'>
                    <h2 className='m-b-20 p-b-5 b-b-default f-w-600'>
                      Ticket Details
                    </h2>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='m-b-10 f-w-600'>Created By</p>
                        <h6 className='text-muted f-w-400'>{ticket.name}</h6>
                      </div>
                      <div className='col-sm-3'>
                        <p className='m-b-10 f-w-600'>Ticket Status</p>
                        <h6 className='text-muted f-w-400'>{ticket.status}</h6>
                      </div>
                      <div className='col-sm-3'>
                        <p className='m-b-10 f-w-600'>Ticket Issue</p>
                        <h6 className='text-muted f-w-400'>
                          {ticket.ticket_issue}
                        </h6>
                      </div>
                      <div className='col-sm-3'>
                        <p className='m-b-10 f-w-600'>Priority</p>
                        <h6 className='text-muted f-w-400'>
                          {ticket.priority}
                        </h6>
                      </div>
                    </div>
                    <h6 className='m-b-20 m-t-40 p-b-5 b-b-default f-w-600'>
                      {""}
                    </h6>
                    <div className='row'>
                      <div className='col-sm-10'>
                        <p className='m-b-10 f-w-600'>Description</p>
                        <h6 className='text-muted f-w-400'>{ticket.desc}</h6>
                      </div>
                      {user.role === "Admin" ? (
                        <div className='form-row col-sm-2'>
                          <label>
                            <p className='m-b-10 f-w-600'>Update Status</p>
                            <select name='status' onChange={(e) => onChange(e)}>
                              <option selected value=''>
                                Select an option
                              </option>
                              <option value='New'>New</option>
                              <option value='In Progress'>In Progress</option>
                              <option value='Resolved'>Resolved</option>
                            </select>
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TicketDetail.propTypes = {
  updateStatus: PropTypes.func.isRequired,
};

export default connect(null, { updateStatus })(TicketDetail);
