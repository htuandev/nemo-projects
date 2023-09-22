import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../styles/Breakpoints";
import { AUTHOR, AUTHOR_URL } from "../utils/config";

export default function Footer({ display }) {
  return (
    <Styled.Footer display={display}>
      <Styled.Text>
        Built and designed by{" "}
        <Styled.Link href={AUTHOR_URL} target="_blank">
          {AUTHOR}
        </Styled.Link>
      </Styled.Text>
    </Styled.Footer>
  );
}

const Styled = {
  Footer: styled.div`
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${Breakpoints.sm} {
      display: ${(props) => props.display};
    }
  `,

  Text: styled.span`
    font-size: 1.2rem;
    text-align: center;

    ${Breakpoints.sm} {
      font-size: 1rem;
    }
  `,

  Link: styled.a`
    color: var(--light-red);

    :hover {
      color: var(--light-red);
    }
  `,
};
