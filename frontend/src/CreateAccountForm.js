import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API_URL = 'http://127.0.0.1:5000/';

class CreateAccountForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        redirect: false
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
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

  /*handleConfirmPasswordChange(event){
    event.preventDefault();
    this.setState({confirm_password: event.target.value});
  }*/


  async handleSubmit(user, pass, fname, lname){
    var resp = await this.createAccount(user, pass, fname, lname);
    window.localStorage.setItem('jwt', resp.access_token);
    console.log('jwt saved to local history. value: ' + window.localStorage.getItem('jwt'));
    this.setState({redirect: true});
  }

  async createAccount(user, pass, fname, lname) {
    const response = await fetch(API_URL + '/user/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass,
        fname: fname,
        lname: lname
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
      <div align="center" class="account-info-box">
        <h3>Create a bin·dər™ Account</h3>

        <Formik
        initialValues={{ userName: '', password: '', passwordConfirm: '' }}
        validationSchema={Yup.object({
          fname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
          lname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
          userName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
          password: Yup.string()
          .required('Required'),
          passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Does not match with given password')
          .required('Required')
        })}
        onSubmit={
          (submission) => {
            this.handleSubmit(submission.userName, submission.password, submission.fname, submission.lname);
          }
        }
        >
          {
            props => (
              <Form>
                <div className="create-username form-group">
                  <label htmlFor="fname" className="create-labels form-label">First Name</label>
                  <Field name="fname" type="text" className="form-control" placeholder="First Name" />
                  <div><ErrorMessage name="fname" /></div>
                </div>

                <div className="create-username form-group">
                  <label htmlFor="lname" className="create-labels form-label">Last Name</label>
                  <Field name="lname" type="text" className="form-control" placeholder="Last Name" />
                  <div><ErrorMessage name="lname" /></div>
                </div>

                <div className="create-username form-group">
                  <label htmlFor="userName" className="create-labels form-label">Username</label>
                  <Field name="userName" type="text" className="form-control" placeholder="Username" />
                  <div><ErrorMessage name="userName" /></div>
                </div>

                <div className="password form-group">
                  <label htmlFor="password" className="create-labels form-label">Password</label>
                  <Field name="password" type="password" className="form-control" placeholder="Password" />
                  <div><ErrorMessage name="password" /></div>
                </div>

                <div className="password form-group">
                  <label htmlFor="password" className="create-labels form-label">Password</label>
                  <Field name="passwordConfirm" type="password" className="form-control" placeholder="Confirm Password" />
                  <div><ErrorMessage name="passwordConfirm" /></div>
                </div>

                <div class="button-container">
                  {
                    (!props.dirty || !props.isValid) ? <Button className="create-account-button" variant="danger" type="submit" disabled>Create Account</Button> : <Button className="create-account-button" variant="danger" type="submit">Create Account</Button>
                  }
                </div>
              </Form>
            )
          }
          </Formik>
      </div>

  );


  }
}
export default CreateAccountForm;
