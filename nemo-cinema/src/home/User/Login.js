import { Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../../images/bg.jpg";
import { LoginAction } from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { StyledButton } from "../../styles/Styles";
import { NEMO, USER_LOGIN } from "../../configs/config";

export default function Login() {
  document.title = `Log In Now - ${NEMO}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(LoginAction(values, navigate));
    },
  });

  if (localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }
  return (
    <S.Box>
      <S.Form onFinish={formik.handleSubmit} labelCol={{ span: 6 }}>
        <S.Center>
          <Link to="/">
            {" "}
            <S.Logo className="logo">nemo cinema</S.Logo>
          </Link>
        </S.Center>
        <AntDesignFormItem
          label="Username"
          name="taiKhoan"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Password"
          name="matKhau"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password onChange={formik.handleChange} />
        </AntDesignFormItem>
        <S.Center>
          <S.Text>
            Don't have an account yet? <Link to="/signup">Sign Up Now</Link>
          </S.Text>
        </S.Center>
        <StyledButton type="submit">Log In</StyledButton>
      </S.Form>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
       background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${bg});
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 1s ease-in-out;
  `,

  Form: styled(AntDesignForm)`
    margin: 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-light);
    border-radius: 1rem;
    background-color: var(--rgba-blue-magenta);
    width: 600px;
  `,

  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Khand", sans-serif;
    text-transform: uppercase;
    color: var(--color-red);
    font-weight: 700;
  `,

  Center: styled.div`
    display: flex;
    justify-content: center;
  `,
  Text: styled.span`
    padding: 1rem 0;
  `,
};