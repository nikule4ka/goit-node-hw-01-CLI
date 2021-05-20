const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then(console.table)
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then((contacts) =>
      contacts.find((contact) => String(contact.id) === String(contactId))
    )
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then((contacts) => {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
        .then(console.log("The contact has been deleted"))
        .catch((error) => console.log(error.message));
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then((contacts) => {
      const newContact = { id: uuidv4(), name, email, phone };
      const addContact = [...contacts, newContact];
      fs.writeFile(contactsPath, JSON.stringify(addContact, null, 2)).then(
        console.log("Contact has been added")
      );
    })
    .catch((error) => console.log(error.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
