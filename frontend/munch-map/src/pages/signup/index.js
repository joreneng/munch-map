import { useState } from "react";
import checkmark from "../../assets/checkmark.svg";
import "./index.css";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] h-[100vh] gap-2 justify-center items-center">
      <div className="text-xl font-light italic">Create Account</div>
      <form onSubmit={handleSubmit} className="onboard__form-container w-4/5">
        <div className="onboard__inputs">
          <div className="onboard__input-field">
            <label htmlFor="text">First Name</label>
            <input
              required
              type="text"
              name="firstName"
              value={formValues.firstName}
              placeholder="Enter your email"
              onChange={handleChange}
              className="onboard__input bg-gray-100 "
            />
          </div>
          <div className="onboard__input-field">
            <label htmlFor="text">Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              value={formValues.lastName}
              placeholder="Enter your email"
              onChange={handleChange}
              className="onboard__input bg-gray-100 "
            />
          </div>

          <div className="onboard__input-field">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="onboard__input bg-gray-100 "
            />
          </div>

          <div className="onboard__input-field">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="onboard__input bg-gray-100 "
            />
          </div>
        </div>

        <button className="onboard__submit italic bg-gray-100 " type="submit">
          Sign Up
        </button>

        <div className="onboard__form-footer">
          <div className="onboard__form-footer-text">
            Already have an account?
          </div>
          <a className="login__forgot-password" href="/login">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
