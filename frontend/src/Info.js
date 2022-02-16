import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import SlideShow from './SlideShow';
import CardColumns from 'react-bootstrap/CardColumns';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Stylesheet.css'
class Info extends React.Component {
    constructor (props) {
      super(props);
  
    }
  
  
    render() {
      return (
        <Container fluid="true">
          
          <Jumbotron>
            <Container className="jumbotron-text">
              <h1 className="header">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bin·dər™</h1>
              <p className="tagline">
                Course and degree planning made simpler.
              </p>
            </Container>
          </Jumbotron>
          <CardDeck >
            <Card className="cards">
              <Card.Body>
                <Card.Title><br/>About</Card.Title>
                <Card.Text className='spacing'>
                This is a virtual academic advisor (Chatbot) dedicated to OSU CSE students.<br/>
                  Our goal is to make you feel that you are indeed talking to a real academic advisor as you would experience in person.
                  Moreover, our chatbot is resourceful who can help you even beyond the scope of school stuff:
                  <ul>
                    <li>Course Scheduling</li>
                    <li>Curriculum Planning</li>
                    <li>Degree Audit Checking</li>
                    <li>Professors Recommendation</li>
                    <li>Classes Reviews</li>
                    <li>Multilingual Assitant</li>
                  </ul>
                </Card.Text>
                <Button variant="danger" href="/chat" block> Get Started </Button>
                <h5 className='testimonial-header text-center'>User Testimonials</h5> 
                <SlideShow/> 
              </Card.Body>
            </Card>
            <Card className='cards'>
              <Card.Body>
                <Container>
                  <Row noGutters={true}>
                  <Col xl={{offset:4}}>
                  <Card bg="danger" text="white" className="text-center p-2 fill" style={{ width: '12rem' }} >
                    <Card.Body> 
                      <Card.Title>FAQs &amp; Tips</Card.Title>
                    </Card.Body>
                  </Card>
                  </Col>
                  </Row>
                  <Row noGutters={true}>
                  <Col>
                  <Card style={{ width: '12rem' }}>
                    <Card.Header as="h5" className='faq-header'>How does bin·dər™ work?</Card.Header>
                    <Card.Body>
                      <Card.Text className = 'faq-text'>
                        bin·dər™ provides a chatbot interface that can advise you on all things OSU CSE related.
                        Simply ask bin·dər™ a question about CSE and it will provide you with individualized guidance 
                        backed by carefully analyzed resources and data. 
                      </Card.Text>
                      <Button  variant="outline-danger" size="sm" href="/chat" bsClass= 'button'>Start a conversation</Button>{' '}
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card style={{ width: '12rem' }} >
                    <Card.Header as="h5" className='faq-header'>
                      What if I don't know what to ask?
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className = 'faq-text'>
                        That's okay! You can ask bin·dər™ 
                        <span className='question'> "Where should I start?" </span>
                        and it will prompt you for some background information to help
                        you brainstorm what path you'd like to explore during your conversation.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card style={{ width: '12rem' }} >
                    <Card.Header as="h5" className='faq-header'>
                      Will bin·dər™ remember our previous conversation or do 
                      I have to start over?
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className = 'faq-text'>
                        Worry not! Your conversation history with bin·dər™ will be be saved
                        after every session, so you can always see your previous conversations!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  </Row>
                  <Row noGutters={true}>
                  <Col>
                  <Card style={{ width: '12rem' }}  className='text-center'>
                    <Card.Body>
                      <Card.Title>Tip</Card.Title>
                      <Card.Text className = 'faq-text'>
                        Check out the helpful links tab in the navigation bar
                        for resources to support your degree planning curated by the bin·dər™ team.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card className='text-center' style={{ width: '12rem' }} >
                    <Card.Body>
                      <Card.Title>Tip</Card.Title>
                      <Card.Text className = 'faq-text'>
                        If you are more comfortable with a language other than English,
                        ask bin·dər™ a question in your preferred language and it will 
                        switch languages!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card className="text-right" style={{ width: '12rem' }} >
                    <Card.Body className='text-center'>
                      <Card.Title>Tip</Card.Title>
                      <Card.Text className = 'faq-text' >
                        Use bin·dər™ as a sounding board for professors.
                        It will tell you what professors teach a course and
                        provide reviews and expected workload for a given professor!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  </Row>
  
                </Container>
              </Card.Body>
            </Card>
          </CardDeck> 
        </Container>
      );
    }
  }
  
  export default Info;
  