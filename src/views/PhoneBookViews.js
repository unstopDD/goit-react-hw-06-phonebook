import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from '../redux/contacts/contacts-selectors';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import Section from '../components/Section';

export default function PhoneBookViews() {
  const [filter, setFilter] = useState('');
  const contacts = useSelector(getContacts);

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <Section title="Phonebook">
      <ContactForm />

      {contacts.length > 1 && (
        <Filter value={filter} onChangeFilter={handleChangeFilter} />
      )}
      <h2>Contacts</h2>
      <ContactList />
    </Section>
  );
}
