import './custom.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import MessageViewer from './MessageViewer';
import MessageForm from './MessageForm';
import SettingsModal from './SettingsModal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './MessageViewer.css';

const API_URL = 'http://127.0.0.1:5000/';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      messages: [],
      showModal: false,
      language_msg: ""
    };
    this.addMessage = this.addMessage.bind(this);
    this.setShowModal = this.setShowModal.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /*
  Sets showModal state variable to value b (true or false)

  Parameters:
    b: type boolean
  */
  setShowModal(b){
    this.setState({showModal: b});
  }


  async setLanguage(lan, needs_req) {
    console.log("here, " + lan + " " + needs_req);
    if (needs_req) {
        var currLanguage = (await this.getLanguage()).language;
        this.setState({language_msg: currLanguage});
        console.log(currLanguage);
    } else {
        this.setState({language_msg: lan});
    }
  }

  /*
  This function takes a string message and sends it to the backend via
  a POST request to the appropriate endpoint. It is async because it uses
  the await keyword to block and wait for the response from the backend.

  Parameters:
    newMessage: type string, message to be sent

  Returns:
    A JavaScript Promise object containing the JSON of the response from the
    backend
  */
  async postMessage(newMessage) {
    var jwt = window.localStorage.getItem('jwt');

    var result = await fetch(API_URL + "messaging/send_message", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify({
        'msg_txt': newMessage,
        'c_id': this.state.cid
      })
    });

    return result.json();
  }

  /*
  This function is the callback used by the subcomponents of this React App
  to handle the addition of a new message by the user through the MessageForm.
  It is async because it uses the await keyword to make sure that the JSON
  response is processed before the program proceeds.

  Parameters:
    newMessage: type Object with fields {msg_sender, msg_txt, msg_id}

  Returns:
    N/A
  */
  async addMessage(newMessage) {
    var response;
    var result = await this.postMessage(newMessage.msg_txt)
    .then((result) => {
      response = result;
    });

    response = response.response.msg_txt;

    let currentMessages = this.state.messages.slice();
    currentMessages.push(newMessage);
    this.setState({messages: currentMessages});
    this.sleep(1500).then(() => {
    currentMessages.push({
      msg_txt: response,
      msg_sender: "bin·dər™ Advisor"
    });
    this.setState({messages: currentMessages});
    })
  }

  async loadHistory(cid) {
    var jwt = window.localStorage.getItem('jwt');

    var result = await fetch(API_URL + '/messaging/load_conversation?c_id=' + cid, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })

    return result.json();
  }

  async getUname() {
    var jwt = window.localStorage.getItem('jwt');

    var response = await fetch(API_URL + '/user/uname', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })

    return await response.json();
  }

  async getCID() {
    var jwt = window.localStorage.getItem('jwt');

    var response = await fetch(API_URL + '/messaging/get_c_ids', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })

    return await response.json();
  }


  async getLanguage() {
    var jwt = window.localStorage.getItem('jwt');

    var response = await fetch(API_URL + '/messaging/get_language', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })

    return await response.json();
  }


  async componentDidMount() {
    //We will retrieve the current language set by the user from db
    var currLanguage = (await this.getLanguage()).language;
    this.setLanguage(currLanguage, false);

    //We will load the logged in user's name here
    var unameResp = (await this.getUname()).uname;
    this.setState({uname: unameResp});

    //We will load the user's conversation IDs here
    var cidResp = (await this.getCID()).c_ids;
    this.setState({cid: cidResp[0]});

    //We will load the message history here
    var response;
    var result = await this.loadHistory(cidResp)
    .then((result) => {
      response = result;
    })

    let currentMessages = this.state.messages.slice();
    currentMessages = response.messages;
    this.setState({messages: currentMessages});
    console.log(this.state.messages);
  }

  render() {
    return (
      <Container fluid="true">
        <Row md="auto">
          <Button className="settings-button" variant="secondary-outline">
            <img src="settings-icon.png" alt="Settings" onClick={()=>this.setShowModal(true)} style={{width:'100%'}}/>
          </Button>
        </Row>
        <Row>
        <Col>
        <Container className="bg-light messagebox">

          <Container className="messagebox-inner">
            <MessageViewer messages={this.state.messages} uname={this.state.uname}/>
          </Container>

          <div className="messageform">
            <MessageForm messages={this.state.messages} onSendMessage={this.addMessage} uname={this.state.uname}/>
          </div>
          <div>{this.state.language_msg}</div>
        </Container>
        </Col>
      </Row>

      <SettingsModal onSetLanguage={this.setLanguage} show={this.state.showModal} onHide={()=>this.setShowModal(false)}></SettingsModal>

      </Container>

    );
  }
}

export default App;
