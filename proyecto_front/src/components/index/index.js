import React from "react";
export default class inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <><h1 style={{ marginTop: 400 }}>
        <br />
        GozaFinanzas - Welcome
      </h1><h2>Es un sitio web desarrollado con el proposito de ayudarte a gestionar tus finanzas personales una forma simple pero efectiva, buscando el mayor bienestar posible a la economía del ciudadano común.</h2>
      <h1><a href="../login">Inicia Sesión</a></h1>
      </>
    );
  }
}
