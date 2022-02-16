import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class MessageForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {message: ""};

    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();

    let newMessage = {
      msg_id: null,
      msg_sender: this.props.uname,
      msg_txt: this.state.message
    };

    this.setState({message: ""});

    this.props.onSendMessage(newMessage);
  }

  updateMessage(e) {
    e.preventDefault();

    this.setState({message: e.target.value});
  }

  render() {
    return (
      <Form onSubmit={this.sendMessage}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">Message</InputGroup.Text>
          </InputGroup.Prepend>

          <Form.Control value={this.state.message} placeholder="Say something..." aria-label="Say something..." aria-describedby="basic-addon2" onChange={this.updateMessage}/>

          <InputGroup.Append>
            <Button variant="outline-secondary" type="submit">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default MessageForm;
