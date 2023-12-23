import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { LoginUrl } from "../Utils/ApiRoutes";

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    border-radius: 1rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      border: none;
      padding: 1rem 2rem;
      color: white;
      cursor: pointer;
      font-weight: bold;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

const Login = () => {
  const [values, setValues] = useState({
    userName: "",
    passWord: "",
  });

  const toastShows = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chat");
    }
  }, []);

  const handleValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { userName, passWord } = values;

    if (userName === "") {
      toast.error("UserName Should not be Empty", toastShows);
      return false;
    } else if (passWord === "") {
      toast.error("Password Should not be Empty", toastShows);
      return false;
    }

    return true;
  };

  const handleForm = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(LoginUrl, values);

      if (data.status === false) {
        toast.error(data.message, toastShows);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleForm(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Login</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="userName"
            onChange={(e) => handleValueChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="PassWord"
            name="passWord"
            onChange={(e) => handleValueChange(e)}
            min="8"
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/signup">Register</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;
