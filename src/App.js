import React, { Component } from 'react';

import shortid from 'shortid';
import s from './App.module.css';
import Form from './Components/Form';
import ContactsList from './Components/ContactsList';
import Filter from './Components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // ф-ция для получения данных введенных в форму
  formOnSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    // выводим предупреждение если хотя бы одно из полей не заполнено
    if (!name || !number) {
      alert('Enter name and phone number!');
      return;
    }

    // добавляем каждый введенный контакт в массив (кроме тех которые там уже есть)
    contacts.find(
      ({ name, number }) => name === contact.name || number === contact.number,
    )
      ? alert('This subscriber is already in contacts')
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  // записываем значение ипута фильтра в стейт
  filterHandler = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // ф-ция фильтра по имени
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  // удаление контакта
  deleteHandler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    // отфильтрованные контакты
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={s.App}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formOnSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.filterHandler} />
        <ContactsList
          contacts={filteredContacts}
          onDelete={this.deleteHandler}
        />
      </div>
    );
  }
}

export default App;
