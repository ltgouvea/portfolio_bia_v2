import React, { Component } from 'react';
import './ContactForm.css';
import PropTypes from 'prop-types';

class ContactFormDois extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mensagem: '',
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleMensagem = this.handleMensagem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleMensagem(event) {
    this.setState({ mensagem: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    window.location.href = 'mailto:beatriz.montanhaur@gmail.com?subject=Contato Via Portfolio&body=' + this.state.mensagem;
    event.preventDefault();
  }

  render() {
    return (
      <div className='form-wrapper'>
        <hr />
        <h1 id="contato">Contato</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="col">
            <label>
              Nome
            </label>
            <input type="text" value={this.state.name} onChange={this.handleName} />
            <label>
              Email
            </label>
            <input type="text" value={this.state.email} onChange={this.handleEmail} />
            <textarea value={this.state.mensagem} onChange={this.handleMensagem} placeholder="Digite uma mensagem..."/>
            <button type="submit" value="Submit">Enviar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactFormDois;
