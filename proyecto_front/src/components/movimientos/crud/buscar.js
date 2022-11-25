import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { request  } from '../../helper/helper';
//import './movimientos.css';
import DataGrid from '../../grid/grid';
import ConfirmationPrompts from '../../prompts/confirmation';
import Loading from '../../loading/loading'
import MessagePrompt from '../../prompts/message';


const columns = [
  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "usuario",
    text: "Usuario",
    hidden: true,
  },
  {
    dataField: "nombre",
    text: "Nombre",
  },
  {
    dataField: "fecha",
    text: "Fecha",
  },
  {
    dataField: "monto",
    text: "Monto",
  },
  {
    dataField: "categoria",
    text: " Categoria",
  },
  {
    dataField: "descripcion",
    text: " Descripcion",
  },
];  

export default class MovimientosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          idMovimiento: null,
          confirmation: {
            title: 'Eliminar el movimiento',
            text: '¿Deseas eliminar el movimiento?',
            show: false,
          },
          message: {
            text: '',
            show: false,
          },
        };

        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
      }

    onClickEditButton(row) {
      this.props.setIdMovimiento(row._id);

      this.props.changeTab('editar');
    }

    onClickDeleteButton(row) {
      this.setState({
        idMovimiento: row._id,
        confirmation: {
          ...this.state.confirmation,
          show: true,
        },
      });
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
        this.eliminarMovimiento()
      );
    }

    eliminarMovimiento() {
      this.setState({ loading: true });
      request
        .delete(`/movimientos/${this.state.idMovimiento}`)
        .then((response) => {
          this.setState({
              loading: false,
              message: {
                text: response.data.msg,
                show: true,
              },
          });
          if (response.data.exito) window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false});
        });
    }

    reloadPage() {
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    render() { 

        return ( 
            <Container id="movimientos-buscar-container">

                <ConfirmationPrompts
                  show={this.state.confirmation.show}
                  title={this.state.confirmation.title}
                  text={this.state.confirmation.text}
                  onCancel={this.onCancel}
                  onConfirm={this.onConfirm}
                />

                <MessagePrompt
                  text={this.state.message.text}
                  show={this.state.message.show}
                  duration={2500}
                  onExited={this.onExtedMessage}
                />

                <Loading show={this.state.Loading} />

                <Row>
                    <h1>Buscar Movimientos</h1>
                </Row>
                <Row>
                    <DataGrid 
                      url="/movimientos" 
                      columns={ columns } 
                      showEditButton={true} 
                      showDeleteButton={true} 
                      onClickEditButton={this.onClickEditButton}
                      onClickDeleteButton={this.onClickDeleteButton}
                    />
                </Row>
            </Container>
        );
    }
}


