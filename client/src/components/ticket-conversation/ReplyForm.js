import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addReply } from "../../actions/ticket";

const ReplyForm = ({ user, ticketId, addReply }) => {
  const [text, setText] = useState("");

  return (
    <div className='create_new_comment'>
      <div className='user_avatar'>
        <img src={user.avatar} alt='user_avatar' />
      </div>
      <div className='input_comment'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addReply(ticketId, { text });
            setText("");
          }}
        >
          <input
            type='text'
            placeholder='Reply Here..'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input className='btn-submit' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
};

ReplyForm.propTypes = {
  addReply: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { addReply })(ReplyForm);
