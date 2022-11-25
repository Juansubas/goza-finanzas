import React from 'react'
import { Container, Nav, Row } from 'react-bootstrap';
import MovimientosBuscar from './crud/buscar';
import MovimientosCrear from './crud/crear';
import MovimientosEditar from './crud/editar';
import './movimientos.css'

export default class Movimientos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentTab: "buscar",
          _id: null,
        };
        this.changeTab = this.changeTab.bind(this);
        this.setIdMovimiento = this.setIdMovimiento.bind(this);
        this.getIdMovimiento = this.getIdMovimiento.bind(this);
    }

    changeTab(tab) {
      this.setState( {currentTab: tab });
    }

    setIdMovimiento(id) {
      this.setState({ _id: id });
    }

    getIdMovimiento() {
      return this.state._id;
    }

    render() {
        return (
          <Container id="movimientos-container">
            <Row>
              <Nav 
                fill 
                variant="tabs" 
                defaultActiveKey="/buscar"
                onSelect={(eventKey) => this.setState( {currentTab: eventKey })}
              >
                <Nav.Item>
                  <Nav.Link eventKey="buscar">Buscar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="crear">Crear</Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
            <Row>
              {this.state.currentTab === 'buscar' ? (
                <MovimientosBuscar 
                  changeTab={this.changeTab}
                  setIdMovimiento={this.setIdMovimiento} 
                /> 
                ) : this.state.currentTab === "crear" ? (
                <MovimientosCrear changeTab={this.changeTab} />
              ) : (
                <MovimientosEditar
                  changeTab={this.changeTab}
                  getIdMovimiento={this.getIdMovimiento} 
                />
              )}
            </Row>
          </Container>
        );
    }
}