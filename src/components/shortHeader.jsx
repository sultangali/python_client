import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

const ShortHeader = () => {
  return  (
        <>
          <Navbar expand="lg" variant="dark" fixed="top">
            <Container fluid>

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} href="/" 
                  className=" btn-go-back">
                    Артқа қайту &nbsp;<ArrowRight size={'28px'}/>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      );

}

export default ShortHeader