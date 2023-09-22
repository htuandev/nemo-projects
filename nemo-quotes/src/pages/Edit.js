import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API, WEBSITE_NAME } from "../utils/config";
import { QuoteModel } from "../models/QuoteModel";
import axios from "axios";
import styled from "styled-components";
import { Breakpoints } from "../styles/Breakpoints";
import { useFormik } from "formik";
import { updateQuotesAction } from "../redux/action";
import { Heading } from "../components/Heading";
import { AntDesignForm, AntDesignFormItem } from "../styles/AntDesign";
import { Input } from "antd";
import Swal from "sweetalert2";
import { StyledButton } from "../styles/StyledButton";

export default function Edit() {
  document.title = `Edit Quote - ${WEBSITE_NAME}`;

  const isAdmin = useSelector((state) => state.QuotesReducer.isAdmin);

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [quote, setQuote] = useState(new QuoteModel());

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getQuote() {
      try {
        const result = await axios.get(`${API}/${params.id}`);
        setQuote(result.data);
      } catch (error) {
        console.log(error);
        navigate("/admin");
      }
    }
    getQuote();
  }, [params.id, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      author: quote.author,
      title: quote.title,
      quote: quote.quote,
      _id: quote._id,
    },
    onSubmit: (values) => {
      if (!isAdmin) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Warning",
          text: "You do not have permission to edit this quote",
        });

        return navigate("/admin");
      }

      if (values.quote.startsWith(`"`)) {
        const obj = new QuoteModel();

        obj.quote = values.quote.substring(1, values.quote.length - 1);
        obj.author = values.author;
        obj.title = values.title;
        obj._id = values._id;

        return dispatch(updateQuotesAction(obj, obj._id));
      }

      return dispatch(updateQuotesAction(values, values._id, navigate));
    },
  });

  return (
    <S.Edit>
      <Heading>Edit Quotes</Heading>
      <AntDesignForm
        onFinish={formik.handleSubmit}
        labelCol={{ span: 4 }}
        fields={[
          {
            name: ["quote"],
            value: formik.values.quote,
          },
          {
            name: ["author"],
            value: formik.values.author,
          },
          {
            name: ["title"],
            value: formik.values.title,
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
        <AntDesignFormItem>
          <S.Center>
            <StyledButton type="submit">update</StyledButton>
          </S.Center>
        </AntDesignFormItem>
      </AntDesignForm>
    </S.Edit>
  );
}

const S = {
  Edit: styled.div`
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
