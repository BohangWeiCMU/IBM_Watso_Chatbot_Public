import 'bootstrap/dist/css/bootstrap.min.css';
import './MessageViewer.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel'  

class SlideShow extends React.Component {
    constructor (props) {
      super(props);
    }
    render() {
        return (
        <Carousel className='slideshow'>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3>"Advisor not responding? Not a problem when you have bin·dər™"</h3>
            <p>Faris Rehman</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3>"I felt much more prepared for my classes after using bin·dər™!"</h3>
            <p>Lia Ferguson</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3>"bin·dər™ will remove all binders that hinder you from being a good student!"</h3>
            <p>Bohang Wei</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3>"bin·dər™ makes my college experience better!"</h3>
            <p>Frederick Zhang</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3> "Love bin·dər™. Everything I need for schedule planning is all right here."</h3>
            <p>Juhee Park</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="bg.jpeg"
            alt="First slide"
            style={{'height':"200px"}}
            />
            <Carousel.Caption>
            <h3>"With bin·dər™, anything is possible!"</h3>
            <p>Hudson Arledge</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
                
        );
      }
    }
    export default SlideShow;