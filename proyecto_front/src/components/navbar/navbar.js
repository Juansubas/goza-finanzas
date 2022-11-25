import React from "react";
import {
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import Cookies from 'universal-cookie/es6';


const cookies = new Cookies();

export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Logout() {
    cookies.remove('_s');
    window.location.reload();
    localStorage.removeItem('usuario');
  }

  Validador() {
    if(window.location.pathname == '/login' && localStorage.usuario) this.Logout(); 
    if(cookies.get('_s') && localStorage.usuario) {
      return (
        <DropdownButton id="dropdown-basic-button" title="Usuario">
        <Dropdown.Header id="dropdown-header">
          <Row>
            <FontAwesomeIcon icon={faUserCircle} />
          </Row>
          <Row>
            {localStorage.usuario}
          </Row>
        </Dropdown.Header>
        <Dropdown.Divider/>
        <Dropdown.Item onClick={() => this.Logout()}>
          Cerrar Sesión
        </Dropdown.Item>
        {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
      </DropdownButton>
      )
    }
    return "";
  }

  render() {
    return (
      <Navbar fixed="top" id="navbar" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="../">
            GozaFinanzas<span id="usuario-sub-branm"></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/*<Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>*/}
            </Nav>
            <Nav>
              {
                this.Validador()
              }

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
