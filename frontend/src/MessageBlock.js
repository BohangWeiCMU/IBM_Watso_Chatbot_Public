import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Message from './Message';
import "./MessageViewer.css";

class MessageBlock extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    if (this.props.messageChunk.length == 0) {
      return (
        <div class="yours messages"></div>
      );
    } else {
      //Determine if this is a "yours" or "mine" message block
      if (this.props.messageChunk[0].msg_sender === this.props.uname) { //This is a "mine" message block
        return (
          <div class="mine messages">
            {this.props.messageChunk.map((message, index, arr) => {
              return (
                <Message message={message} last={index == arr.length - 1}/>
              );
            })}
          </div>
        );
      } else {
        return (
          <div class="yours messages">
            {this.props.messageChunk.map((message, index, arr) => {
              return (
                <Message message={message} last={index == arr.length - 1}/>
              );
            })}
          </div>
        );
      }
    }
  }
}

export default MessageBlock;
