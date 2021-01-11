class List {
    storage = this._getList();

    constructor(listName) {
        this.name = listName;
    }

    add(text) {
        const data = {
            id: Date.now(),
            text,
        };
        this.storage.push(data);
        this._toLocalStorage();
    }

    delete(id) {
        this.storage.splice(this._getIndex(id), 1);
        this._toLocalStorage();
    }

    edit(id, newText) {
        this.storage[this._getIndex(id)].text = newText;
        this._toLocalStorage();
    }

    _getIndex(id) {
        return this.storage.findIndex(data => data.id === id);
    }

    _getList() {
        return JSON.parse(localStorage.getItem('data')) || [];
    }

    _toLocalStorage() {
        const data = JSON.stringify(this.storage);
        localStorage.setItem('data', data);
    }
}

class ToDoList extends List {
    constructor(name) {
        super(name);
    }

    add(text) {
        const task = {
            id: Date.now(),
            text,
            status: false,
        };
        this.storage.push(task);
        this._toLocalStorage();
    }

    complete(taskId) {
        this.storage[this._getIndex(taskId)].status = true;
        this._toLocalStorage();
    }

    stat(i = 0, j = 0) {
        this.storage.forEach(note => (note.status ? ++i : ++j));
        return `completed - ${i}, uncompleted - ${j}`;
    }

    _getList() {
        return JSON.parse(localStorage.getItem('task')) || [];
    }

    _toLocalStorage() {
        const task = JSON.stringify(this.storage);
        localStorage.setItem('task', task);
    }
}

class ContactList extends List {
    constructor(name) {
        super(name);
    }

    add(contactName, contactSurname, contactNumber) {
        const contact = {
            id: Date.now(),
            contact: `${contactName} ${contactSurname}`,
            number: contactNumber,
        };
        this.storage.push(contact);
        this._toLocalStorage();
    }

    edit(id, newContactName, newContactSurname, newContactNumber) {
        this.storage[
            this._getIndex(id)
            ].contact = `${newContactName} ${newContactSurname}`;
        this.storage[this._getIndex(id)].number = newContactNumber;
        this._toLocalStorage();
    }

    search(searchValue) {
        return this.storage.find(
            contact =>
                contact.contact.includes(searchValue) ||
                contact.number.toString().includes(searchValue)
        );
    }

    _getList() {
        return JSON.parse(localStorage.getItem('contact')) || [];
    }

    _toLocalStorage() {
        const contact = JSON.stringify(this.storage);
        localStorage.setItem('contact', contact);
    }
}

const toDoList = new ToDoList('To do list');
toDoList.add();
toDoList.delete();
toDoList.edit();
toDoList.complete();
toDoList.stat();

const contactList = new ContactList('Contact list');
contactList.add();
contactList.delete();
contactList.edit();
contactList.search();