import React from "react";
import { FaPager } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useViewport from "../hooks/useViewport";
import { Breakpoints } from "../styles/Breakpoints";
import { WEBSITE_NAME } from "../utils/config";

export default function NavbarHome() {
  const { isMobile } = useViewport();

  return (
    <>
      {isMobile ? (
        <MobileNavbar>
          <Navbar.Link to="/">
            <Navbar.Logo>{WEBSITE_NAME}</Navbar.Logo>
          </Navbar.Link>
          <Navbar.Link to="/admin">
            <FaPager />
          </Navbar.Link>
        </MobileNavbar>
      ) : (
        <Navbar.Wrapper>
          <Navbar.Link to="/">
            <Navbar.Logo>{WEBSITE_NAME}</Navbar.Logo>
          </Navbar.Link>
          <Navbar.Link to="/admin">Dashboard</Navbar.Link>
        </Navbar.Wrapper>
      )}
    </>
  );
}

const Navbar = {
  Wrapper: styled.nav`
    padding: 0.5rem 3rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1440px;
    width: 90%;
    margin: 0 auto;

    ${Breakpoints.lg} {
      padding: 0.5rem 2rem 0;
    }
  `,

  Logo: styled.h1`
    padding: 0.5rem 1rem;
    font-family: "Khand", sans-serif;
    font-weight: 600;
    font-size: 2.5rem;
    color: var(--light-red);

    ${Breakpoints.lg} {
      font-size: 1.8rem;
    }
  `,

  Link: styled(Link)`
    font-size: 1.8rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    margin-right: 1.5rem;
    position: relative;
    color: var(--light-silver);
    font-family: "Khand", sans-serif;

    :hover,
    :active {
      color: var(--light-red);
    }

    & svg {
      color: var(--light-silver);
    }

    ${Breakpoints.lg} {
      font-size: 1.5rem;
    }
  `,
};

const MobileNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
`;
