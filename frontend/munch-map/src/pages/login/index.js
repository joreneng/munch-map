import { useState } from "react";
import checkmark from "../../assets/checkmark.svg";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);

  const rememberMe = () => {
    setRemember(!remember);
  };

  
  const handleSubmit = async () => {
      console.log("Submitting login form");
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      console.log("Response is ", response);

      if (!response.ok) {
        throw new Error("Error Logging in");
      } else {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("id", JSON.stringify(data.user_id));
        localStorage.setItem("name", JSON.stringify(data.first_name));
        window.location.href = "/signup";

      }

   
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] h-[100vh] gap-2 justify-center items-center">
      <div className="text-xl font-light italic">Hi, Welcome Back! 👋</div>
      <form onSubmit={handleSubmit} className="onboard__form-container w-4/5">
        <div className="onboard__inputs">
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

        <div className="onboard__checkbox-container">
          <div className="onboard__checkbox">
            {remember ? (
              <div className="checkmark">
                <img
                  src={checkmark}
                  alt="remember checked"
                  onClick={rememberMe}
                  width={10}
                />
              </div>
            ) : (
              <div
                className="onboard__checkbox-click"
                onClick={rememberMe}
              ></div>
            )}
            Remember Me
          </div>
          <div className="forgot-pw">Forgot password</div>
        </div>

        <button className="onboard__submit italic bg-gray-100 " type="submit">
          Sign in
        </button>

        <div className="onboard__form-footer">
          <div className="onboard__form-footer-text">
            Don't have an account?
          </div>
          <a className="login__forgot-password" href="/signup">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
