import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationPrompts from "../../prompts/confirmation";

export default class MovimientosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idMovimiento: this.props.getIdMovimiento(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: 'Modificar el Movimiento',
        text: '¿Deseas modificar el Movimiento?',
        show: false,
      },
      loading: false,
      movimiento: {
        nombre: "",
        fecha: "",
        monto: "",
        categoria: "",
        descripcion: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getMovimiento();
  }

  getMovimiento() {
    this.setState({ loading: true });
    request
      .get(`/movimientos/${this.state.idMovimiento}`)
      .then((response) => {
        console.log(response);
        this.setState({ 
          movimiento: response.data,
          loading: false, 
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      })
  }

  setValue(index, value) {
    this.setState({
      movimiento: {
        ...this.state.movimiento,
        [index]: value,
      },
    });
  }

  guardarMovimiento() {
    this.setState({ loading: true });
    request
      .put(`/movimientos/${this.state.idMovimiento}`, this.state.movimiento)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.guardarMovimiento()
    );
  }

  render() {
    return (
      <Container id="movimientos-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          //Duración expresada en milisegundos
          duration={2500}
          onExited={this.onExitedMessage}
        />
        
        <ConfirmationPrompts 
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Movimientos</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={this.state.movimiento.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={this.state.movimiento.fecha}
                onChange={(e) => this.setValue("fecha", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                value={this.state.movimiento.monto}
                onChange={(e) => this.setValue("monto", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                value={this.state.movimiento.categoria}
                onChange={(e) => this.setValue("categoria", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                value={this.state.movimiento.descripcion}
                onChange={(e) => this.setValue("descripcion", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => 
                this.setState({
                    confirmation: { ...this.state.confirmation, show: true},
                  })
                }
            >
              Guardar Movimiento
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
