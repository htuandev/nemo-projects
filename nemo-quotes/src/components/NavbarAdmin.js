import React from "react";
import { FaHome, FaPager, FaPlusSquare } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import useViewport from "../hooks/useViewport";
import { Breakpoints } from "../styles/Breakpoints";
import { WEBSITE_NAME } from "../utils/config";

export default function NavbarAdmin() {
  const { isMobile } = useViewport();

  return (
    <>
      {isMobile ? (
        <MobileNavbar.Wrapper>
          <MobileNavbar.List>
            <MobileNavbar.Link to="/">
              <FaHome />
            </MobileNavbar.Link>
            <MobileNavbar.Link to="/admin">
              <FaPager />
            </MobileNavbar.Link>
            <MobileNavbar.Link to="/admin/add">
              <FaPlusSquare />
            </MobileNavbar.Link>
          </MobileNavbar.List>
        </MobileNavbar.Wrapper>
      ) : (
        <Navbar.Wrapper>
          <Link to="/">
            <Navbar.Logo>{WEBSITE_NAME}</Navbar.Logo>
          </Link>
          <Navbar.List>
            <Navbar.Link to="/">Home</Navbar.Link>
            <Navbar.Link to="/admin">Dashboard</Navbar.Link>
            <Navbar.Link to="/admin/add">Add Quotes</Navbar.Link>
          </Navbar.List>
        </Navbar.Wrapper>
      )}
    </>
  );
}

const Navbar = {
  Wrapper: styled.nav`
    padding: 0.5rem 2rem 0;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  List: styled.div`
    display: flex;
  `,
  Link: styled(NavLink)`
    font-size: 1.8rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    margin-right: 1.5rem;
    position: relative;
    color: var(--light-silver);
    font-family: "Khand", sans-serif;

    ::after {
      background-color: var(--light-red);
      content: "";
      height: 4px;
      transform: scaleX(0);
      transition: transform 0.25s ease;
      transform-origin: left;
      left: 0;
      bottom: -1px;
      width: 100%;
      display: block;
      position: absolute;
    }

    :hover::after {
      background-color: var(--light-red);
      transform: scaleX(1);
    }

    :hover,
    :active {
      color: var(--light-red);
    }

    ${Breakpoints.lg} {
      font-size: 1.5rem;
    }
  `,
};

const MobileNavbar = {
  Wrapper: styled.nav`
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 999;
    background: var(--light-red);
  `,
  List: styled.div`
    display: flex;
    padding: 0.5rem 2rem;
    margin: 0;
    justify-content: space-around;
  `,
  Link: styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;

    & svg {
      color: var(--light);
    }
  `,
};
