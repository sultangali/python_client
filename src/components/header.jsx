import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { selectIsAuth, logout, fetchAuthMe } from "../redux/slices/user.js";


const Header = () => {

  const isAuth =useSelector(selectIsAuth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  },[])

  const userData = useSelector((state) => state.user.data);

  console.log(userData && userData);

  const onClickLogout = () => {
      dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Link className="link" to={"/"}>
            <Navbar.Brand className="main-brand" style={{ color: "white" }}>
            Python Academy
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://bilimland.kz/kk/news-articles">Жаңалықтар</Nav.Link>

              <Nav.Link href="/contact">Байланыс</Nav.Link>
            </Nav>
            <Nav>
              {isAuth ? (
                <>
                {userData && userData.status ?
                 (<Nav.Link href="/student-profile"> Қош келдіңіз, &nbsp;
                  {userData && userData.lastname && userData.lastname} &nbsp;
                  {userData && userData.firstname && userData.firstname}
                  </Nav.Link> ): '' 
                }
                  {
                  userData && userData.role ?
                  <Nav.Link href="/employee-profile"> Қош келдіңіз, &nbsp;
                  {userData.lastname && userData.lastname} &nbsp;
                  {userData.firstname && userData.firstname}
                  </Nav.Link> : ''}
 
                  <Nav.Link
                    eventKey={2}
                    onClick={() => onClickLogout()}
                    className="btn btn-primary signup shadow"
                    style={{borderRadius: '4px', border: '1px solid white'}}
                  >
                    Шығу
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/for-student"
                  className="stu-nav-link"
                  >Oқушы</Nav.Link>
                  <Nav.Link
                    className="emp-nav-link"
                    href="/for-employee"
                  >
                    Қызметкер
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
