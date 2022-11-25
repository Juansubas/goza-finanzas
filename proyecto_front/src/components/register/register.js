import React from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './register.css';
import app from '../app.json';
import Loading from "../loading/loading";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

const { APIHOST } = app;

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usuario: '',
      pass: '',
      
    };
    
  }
  crearUsuario(){
    this.setState({ loading: true });
    axios.post(`${APIHOST}/usuarios/register`, {
      usuario: this.state.usuario,
      pass: this.state.pass,
    }
    )
    .then((response) => {
      if(!response.data.exito){
          alert(response.data.msg);
      }
      else{
        alert(response.data.msg);
        window.location.href = "../login";
      }
      this.setState({ loading: false });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    })
  }
  state = {};
  render() {
    return (
      <Container id="login-container">
        <Loading show={this.state.loading} />
        <Row>
          <Col>
            <Row>
              <h2>Creación de Usuario</h2>
            </Row>
            <Row>
              <Col
                sm="12"
                xs="12"
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}
                xl={{ span: 4, offset: 4 }}
              >
                <Form>
                  <Form.Group >
                    <Form.Label >Usuario</Form.Label>
                    <Form.Control
                        onChange={(e) =>
                        this.setState({ usuario: e.target.value})
                      }
                    />
                  </Form.Group>
                  
                  <Form.Group >
                    <Form.Label >Contraseña</Form.Label>
                    <Form.Control 
                      type="password"
                      onChange={(e) =>
                        this.setState({ pass: e.target.value})
                      }
                    />
                  </Form.Group>
                  <Button 
                  variant="primary" 
                  onClick={ () => {
                    this.crearUsuario();
                  }}
                  >
                    Crear Usuario
                  </Button>
                  <a href="../login">Inicia Sesión</a>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    );
  }
}
