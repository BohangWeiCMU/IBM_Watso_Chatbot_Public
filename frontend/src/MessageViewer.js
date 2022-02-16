import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Message from './Message';
import MessageBlock from './MessageBlock';
import './MessageViewer.css';

class MessageViewer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {dummyCount: 0};
    this.invisibleMessage = React.createRef();
  }

  incrementDummyCount() {
    this.setState((state, props) => ({
      dummyCount: state.dummyCount + 1
    }));
  }

  componentDidUpdate() {
    this.invisibleMessage.scrollIntoView({behavior: "smooth"});
  }

  render() {
    //First need to chunk the list into sublists of "your" messages and "their" messages
    let newArr = new Array([]);

    for (let i = 0; i < this.props.messages.length; i++) {
      let lastSubArray = newArr[newArr.length - 1];

      if (lastSubArray.length == 0) {
        lastSubArray.push(this.props.messages[i]);
        continue;
      } else {
          let lastMessage = lastSubArray[lastSubArray.length - 1];

          if (lastMessage.msg_sender === this.props.messages[i].msg_sender) {
            lastSubArray.push(this.props.messages[i]);
            continue;
          } else {
            newArr.push(new Array(this.props.messages[i]));
            continue;
          }
      }
    }

    return (
      < >
        {newArr.map(messageChunk => {
          return(
            <MessageBlock messageChunk={messageChunk} uname={this.props.uname}/>
          );
        })}

        <div id="invisible-message" ref={(el) => {this.invisibleMessage = el}}></div>
      </>
    );
  }
}

export default MessageViewer;
