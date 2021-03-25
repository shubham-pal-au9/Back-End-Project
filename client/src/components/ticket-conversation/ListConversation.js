import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Moment from "react-moment";

const ListConversation = ({
  ticketId,
  reply: { _id, text, name, avatar, user, date },
  auth,
}) => {
  return (
    <div className='new_comment'>
      <ul className='user_comment'>
        <div className='user_avatar'>
          <img src={avatar} alt='user-avatar' />
        </div>
        <div className='comment_body'>
          <p>{text}</p>
        </div>

        <div className='comment_toolbar'>
          <div className='comment_details'>
            <ul>
              <li>
                <i className='fa fa-clock-o'></i>
                <Moment date={date} format='hh:mm:ss' durationFromNow />
              </li>
              <li>
                <i className='fa fa-calendar'></i>{" "}
                <Moment format='DD/MM/YYYY'>{date}</Moment>
              </li>
              <li>
                <i className='fa fa-pencil'></i>{" "}
                <span className='user'>{name}</span>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  );
};

ListConversation.propTypes = {
  ticketId: PropTypes.number.isRequired,
  reply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ListConversation);
