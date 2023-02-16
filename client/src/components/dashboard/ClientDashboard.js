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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

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

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

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

  const data = [
    {
      name: "In Progress Tickets",
      uv: userProgressTicket,
    },
    {
      name: "New Tickets",
      uv: userNewTicket,
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

  /* const numProgressnew = Object.keys(
  tickets.map((ticket) => {
  users.filter(user => ticket.user === user._id);
    
  })).length; */

  return !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div id="wrapper">
      <div className="overlay"></div>

      <div id="page-content-wrapper">
        <div id="content">
          <div className="container-fluid p-0 px-lg-0 px-md-0">
            {/* Navbar */}
            <Navbar />
            <div className="container-fluid px-lg-4">
              <div className="row">
                <div className="col-md-12 mt-lg-4 mt-4">
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <Link
                      to="/ticket"
                      className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                      <i className="fas fa-download fa-sm text-white-50"></i>
                      View Ticket Lists
                    </Link>
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
                          <h5 className="card-title mb-4">
                            Total Tickets Count
                          </h5>
                          <h1 className="display-5 mt-1 mb-3">
                            {userAllTicket}
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

                          <h1 className="display-5 mt-1 mb-3">
                            {userProgressTicket}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-4">New Tickets Count</h5>

                          <h1 className="display-5 mt-1 mb-3">
                            {userNewTicket}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-graph">
                    <div className="graph-title-client">
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
