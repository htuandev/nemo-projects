import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WEBSITE_NAME } from "../utils/config";
import { QuoteModel } from "../models/QuoteModel";
import styled from "styled-components";
import { Breakpoints } from "../styles/Breakpoints";
import { useFormik } from "formik";
import { createQuotesAction } from "../redux/action";
import { Heading } from "../components/Heading";
import { AntDesignForm, AntDesignFormItem } from "../styles/AntDesign";
import { Input } from "antd";
import Swal from "sweetalert2";
import { StyledButton } from "../styles/StyledButton";

export default function Add() {
  document.title = `Add Quote - ${WEBSITE_NAME}`;

  const isAdmin = useSelector((state) => state.QuotesReducer.isAdmin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      author: "Sưu Tầm",
      title: "",
      quote: "",
    },
    onSubmit: (values) => {
      if (!isAdmin) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Warning",
          text: "You do not have permission to add quotes",
        });

        return navigate("/admin");
      }

      if (values.quote.startsWith(`"`)) {
        const obj = new QuoteModel();

        obj.quote = values.quote.substring(1, values.quote.length - 1);
        obj.author = values.author;
        obj.title = values.title;
        delete obj._id;

        return dispatch(createQuotesAction(obj));
      }

      return dispatch(createQuotesAction(values));
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.Add>
      <Heading>Add Quotes</Heading>
      <AntDesignForm
        onFinish={formik.handleSubmit}
        labelCol={{ span: 3 }}
        fields={[
          {
            name: ["author"],
            value: formik.values.author,
          },
        ]}
      >
        <AntDesignFormItem
          label="Quote"
          name="quote"
          rules={[{ required: true, message: "Please input something" }]}
        >
          <Input.TextArea onChange={formik.handleChange} allowClear rows={8} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input something" }]}
        >
          <Input onChange={formik.handleChange} allowClear />
        </AntDesignFormItem>
        <AntDesignFormItem label="Title" name="title">
          <Input onChange={formik.handleChange} allowClear />
        </AntDesignFormItem>
        <AntDesignFormItem label="">
          <S.Center>
            <StyledButton type="submit">Add Quote</StyledButton>
          </S.Center>
        </AntDesignFormItem>
      </AntDesignForm>
    </S.Add>
  );
}

const S = {
  Add: styled.div`
    margin: 1rem 3rem 0;
    animation: fade-in 1s ease-in-out;

    ${Breakpoints.md} {
      margin: 1rem 2rem 0;
    }

    ${Breakpoints.sm} {
      margin: 1rem 1rem 4rem;
    }
  `,

  Center: styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
  `,
};
