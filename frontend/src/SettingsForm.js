import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://127.0.0.1:5000/';

class SettingsForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            language: 'English'
        };

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLanguageChange(event){
        this.setState({language: event.target.value});
    }

    async handleSubmit(event){
        event.preventDefault();
        var jwt = window.localStorage.getItem('jwt');

        await fetch(API_URL + "messaging/language_change", {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
          },
          body: JSON.stringify({
            'language_info': this.state.language
          })
        });

        console.log('Changing language to ' + this.state.language);
        await this.props.onSetLanguage(this.state.language, true);
    }

    render(){
        return (
            <div align="center" class="chat-settings-box">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="language" controlId="formSelect" >
                    <Form.Label className="login-labels">Language</Form.Label>
                    <Form.Control as="select" type="select" className="languageSelect" value={this.state.language} onChange={this.handleLanguageChange} disabled={false}>
                        <option value='English'>English</option>
                        <option value='French'>French</option>
                        <option value='Spanish'>Spanish</option>
                        <option value='Chinese'>Chinese</option>
                        <option value='Korean'>Korean</option>
                        <option value='Japanese'>Japanese</option>
                        <option value='Hindi'>Hindi</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="darkmode" controlId="formSwitch" >
                    <Form.Check
                        // disabled
                        type="switch"
                        label="Dark Mode"
                        id="disabled-custom-switch"
                        className="switch"
                    />
                </Form.Group>
                <div class="button-container">
                  <Button className="save-button" variant="danger" type="submit" >Save Changes</Button>
                </div>
              </Form>
            </div>

        );
    }
}
export default SettingsForm;
