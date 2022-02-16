import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import * as Yup from 'yup';

const API_URL = 'http://127.0.0.1:5000/';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(event){
        event.preventDefault();
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        event.preventDefault();
        this.setState({password: event.target.value});
    }

    async handleSubmit(user, pass){
        var resp = await this.login(user, pass);

        if (resp.error != null) {
          //Determine what kind of error this is
          var error = resp.error;

          if (error.indexOf("username") > 0) {
            window.alert("Username invalid");
          } else {
            window.alert("Password invalid");
          }
        } else {
          window.localStorage.setItem('jwt', resp.access_token);
          console.log('jwt saved to local history. value: ' + window.localStorage.getItem('jwt'));
          this.setState({redirect: true});
        }
    }

    async login(user, pass) {
        const response = await fetch(API_URL + '/user/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
           'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            password: pass
          })
        })

        return await response.json();
      }

    render(){
      if (this.state.redirect) {
        return (
          <Redirect to="/chatbot" />
        );
      }

        return (
            <div align="center" class="login-box">
              <h3>Log into your bin·dər™ Account</h3>
              <Formik
              initialValues={{ userName: '', password: '', passwordConfirm: '' }}
              validationSchema={Yup.object({
                userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
                password: Yup.string()
                .required('Required')
              })}
              onSubmit={
                (submission) => {
                  this.handleSubmit(submission.userName, submission.password);
                }
              }
              >
                {
                  props => (
                    <Form>
                      <div className="username form-group">
                        <label htmlFor="userName" className="create-labels form-label">Username</label>
                        <Field name="userName" type="text" className="form-control" placeholder="Username" />
                        <div><ErrorMessage name="userName" /></div>
                      </div>

                      <div className="password form-group">
                        <label htmlFor="password" className="create-labels form-label">Password</label>
                        <Field name="password" type="password" className="form-control" placeholder="Password" />
                        <div><ErrorMessage name="password" /></div>
                      </div>

                      <div class="button-container">
                        {
                          (!props.dirty || !props.isValid) ? <Button className="login-button" variant="danger" type="submit" disabled>Login</Button> : <Button className="login-button" variant="danger" type="submit">Login</Button>
                        }
                      </div>
                    </Form>
                  )
                }
              </Formik>

              <div class="button-container">
                <Button className="create-account-button" variant="outline-danger" href="/create-account">Create an Account</Button>
              </div>
            </div>

        );
    }
}
export default LoginForm;
