import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   
    <Nav style={{backgroundColor:'#16082A',color:'#D8B3FE',position:'fixed',width:'95%',border:'0.5px solid grey',borderLeft:'none',borderRight:'none',zIndex:999999999}}>
      <Logo href="#"><img src={logo} style={{width:'2em'}}></img></Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="#features">Features</MenuLink>
        <MenuLink href="#popular-courses">Popular Courses</MenuLink>
        <MenuLink href="#instructors">Instructors</MenuLink>
        <MenuLink href="#faq">FAQ</MenuLink>
        <MenuLink href="#community">Community</MenuLink>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #2c3e50;
  padding: 1rem;
`;

const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  
  &:hover {
    color: #ecf0f1;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  
  span {
    height: 2px;
    width: 25px;
    background: #fff;
    margin-bottom: 4px;
    border-radius: 5px;
    margin-right: 2em;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

const MenuLink = styled.a`

  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #D8B3FE;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  
  &:hover {
    color:rgb(237, 243, 247);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;