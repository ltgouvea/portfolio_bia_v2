import React, { Component } from 'react';
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
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleName} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmail} />
        </label>
        <label>
          Mensagem:
          <textarea value={this.state.mensagem} onChange={this.handleMensagem} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ContactFormDois;
