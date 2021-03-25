import React from "react";
import { Link } from "react-router-dom";
import "./ticketpage.css";
const TicketList = ({ ticket }) => {
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='m-r-10'>
            <img
              className='btn btn-circle text-white'
              src={ticket.avatar}
              alt='avatar'
            />
          </div>
          <div className=''>
            <h4 className='m-b-0 font-16'>{ticket.name}</h4>
          </div>
        </div>
      </td>
      <td>{ticket.email}</td>
      <td>
        <Link className='ticket-issue' to={`/ticket/${ticket._id}`}>
          {ticket.ticket_issue}
        </Link>
      </td>
      <td>{ticket.priority}</td>
      <td>{ticket.desc}</td>
      <td>{ticket.req_category}</td>
      <td>
        <label className='label label-danger'>{ticket.status}</label>
      </td>
    </tr>
  );
};

export default TicketList;
