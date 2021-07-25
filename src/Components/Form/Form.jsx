import React, { Component } from 'react';

import shortid from 'shortid';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  // ф-ция воода данных в любой инпут по атрибуту name
  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // ф-ция сабмит на форме
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.reset();
  };

  // очистка формы после сабмита
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, nameInputId, handleChange, numberInputId } = this;
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
          <input
            type="text"
            name="name"
            className={s.input}
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
            id={nameInputId}
          />
        </label>
        <label htmlFor={numberInputId} className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            className={s.input}
            placeholder="Enter phone number"
            value={number}
            onChange={handleChange}
            id={numberInputId}
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
