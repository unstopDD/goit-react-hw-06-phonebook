import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';

import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (checkName(name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(contactsActions.addContact(name, number));
    resetInputForm();
  };

  const resetInputForm = () => {
    setName('');
    setNumber('');
  };

  const checkName = name => {
    return contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim(),
    );
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        <input
          className={s.name}
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={s.label}>
        <input
          className={s.number}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
  contacts: PropTypes.object,
};
