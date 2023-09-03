import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LogoImg from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";
const DLink = ({ slug, end, title, children }) => {
  return (
    <Nav.Link as="span">
      <NavLink className={styles.navLink} to={slug} end={!!end}>
        {title} {children}
      </NavLink>
    </Nav.Link>
  );
};
const Header = () => {
  const {isAuth,logout} = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={"span"}>
            <DLink slug={"/"}>
              <img src={LogoImg} alt="Jamal Logo" />
            </DLink>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <DLink title={"الرئيسية"} slug={"/"} end />
            <DLink title={"التدوينات"} slug={"/blog"} end />
            {isAuth ? (
              <>
            <DLink title={"مقال جديد"} slug={"/blog/new"} end />
            <Button onClick={logout}>Logout</Button>
              </>
            ):null}
            {!isAuth ? (
   <NavDropdown title="الحساب " id="basic-nav-dropdown">
   <NavDropdown.Item href="#action/3.1">
     {" "}
     <DLink title={"تسجيل الدخول"} slug={"/login"} end />
   </NavDropdown.Item>
   <NavDropdown.Item href="#action/3.2">
     <DLink title={"انشاء حساب"} slug={"/signup"} end />
   </NavDropdown.Item>
 </NavDropdown>
            ):null}
         
            <DLink />
            <DLink />
            <DLink />
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
