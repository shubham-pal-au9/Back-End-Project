import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";
import ReplyForm from "./ReplyForm";
import ListConversation from "./ListConversation";
import TicketDetail from "./TicketDetail";
import Alert from "../layout/Alert";
import "./convo.css";

import { getTicket } from "../../actions/ticket";

const TicketConversation = ({
  getTicket,
  user,
  ticket: { ticket, loading },
  match,
}) => {
  useEffect(() => {
    getTicket(match.params.id);
  });

  return loading || ticket === null ? (
    <Spinner />
  ) : (
    <div>
      <Navbar />

      <TicketDetail ticket={ticket} user={user} />
      <Alert />
      <div className='comment_block'>
        {ticket.status === "Resolved" ? null : (
          <ReplyForm ticketId={ticket._id} />
        )}

        {ticket.conversation.map((reply) => (
          <ListConversation
            key={reply._id}
            reply={reply}
            ticketId={ticket._id}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

TicketConversation.propTypes = {
  getTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getTicket })(TicketConversation);
