import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import contactsActions from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';

import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const { name, number } = data;
    // e.preventDefault();

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
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        <input
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 15,
          })}
          className={s.name}
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && (
          <p className={s.errorText}>
            Name must be at least 3 characters and maximum 15 characters
          </p>
        )}
      </label>
      <label className={s.label}>
        <InputMask
          ref={register}
          className={s.number}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          mask="+3 8(099) 999-99-99"
        />
        {/* <input
          ref={register({
            required: true,
            pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
          })}
          className={s.number}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        {errors.number && (
          <p className={s.errorText}>
            It must be a number between 10 and 14 characters
          </p>
        )} */}
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
