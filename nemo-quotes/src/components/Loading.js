import React from "react";
import styled from "styled-components";
import useViewport from "../hooks/useViewport";

export default function Loading({isAdmin = true}) {
  const { isMobile } = useViewport();

  const rootEl = document.getElementById("root");

  if (isAdmin === true) {
    if (isMobile) {
      rootEl.style.placeContent = "center";
    }

    if (!isMobile) {
      rootEl.style.placeContent = "";
    }
  }

  return (
    <Styled.Loading>
      <Styled.SVG viewBox="25 25 50 50">
        <Styled.Circle cx="50" cy="50" r="20" />
      </Styled.SVG>
    </Styled.Loading>
  );
}

const Styled = {
  Loading: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  SVG: styled.svg`
    width: 8rem;
    transform-origin: center;
    animation: spin 1.5s ease-in-out infinite;
  `,

  Circle: styled.circle`
    fill: none;
    stroke: #ce9ad9;
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  `,
};
