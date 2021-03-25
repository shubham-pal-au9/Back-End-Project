import React from "react";
import Moment from "react-moment";

import { deleteUser } from "../../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserList = ({
  user: { _id, avatar, name, email, role, date },
  deleteUser,
}) => {
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='m-r-10'>
            <img
              className='btn btn-circle text-white'
              src={avatar}
              alt='avatar'
            />
          </div>
          <div>
            <h4 className='m-b-0 font-16'>{name}</h4>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <label className='label label-danger'>
          <Moment format='DD/MM/YYYY'>{date}</Moment>
        </label>
      </td>
      <td>
        {" "}
        <button
          onClick={(e) => deleteUser(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-trash-alt'></i>
        </button>{" "}
      </td>
    </tr>
  );
};

UserList.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
export default connect(null, { deleteUser })(UserList);
