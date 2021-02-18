class List {
  constructor(listName) {
    this.name = listName;
    this._storage = this._getList();
  }

  add(text) {
    if (this._textCheck(text) && this._unique(['text'], text)) {
      const data = {
        id: Date.now(),
        text,
      };
      this._storage.push(data);
      this._toLocalStorage();
      return data;
    }
    return false;
  }

  edit(id, text, confirm) {
    if (
      confirm === true &&
      this._textCheck(text) &&
      this._unique(['text'], text)
    ) {
      const index = this._findId(id);
      if (index !== -1) {
        this._storage[index].text = text;
        this._toLocalStorage();
        return this._storage[index];
      }
    }
    return false;
  }

  delete(id, confirm) {
    if (confirm === true) {
      const index = this._findId(id);
      if (index !== -1) {
        const [removed] = this._storage.splice(index, 1);
        this._toLocalStorage();
        return removed;
      }
    }
    return false;
  }

  _textCheck(text) {
    return typeof text === 'string' && text !== '' ? true : false;
  }

  _unique(key, value) {
    return !this._storage.some(data => data[key] === value);
  }

  _findId(id) {
    return this._storage.findIndex(data => data.id === id);
  }

  _getList() {
    return JSON.parse(localStorage.getItem(this.name)) || [];
  }

  _toLocalStorage() {
    localStorage.setItem(this.name, JSON.stringify(this._storage));
  }
}

class ToDoList extends List {
  add(text) {
    if (this._textCheck(text) && this._unique(['text'], text)) {
      const task = {
        id: Date.now(),
        text,
        status: false,
      };
      this._storage.push(task);
      this._toLocalStorage();
      return task;
    }
    return false;
  }

  complete(id) {
    const index = this._findId(id);
    if (index !== -1) {
      if (!this._storage[index].status) {
        this._storage[index].status = true;
        this._toLocalStorage();
        return this._storage[index];
      }
    }
    return false;
  }

  stat() {
    return this._storage.reduce(
      (stat, task) => {
        if (task.status) {
          stat.completed.total++;
          stat.completed.tasks.push(task);
        } else {
          stat.uncompleted.total++;
          stat.uncompleted.tasks.push(task);
        }
        return stat;
      },
      {
        completed: {
          total: 0,
          tasks: [],
        },
        uncompleted: {
          total: 0,
          tasks: [],
        },
      },
    );
  }
}

class ContactList extends List {
  add(number, name, surname = null) {
    if (
      this._numCheck(number) &&
      this._unique(['number'], number) &&
      this._textCheck(name)
    ) {
      let contact;
      if (this._textCheck(surname)) {
        contact = {
          name,
          surname,
          number,
        };
      } else {
        contact = {
          name,
          number,
        };
      }
      this._storage.push(contact);
      this._toLocalStorage();
      return contact;
    }
    return false;
  }

  edit(searchData, number, name, surname = null) {
    const contact = this._contactSearch(searchData);
    if (contact !== -1) {
      if (
        this._numCheck(number) &&
        this._unique(['number'], number) &&
        this._textCheck(name)
      ) {
        if (this._textCheck(surname)) {
          this._storage[contact].number = number;
          this._storage[contact].name = name;
          this._storage[contact].surname = surname;
        } else {
          this._storage[contact].number = number;
          this._storage[contact].name = name;
        }
        this._toLocalStorage();
        return this._storage[contact];
      }
    }
    return false;
  }

  delete(searchData, confirm) {
    if (confirm === true) {
      const contact = this._contactSearch(searchData);
      if (contact !== -1) {
        const [removed] = this._storage.splice(contact, 1);
        this._toLocalStorage();
        return removed;
      }
    }
    return false;
  }

  search(searchData = -1) {
    const contact = this._contactSearch(searchData);
    if (contact !== -1) {
      return this._storage[contact];
    }
    return false;
  }

  _numCheck(num) {
    return typeof num === 'number' && isFinite(num) ? true : false;
  }

  _contactSearch(searchData) {
    return this._storage.findIndex(
      contact =>
        contact.number === searchData ||
        contact.name === searchData ||
        contact.surname === searchData,
    );
  }
}
// проверка
const list = new List('List');
list.add();
list.edit();
list.delete();

const toDoList = new ToDoList('To do list');
toDoList.add();
toDoList.edit();
toDoList.delete();
toDoList.complete();
toDoList.stat();

const contactList = new ContactList('Contact list');
contactList.add();
contactList.edit();
contactList.delete();
contactList.search();
