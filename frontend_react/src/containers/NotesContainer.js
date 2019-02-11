import React from 'react';
import axios from 'axios'
import {observer} from 'mobx-react';
import observableNotesStore from '../Store'

import { Modal, Button } from 'antd';

import NotesList from '../components/NotesList';

const data = [
  {
    title: 'Title 1 what are the reasons for all the conflict in the world.',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];


const NotesContainer = observer(class NotesContainer extends React.Component {

  componentDidMount() {
    // this.getNotesList(this.SERVER_BACKEND_URL);
    observableNotesStore.fetchNotesList();
  }

  handleCreateButtonClick = () => {
    observableNotesStore.createNote(prompt('Enter a new note:','coffee plz'));
  }

  showModal = () => {
    observableNotesStore.createModalVisible = true;
  }

  hideModal = () => {
    observableNotesStore.createModalVisible = false;
  }

  handleModalSubmit = () => {
    observableNotesStore.createModalVisible = false;
    const newNoteDescription = document.getElementById("noteDescriptionCreate").value;
    observableNotesStore.createNote(newNoteDescription);
    document.getElementById("noteDescriptionCreate").value = "";
    console.log("newNote: ", newNoteDescription);
  }

  render() {
    return (
      <div>
        <button type="submit" className="btn btn-outline-success my-2" onClick={this.showModal}>
          + New Note
        </button>
        <Modal
          title="Create Note"
          visible={observableNotesStore.createModalVisible}
          onOk={this.handleModalSubmit}
          onCancel={this.hideModal}
          footer={[
            <Button key="cancel" type="danger" onClick={this.hideModal}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleModalSubmit}>
              Create
            </Button>,
          ]}
        >
        <label htmlFor="noteDescriptionCreate">Note:</label>
        <textarea className="form-control" name="noteDescriptionCreate" id="noteDescriptionCreate" rows="4"/>
        </Modal>
        <NotesList
          notesStore={observableNotesStore}
          deleteNote={this.deleteNote}
        />
      </div>
    )
  }

})


export default NotesContainer;

// const NotesList = () => {
//   return (
//     <List
//       grid={{
//         gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
//       }}
//       dataSource={data}
//       renderItem={item => (
//         <List.Item>
//           <Card description={item.title}>Card content</Card>
//         </List.Item>
//       )}
//     />
//   )
// };