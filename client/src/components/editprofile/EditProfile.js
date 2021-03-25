import React, { Fragment, useState } from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { setAlert } from "../../actions/alert";
import { editProfile } from "../../actions/user";
import Alert from "../layout/Alert";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EditProfile = ({ user, editProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    password: "",
  });

  const { name, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const handleReset = () => {
    setFormData({
      name: "",
      avatar: "",
      password: "",
      password2: "",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      if (image === "") {
        editProfile(user._id, {
          name,
          avatar:
            "https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg",
          password,
        });
        handleReset();
      } else {
        editProfile(user._id, { name, avatar: image, password });
        handleReset();
      }
    }
  };

  // cloudinary portion
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "geekyimages");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dofpr6xiq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file.secure_url);

    setImage(file.secure_url);
    setLoading(false);
  };

  const admin_links = (
    <div className='container-fluid px-lg-4'>
      <div className='row'>
        <div className='d-sm-flex align-items-center justify-content-between mb-4'>
          <h1 className='h3 mb-0 text-gray-800'>{""}</h1>
          <Link
            to='/admin-dashboard'
            className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
          >
            <i className='fas fa-arrow-alt-circle-left'></i> <span></span>
            Go back
          </Link>
        </div>
      </div>
    </div>
  );

  const client_links = (
    <div className='container-fluid px-lg-4'>
      <div className='row'>
        <div className='d-sm-flex align-items-center justify-content-between mb-4'>
          <h1 className='h3 mb-0 text-gray-800'>{""}</h1>
          <Link
            to='/client-dashboard'
            className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
          >
            <i className='fas fa-arrow-alt-circle-left'></i> <span></span>
            Go back
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Navbar /> <br />
      <div> {user.role === "Admin" ? admin_links : client_links} </div>
      <form className='form-basic' onSubmit={(e) => onSubmit(e)}>
        <div className='form-title-row'>
          <h1>Edit Profile</h1>
        </div>
        <Alert />
        <div className='form-row'>
          <label>
            <span> Name </span>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              placeholder='Enter full name'
            />
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span> Update Image </span>
            <input type='file' name='fileupload' onChange={uploadImage} />
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span>Password</span>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              placeholder='Enter new password'
            />
          </label>
        </div>

        <div className='form-row'>
          <label>
            <span>Confirm New Password</span>
            <input
              type='password'
              name='password2'
              onChange={(e) => onChange(e)}
              placeholder='Re-enter new password'
            />
          </label>
        </div>
        <div className='form-row'>
          <button type='submit'>Update Profile</button>
        </div>
      </form>
      <Footer />
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, editProfile })(EditProfile);
