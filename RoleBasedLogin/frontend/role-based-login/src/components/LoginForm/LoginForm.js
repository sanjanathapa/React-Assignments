import React, { useReducer } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useLoginMutation } from "../../api/login";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils/lodash";
import { toast } from "react-toastify";
import { handleError } from "../../utils/error";
import { loginStore } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => {
      console.log(prevState, newState, "prevState  and newState-----");
      return { ...prevState, ...newState };
    },
    {
      username: "",
      password: "",
      // showPassword: false,  //for future
      // rememberMe: false,
    }
  );

  const { username, password } = localState;

  const [login, { isFetching }] = useLoginMutation();
  console.log("isFetching---------", isFetching);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  console.log(username, "username");
  console.log(password, "password");

  const handleKeyPress = (e) => {
    console.log("e-------------", e.key);
    const key = e.key;
    if (username && password && key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: username,
      password,
    };

    login(payload)
      .unwrap()
      .then((res) => {
        const token = get(res, "token", "");
        const user = get(res, "user", "");
        const { role } = user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role);

        dispatch(loginStore({ token, user }));
        toast.success("Logged in Successfully");
        
        if ( role === "admin" ) { 
          navigate("/app/dashboard")
        }
        if ( role === "user" ) {
          navigate( "/app/userform" );
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onKeyPress={handleKeyPress}
            onChange={onHandleChange}
            required
          ></input>
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onKeyPress={handleKeyPress}
            onChange={onHandleChange}
            required
          ></input>
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" onClick={handleLogin}>
          Login
        </button>

        <div className="register-link">
          <p>
            Don't have an account?<a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
