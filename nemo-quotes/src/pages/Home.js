import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { WEBSITE_NAME } from "../utils/config";
import { getQuotesAction } from "../redux/action";
import Loading from "../components/Loading";

export default function Home() {
  document.title = WEBSITE_NAME;

  const isLoading = useSelector((state) => state.QuotesReducer.isLoading);
  const quote = useSelector((state) => state.QuotesReducer.quote);
  const dispatch = useDispatch();

  const isAdmin = false;

  const getNewQuote = () => {
    dispatch({ type: "SET_QUOTE" });
  };

  useEffect(() => {
    dispatch(getQuotesAction(isAdmin));
  }, [dispatch, isAdmin]);

  useEffect(() => {
    const set = setInterval(getNewQuote, 15000);
    return () => clearInterval(set);
  });

  return (
    <>
      {isLoading ? (
        <Loading isAdmin={isAdmin} />
      ) : (
        <>
          <S.Box key={quote._id}>
            <S.ProgressBar from="left" top />
            <S.Center>
              <S.Content>
                <S.QuoteBox>
                  <S.QuoteContent>
                    "
                    {quote.quote.split("\n").map((text, index) => {
                      if (index === quote.quote.split("\n").length - 1) {
                        return <S.Quote key={index}>{text}</S.Quote>;
                      }
                      return (
                        <S.Quote key={index}>
                          {text} <br /> <br />
                        </S.Quote>
                      );
                    })}
                    "
                  </S.QuoteContent>
                </S.QuoteBox>
                <S.Info>
                  <S.Author>{quote.author}</S.Author>
                  {quote.title !== "" ? (
                    <S.Title>{quote.title}</S.Title>
                  ) : (
                    <></>
                  )}
                </S.Info>
              </S.Content>
            </S.Center>
            <S.ProgressBar from="right" bottom />
          </S.Box>
        </>
      )}
    </>
  );
}

const S = {
  Box: styled.div`
    width: 768px;
    padding: 1rem 2rem;
    margin: 1rem auto;
    border-radius: 1rem;
    box-shadow: var(--shadow-light);

    @media only screen and (max-width: 800px) {
      padding: 1rem 1.5rem;
      margin: 1.25rem;
      width: calc(100vw - 2rem);
    }
  `,
  ProgressBar: styled.div`
    height: 4px;
    background: #ce9ad9;
    width: 100%;
    transform-origin: ${(props) => props.from};
    margin-top: ${(props) => (props.top ? "0" : "1rem")};
    margin-bottom: ${(props) => (props.bottom ? "0" : "1rem")};
    animation: grow 15s linear;
  `,

  Content: styled.div`
    min-height: 40vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    animation: zoom-in 2s ease-in-out;
  `,

  Center: styled.div`
    display: flex;
    justify-content: center;
  `,

  QuoteBox: styled.div`
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `,

  QuoteContent: styled.span``,

  Quote: styled.span``,

  Info: styled.div`
    padding: 1rem 0;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  `,

  Author: styled.span`
    font-size: 1.5rem;
    font-style: italic;
    font-family: "Patrick Hand", cursive;
    text-transform: capitalize;

    ::before {
      content: "-";
      margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
      font-style: normal;
    }
  `,

  Title: styled.span`
    font-size: 1.5rem;
    text-transform: capitalize;
    font-style: italic;
    font-family: "Patrick Hand", cursive;

    ::before {
      content: "|";
      margin: 0 1rem;
      font-style: normal;
      font-family: "Khand", sans-serif;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
      font-style: normal;

      ::before {
        content: "-";
        margin: 0 0.5rem 0 0;
        font-family: "Patrick Hand", cursive;
      }
    }
  `,
};
