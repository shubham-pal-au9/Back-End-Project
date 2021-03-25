import React, { useEffect } from "react";
import "./admindashboard.css";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Profile from "./Profile";
import Alert from "../layout/Alert";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/user";
import { getTickets } from "../../actions/ticket";

const ClientDashboard = ({
  getUsers,
  getTickets,
  users,
  tickets,
  user,
  isAuthenticated,
}) => {
  useEffect(() => {
    getUsers();
    getTickets();
  }, [getUsers, getTickets]);

  const userNewTicket = Object.keys(
    tickets
      .filter((ticket) => ticket.status === "New")
      .filter((ticket) => ticket.user === user._id)
  ).length;

  const userProgressTicket = Object.keys(
    tickets
      .filter((ticket) => ticket.status === "In Progress")
      .filter((ticket) => ticket.user === user._id)
  ).length;

  const userAllTicket = Object.keys(
    tickets.filter((ticket) => ticket.user === user._id)
  ).length;

  /* const numProgressnew = Object.keys(
  tickets.map((ticket) => {
  users.filter(user => ticket.user === user._id);
    
  })).length; */

  return !isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div id='wrapper'>
      <div className='overlay'></div>

      <div id='page-content-wrapper'>
        <div id='content'>
          <div className='container-fluid p-0 px-lg-0 px-md-0'>
            {/* Navbar */}
            <Navbar />

            <div className='container-fluid px-lg-4'>
              <div className='row'>
                <div className='col-md-12 mt-lg-4 mt-4'>
                  <div className='d-sm-flex align-items-center justify-content-between mb-4'>
                    <h1 className='h3 mb-0 text-gray-800'>Dashboard</h1>
                    <Link
                      to='/ticket'
                      className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
                    >
                      <i className='fas fa-download fa-sm text-white-50'></i>
                      View Ticket Lists
                    </Link>
                  </div>
                </div>

                {/* vhjgjhd */}
                <Alert />
                <Profile user={user} />
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='card'>
                        <div className='card-body'>
                          <h5 className='card-title mb-4'>
                            Total Tickets Count
                          </h5>
                          <h1 className='display-5 mt-1 mb-3'>
                            {userAllTicket}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-3'>
                      <div className='card'>
                        <div className='card-body'>
                          <h5 className='card-title mb-4'>
                            In Progress Tickets Count
                          </h5>

                          <h1 className='display-5 mt-1 mb-3'>
                            {userProgressTicket}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-3'>
                      <div className='card'>
                        <div className='card-body'>
                          <h5 className='card-title mb-4'>New Tickets Count</h5>

                          <h1 className='display-5 mt-1 mb-3'>
                            {userNewTicket}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* vhjgjhd */}
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  users: state.user.users,
  tickets: state.ticket.tickets,
});
export default connect(mapStateToProps, { getUsers, getTickets })(
  ClientDashboard
);
