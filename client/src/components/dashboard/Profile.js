import React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const Profile = ({ user }) => {
  return (
    <div>
      <div className='page-content page-container' id='page-content'>
        <div className='padding'>
          <div className='row container d-flex justify-content-center'>
            <div className='col-xl-12 col-md-12'>
              <div className='card user-card-full'>
                <div className='row m-l-0 m-r-0'>
                  <div className='col-sm-4 bg-c-lite-green user-profile'>
                    <div className='card-block text-center text-white'>
                      <div className='m-b-25'>
                        <img
                          src={user.avatar}
                          className='img-radius'
                          alt='User-avatar'
                        />
                      </div>
                      <h6 className='f-w-600'>{user.name}</h6>

                      <i className=' mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16'></i>
                    </div>
                  </div>
                  <div className='col-sm-8'>
                    <div className='card-block'>
                      <h2 className='m-b-20 p-b-5 b-b-default f-w-600'>
                        Welcome, {user.name}
                      </h2>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Email</p>
                          <h6 className='text-muted f-w-400'>{user.email}</h6>
                        </div>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Unique Id</p>
                          <h6 className='text-muted f-w-400'>{user._id}</h6>
                        </div>
                      </div>
                      <h6 className='m-b-20 m-t-40 p-b-5 b-b-default f-w-600'>
                        {""}
                      </h6>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Role</p>
                          <h6 className='text-muted f-w-400'>{user.role}</h6>
                        </div>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Active From</p>
                          <h6 className='text-muted f-w-400'>
                            <Moment format='DD/MM/YYYY'>{user.date}</Moment>
                          </h6>
                        </div>
                        <div className='editprofile'>
                          <Link
                            to='/edit-profile'
                            className='d-sm-inline-block btn btn-sm btn-primary shadow-sm'
                          >
                            <i className='fa fa-check' aria-hidden='true'></i>
                            Edit Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
