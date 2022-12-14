const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    const matchedContact = data.find(({ id }) => id === contactId);

    return matchedContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    const matchedContactIndex = data.findIndex(({ id }) => id === contactId);
    data.splice(matchedContactIndex, 1);

    fs.writeFile(contactsPath, JSON.stringify(data, undefined, 2));

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const data = await getParsedDataFromFile(contactsPath);

  lastDataId = Number(data[data.length - 1].id);

  const contact = {
    id: String(lastDataId + 1),
    name,
    email,
    phone,
  };

  data.push(contact);

  fs.writeFile(contactsPath, JSON.stringify(data, undefined, 2), error => {
    if (error) throw error;
  });

  return contact;
}

async function getParsedDataFromFile(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
