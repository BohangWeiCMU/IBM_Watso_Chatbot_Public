import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SettingsForm from './SettingsForm';

const API_URL = 'http://127.0.0.1:5000/';

class SettingsModal extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Modal {...this.props} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chat Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SettingsForm settings={this.props} onSetLanguage={this.props.onSetLanguage} />
                </Modal.Body>
            </Modal>
          );
    }
}
export default SettingsModal;
