import shortid from 'shortid';

import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add', (name, number) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));

const deletContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

const contactsActions = { addContact, deletContact, changeFilter };

export default contactsActions;
