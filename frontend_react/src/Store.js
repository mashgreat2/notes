import {observable, autorun, computed, decorate, action} from 'mobx';
import * as mobx from "mobx";
import axios from "axios";
class NotesStore {
  notes = [];
  pendingRequests = 0;
  createModalVisible = false;

  constructor() {
    mobx.autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.notes.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() {
    if (this.notes.length === 0)
      return "<none>";
    console.log("this.notes", this.notes);
    return `Next todo: "${this.notes[0].description}". ` +
      `Progress: ${this.completedTodosCount}/${this.notes.length}`;
  }

  createNote(description) {
    axios.post(this.SERVER_BACKEND_URL, {
      description: description,
      completed: false,
      created_on: null
    })
      .then(response => {
        console.log("api create success:", response);
        this.fetchNotesList();
      })
      .catch(error => {
        console.log("error occured during create api call:", error);
        throw error;
      })
  }

  updateNote(id, description) {
    const url = `${this.SERVER_BACKEND_URL}${id}/update`;
    console.log("url: ", url);
    axios.patch(url, {
      description: description,
    })
      .then(response => {
        console.log("api create success:", response);
        this.fetchNotesList();
      })
      .catch(error => {
        console.log("error occured during api call:", error);
        throw error;
      })
  }

  deleteNote(id) {
    const deleteURL = `${this.SERVER_BACKEND_URL}${id}/delete`;
    axios.delete(deleteURL)
      .then( response => {
          console.log("after delete api call success. response: ", response);
          this.fetchNotesList();
        }
      )
      .catch(error => {
        console.log("error occured during delete api call:", error);
        throw error;
      })
  }

  SERVER_BACKEND_URL = "http://127.0.0.1:8000/api/notes/";

  fetchNotesList() {
    axios.get(this.SERVER_BACKEND_URL)
      .then(response => {
        console.log("response: ", response);
        this.notes = response.data;
      })
      .catch(error => {
        console.log("error: ", error);
        throw error;
      })
  }
}

decorate(NotesStore, {
  notes: observable,
  pendingRequests: observable,
  createModalVisible: observable,
  completedTodosCount: computed,
  report: computed,
  createNote: action,
  updateNote: action,
  fetchNotesList: action,
  deleteNote: action,
})


const observableNotesStore = new NotesStore();

export default observableNotesStore;