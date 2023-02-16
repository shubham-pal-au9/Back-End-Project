import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Profile from "./Profile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";
import { getTickets } from "../../actions/ticket";
import UserList from "../user/UserList";
import ReactPaginate from "react-paginate";
import Alert from "../layout/Alert";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import PropTypes from "prop-types";

const AdminDashboard = ({
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

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const numNew = Object.keys(
    tickets.filter((ticket) => ticket.status === "New")
  ).length;

  const numProgress = Object.keys(
    tickets.filter((ticket) => ticket.status === "In Progress")
  ).length;

  const data = [
    {
      name: "In Progress Tickets",
      uv: numProgress,
    },
    {
      name: "New Tickets",
      uv: numNew,
    },
  ];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return <UserList key={user.id} user={user} />;
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div id="wrapper">
      <div className="overlay"></div>

      <div id="page-content-wrapper">
        <div id="content">
          <div className="container-fluid p-0 px-lg-0 px-md-0">
            <Navbar />

            <div className="container-fluid px-lg-4">
              <div className="row">
                <div className="col-md-12 mt-lg-4 mt-4">
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  </div>
                </div>
                {/* vhjgjhd */}
                <Alert />
                <Profile user={user} />
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-4">Client Count</h5>
                          <h1 className="display-5 mt-1 mb-3">
                            {Object.keys(users).length}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-4">
                            Total Tickets Count
                          </h5>
                          <h1 className="display-5 mt-1 mb-3">
                            {Object.keys(tickets).length}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-4">
                            In Progress Tickets Count
                          </h5>

                          <h1 className="display-5 mt-1 mb-3">{numProgress}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-4">New Tickets Count</h5>

                          <h1 className="display-5 mt-1 mb-3">{numNew}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="graph-title-admin">
                      Graphical Representation of In Progress and New Tickets
                    </div>
                    <div className="graph-chart">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar
                          dataKey="uv"
                          fill="#8884d8"
                          shape={<TriangleBar />}
                          label={{ position: "top" }}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={colors[index % 20]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-md-flex align-items-center">
                          <div>
                            <h4 className="card-title">List Of Users</h4>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table v-middle">
                          <thead>
                            <tr className="bg-light">
                              <th className="border-top-0">Name</th>
                              <th className="border-top-0">Email</th>
                              <th className="border-top-0">Role</th>
                              <th className="border-top-0">
                                User Created Date
                              </th>
                              <th className="border-top-0">Action</th>
                            </tr>
                          </thead>
                          <tbody>{displayUsers}</tbody>
                        </table>
                      </div>{" "}
                      <br />
                      <div className="reactpaginate">
                        <ReactPaginate
                          className="d-flex align-items-center"
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

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  users: state.user.users,
  tickets: state.ticket.tickets,
});
export default connect(mapStateToProps, { getUsers, getTickets })(
  AdminDashboard
);
