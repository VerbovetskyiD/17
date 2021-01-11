class List {
    storage = this.getList();

    constructor(listName) {
        this.name = listName;
    }

    add(text) {
        const data = {
            id: Date.now(),
            text,
        };
        this.storage.push(data);
        this.toLocalStorage();
    }

    delete(id) {
        this.storage.splice(this.getIndex(id), 1);
        this.toLocalStorage();
    }

    edit(id, newText) {
        this.storage[this.getIndex(id)].text = newText;
        this.toLocalStorage();
    }

    getIndex(id) {
        return this.storage.findIndex(data => data.id === id);
    }

    getList() {
        return JSON.parse(localStorage.getItem('data')) || [];
    }

    toLocalStorage() {
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
        this.toLocalStorage();
    }

    complete(taskId) {
        this.storage[this.getIndex(taskId)].status = true;
        this.toLocalStorage();
    }

    stat(i = 0, j = 0) {
        this.storage.forEach(note => (note.status ? ++i : ++j));
        return `completed - ${i}, uncompleted - ${j}`;
    }

    getList() {
        return JSON.parse(localStorage.getItem('task')) || [];
    }

    toLocalStorage() {
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
        this.toLocalStorage();
    }

    edit(id, newContactName, newContactSurname, newContactNumber) {
        this.storage[
            this.getIndex(id)
            ].contact = `${newContactName} ${newContactSurname}`;
        this.storage[this.getIndex(id)].number = newContactNumber;
        this.toLocalStorage();
    }

    search(searchValue) {
        return this.storage.find(
            contact =>
                contact.contact.includes(searchValue) ||
                contact.number.toString().includes(searchValue)
        );
    }

    getList() {
        return JSON.parse(localStorage.getItem('contact')) || [];
    }

    toLocalStorage() {
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