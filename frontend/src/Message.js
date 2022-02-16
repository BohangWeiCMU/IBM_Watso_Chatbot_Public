import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import "./MessageViewer.css";

class Message extends React.Component {
  constructor (props) {
    super(props);
  }
  // for rendering links
  renderText() {
    let parts = this.props.message.msg_txt.split(/(http.*|link)/g) // matching regular expression
    parts[1] = <a href={parts[3]} target="_blank">{parts[1]}</a>
    if (parts.length > 2){
      parts[3] = parts[4];
      parts.pop();
      parts.slice(0,3);
      return parts;
    }
    return parts;
  }
  render() {
    let text = this.renderText();
    if (this.props.last) {
      return (
        <div class="message last">
          {/* {this.props.message.msg_txt} */}
          {text}
        </div>
      );
    } else {
      return (
        <div class="message">
          {/* {this.props.message.msg_txt} */}
          {text}
        </div>
      );
    }
  }
}

export default Message;