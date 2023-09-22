import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import useViewport from "../hooks/useViewport";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WEBSITE_NAME } from "../utils/config";
export default function Login() {
  document.title = `Login - ${WEBSITE_NAME}`;

  const [input, setInput] = useState("");
  const { isMobile } = useViewport();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rootEl = document.getElementById("root");

  if (isMobile) {
    rootEl.style.placeContent = "center";
  }

  if (!isMobile) {
    rootEl.style.placeContent = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === process.env.REACT_APP_ADMIN) {
      dispatch({ type: "SET_ADMIN" });
      alert("Welcome Back");
      return navigate("/admin");
    }

    return alert("Invalid Code");
  };

  return (
    <S.Box>
      <S.Form onSubmitCapture={handleSubmit}>
        <S.Input
          placeholder="Enter admin code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </S.Form>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  Form: styled(Form)`
    width: 300px;
    margin: 1rem;
  `,
  Input: styled(Input)`
    width: 100%;
  `,
};
