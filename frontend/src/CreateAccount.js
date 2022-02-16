import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import CreateAccountForm from './CreateAccountForm';

class CreateAccount extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <CreateAccountForm onCreateAccount = {this.props.onCreateAccount}/>
    );
    }
}
export default CreateAccount;