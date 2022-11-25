import React from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import { isUndefined, isNull } from 'util';

export default class MovimientosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
					rediret: false,
					message:{
						text: "",
						show: false
					},
					loading: false,
					movimiento: {
						nombre: "",
						fecha:"",
						monto:"",
						categoria:"",
						descripcion:"",
					}
				};
				this.onExitedMessage = this.onExitedMessage.bind(this);
    }

		setValue(index, value) {
			this.setState({
				movimiento: {
					usuario: localStorage.usuario,
					...this.state.movimiento,
					[index]: value,
				},
			})
		}

		guardarMovimientos() {
			this.setState({ loading: true });
			request
				.post("/movimientos", this.state.movimiento)
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
					this.setState({ loading: false});
				})
				.catch((err) => {
					console.error(err);
					this.setState( {loading: true });
				})
		}

		onExitedMessage() {
			if (this.state.rediret) this.props.changeTab('buscar');
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

						<Loading show={this.state.loading} />

            <Row>
              <h1>Crear Movimientos</h1>
            </Row>
            <Row>
              <Form>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
										onChange={(e) => this.setValue('nombre', e.target.value)}
									/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control 
										onChange={(e) => this.setValue('fecha', e.target.value)}
									/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control 
										onChange={(e) => this.setValue('monto', e.target.value)}
									/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control 
										onChange={(e) => this.setValue('categoria', e.target.value)}
									/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control 
										onChange={(e) => this.setValue('descripcion', e.target.value)}
									/>
                </Form.Group>

                <Button 
								variant="primary" 
								onClick={() => console.log(this.guardarMovimientos())}>
                  Guardar Movimiento
                </Button>
              </Form>
            </Row>
          </Container>
        );
    }
}