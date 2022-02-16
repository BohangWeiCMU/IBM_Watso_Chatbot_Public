import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <LoginForm onLogin = {this.props.onLogin}/>
    );
    }
}
export default Login;