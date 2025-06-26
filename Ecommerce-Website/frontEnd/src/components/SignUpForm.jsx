import React from "react";
import "../styles/SignUpForm.css";

const signUpForm = () => {
  return (
    <div
      className="wrapper"
      style={{ backgroundImage: "url('https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/q_auto/f_auto/hiking_dog_mountain')" }}
    >
      <div className="inner">
        <div className="image-holder">
          <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/q_auto/f_auto/hiking_dog_mountain" alt="" />
        </div>
        <form action="">
          <h3>Registration Form</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
            />
            <i className="zmdi zmdi-account"></i>
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
            />
            <i className="zmdi zmdi-email"></i>
          </div>
          <div className="form-wrapper">
            <select name="" id="" className="form-control">
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="femal">Female</option>
              <option value="other">Other</option>
            </select>
            <i
              className="zmdi zmdi-caret-down"
              style={{ fontSize: "17px" }}
            ></i>
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          <button>
            Register
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default signUpForm;
