import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTickets } from "../../actions/ticket";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import TicketList from "./TicketList";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import ReactPaginate from "react-paginate";
import { getUsers } from "../../actions/user";

const TicketPage = ({
  isAuthenticated,
  user,
  users,
  getTickets,
  getUsers,
  ticket: { tickets, loading },
}) => {
  useEffect(() => {
    getTickets();
    getUsers();
  }, [getTickets,getUsers]);

   const userAllTicket = Object.keys(
    tickets.filter((ticket) => ticket.user === user._id)
  ).length;

  const [allTicket, setallTicket] = useState(true);
  const [newTicket, setnewTicket] = useState(false);
  const [progressTicket, setprogressTicket] = useState(false);
  const [resolvedTicket, setresolvedTicket] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tickets.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onChange = async (e) => {
    e.preventDefault();
    //e.target.value
    if (e.target.value === "New") {
      setallTicket(false);
      setnewTicket(true);
      setprogressTicket(false);
      setresolvedTicket(false);
    } else if (e.target.value === "In Progress") {
      setallTicket(false);
      setnewTicket(false);
      setprogressTicket(true);
      setresolvedTicket(false);
    } else if (e.target.value === "Resolved") {
      setallTicket(false);
      setnewTicket(false);
      setprogressTicket(false);
      setresolvedTicket(true);
    } else {
      setallTicket(true);
      setnewTicket(false);
      setprogressTicket(false);
      setprogressTicket(false);
    }
  };

  return loading && tickets === null ? (
    <Fragment>
      <Navbar />
      <Spinner />
      <Footer />
    </Fragment>
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
                    <h1 className='h3 mb-0 text-gray-800'> Tickets </h1>
                    {user.role === "Client" ? (
                      <Link
                        to='/create-ticket'
                        className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
                      >
                        <i className='fas fa-plus'></i>
                        Create New Ticket
                      </Link>
                    ) : null}
                  </div>
                </div>
                <Alert />
                {/* vhjgjhd */}
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='card'>
                        <div className='card-body'>
                          <h5 className='card-title mb-4'>
                            {" "}
                            Total Tickets Count{" "}
                          </h5>
                          <h1 className='display-5 mt-1 mb-3'>
                           {user.role === "Admin" ? <div> {Object.keys(tickets).length} </div> : <div> {userAllTicket} </div>}
                          
                          </h1>
                          
                          <div className='mb-1'></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-12 mt-4'>
                    <div className='card'>
                      <div className='card-body'>
                        <div className='d-md-flex align-items-center'>
                          <div>
                            <h4 className='card-title'>List Of Tickets</h4>
                          </div>
                          <div className='ml-auto'>
                            <h3 className='card-title'>
                              Filter Tickets by Status
                            </h3>
                            <div className='dl'>
                              <select
                                className="form-select form-select-sm" aria-label=".form-select-sm example"
                                name='status'
                                onChange={(e) => onChange(e)}
                              >
                                <option value='All Ticket' selected=''>
                                  All Ticket
                                </option>
                                <option value='New'>New</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Resolved'>Resolved</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='table-responsive'>
                        <table className='table v-middle'>
                          <thead>
                            <tr className='bg-light'>
                              <th className='border-top-0'>Name</th>
                              <th className='border-top-0'>Email</th>
                              <th className='border-top-0'>Ticket Issues</th>
                              <th className='border-top-0'>Priority</th>
                              <th className='border-top-0'>Description</th>
                              <th className='border-top-0'>Request Category</th>
                              <th className='border-top-0'>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.role === "Client"
                              ? /* tickets
                                  .filter(
                                    (ticket) => ticket.email === user.email
                                  )
                                  .map((filteredTicket) => (
                                    <TicketList
                                      key={filteredTicket.id}
                                      ticket={filteredTicket}
                                    />
                                  )) */
                                (function () {
                                  if (allTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) => ticket.email === user.email
                                      )
                                      .map((ticket) => (
                                        <TicketList
                                          key={ticket.id}
                                          ticket={ticket}
                                        />
                                      ));
                                  } else if (newTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) =>
                                          ticket.status === "New" &&
                                          ticket.email === user.email
                                      )
                                      .map((filterNew) => (
                                        <TicketList
                                          key={filterNew.id}
                                          ticket={filterNew}
                                        />
                                      ));
                                  } else if (progressTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) =>
                                          ticket.status === "In Progress" &&
                                          ticket.email === user.email
                                      )
                                      .map((filterProgress) => (
                                        <TicketList
                                          key={filterProgress.id}
                                          ticket={filterProgress}
                                        />
                                      ));
                                  } else if (resolvedTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) =>
                                          ticket.status === "Resolved" &&
                                          ticket.email === user.email
                                      )
                                      .map((filterProgress) => (
                                        <TicketList
                                          key={filterProgress.id}
                                          ticket={filterProgress}
                                        />
                                      ));
                                  }
                                })()
                              : (function () {
                                  if (allTicket) {
                                    return tickets
                                      .slice(
                                        pagesVisited,
                                        pagesVisited + usersPerPage
                                      )
                                      .map((ticket) => (
                                        <TicketList
                                          key={ticket.id}
                                          ticket={ticket}
                                        />
                                      ));
                                  } else if (newTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) => ticket.status === "New"
                                      )
                                      .slice(
                                        pagesVisited,
                                        pagesVisited + usersPerPage
                                      )
                                      .map((filterNew) => (
                                        <TicketList
                                          key={filterNew.id}
                                          ticket={filterNew}
                                        />
                                      ));
                                  } else if (progressTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) =>
                                          ticket.status === "In Progress"
                                      )
                                      .slice(
                                        pagesVisited,
                                        pagesVisited + usersPerPage
                                      )
                                      .map((filterProgress) => (
                                        <TicketList
                                          key={filterProgress.id}
                                          ticket={filterProgress}
                                        />
                                      ));
                                  } else if (resolvedTicket) {
                                    return tickets
                                      .filter(
                                        (ticket) => ticket.status === "Resolved"
                                      )
                                      .slice(
                                        pagesVisited,
                                        pagesVisited + usersPerPage
                                      )
                                      .map((filterProgress) => (
                                        <TicketList
                                          key={filterProgress.id}
                                          ticket={filterProgress}
                                        />
                                      ));
                                  }
                                })()}
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <div>
                        <ReactPaginate
                          className='d-flex align-items-center'
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* vhjgjhd */}
              </div>
            </div>
          </div>
        </div>
        <div></div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  isAuthenticated: state.auth.isAuthenticated,
  users: state.user.users,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUsers,getTickets })(TicketPage);
