import React from 'react';
import axios from 'axios'
import {observer} from 'mobx-react';
import { Modal, Button } from 'antd';
import observableNotesStore from "../Store";


const NotesList = observer(class NotesList extends React.Component {

  state = {
    updateModalVisible: false,
    currentEditingNoteDescription: "",
    currentEditingNoteID: null,
  }

  SERVER_BACKEND_URL = "http://127.0.0.1:8000/api/notes/";

  handleDeleteButtonClick = (noteID) => {
    console.log("delete button clicked");
    console.log("noteID", noteID);
    this.props.notesStore.deleteNote(noteID);
  };

  showUpdateForm = (noteID) => {
    this.setState({updateModalVisible: true});
    const url = `${this.SERVER_BACKEND_URL}${noteID}/update`;
    axios.get(url)
      .then(response => {
        this.setState({currentEditingNoteDescription: response.data.description, currentEditingNoteID: noteID });
      })
      .catch(error => {
        console.log("error during api call: ", error);
      })
  };

  handleDescriptionUpdate = (event) => {
    this.setState({currentEditingNoteDescription: event.target.value});
  }

  cancelNoteUpdate = () => {
    this.setState({updateModalVisible: false, currentEditingNoteDescription: "", currentEditingNoteID: null });
  }

  handleUpdateSubmit = () => {
    observableNotesStore.updateNote(this.state.currentEditingNoteID, this.state.currentEditingNoteDescription);
    this.setState({updateModalVisible: false, currentEditingNoteDescription: "", currentEditingNoteID: null });
  }




  render() {
    const store = this.props.notesStore;
    // console.log("store: ", store);
    return (
      <div className="card-columns">
        {
          store.notes.map((item, index) => (
            <div className="card" key={item.id}>
              <div className="card-body">
                <p className="">
                  {item.description}
                </p>
                <button role="button" className="btn btn-outline-danger float-right mb-3"
                   // using an arrow function here to pass the note item's id in order for the delete to work
                   onClick={() => {this.handleDeleteButtonClick(item.id)}}> Delete</button>
                <button
                  role="button"
                  onClick={() => {this.showUpdateForm(item.id)}}
                  className="btn btn-outline-info mr-1 float-right mb-3"> Update</button>
              </div>
            </div>

          ))
        }
        <Modal
          title="Update Note"
          visible={this.state.updateModalVisible}
          onOk={this.handleModalSubmit}
          onCancel={this.cancelNoteUpdate}
          footer={[
            <Button key="cancel" type="danger" onClick={this.cancelNoteUpdate}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>
              Update
            </Button>,
          ]}
        >
          <label htmlFor="noteDescription">Note:</label>
          <textarea value={this.state.currentEditingNoteDescription}
                    onChange={this.handleDescriptionUpdate}
                    className="form-control"
                    name="noteDescription" id="noteDescription" rows="4"/>
        </Modal>
      </div>
    )
  }


});

export default NotesList;

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