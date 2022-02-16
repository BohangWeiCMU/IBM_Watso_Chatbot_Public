import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router";
import './Stylesheet.css';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    console.log("here");
    window.localStorage.removeItem("jwt");

    this.props.history.push("/");
  }

  render() {
    return (
        <Navbar bg="dark" variant="dark" expand="xxl" sticky="top" fluid="true">
            <Navbar.Brand href="/" >
                <img src="binder_white.png" alt="bin·dər™" style={{width:'120px'}}/>
                {/* bin·dər™ */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

            <NavDropdown color="white" title="Majors & Minors">
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/bachelors-science-computer-science-engineering-bs-cse", "_blank")}>BS CSE Major</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/bachelor-science-computer-information-science-bs-cis", "_blank")}>BS CIS Major</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/bachelor-arts-computer-information-science-ba-cis", "_blank")}>BA CIS Major</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/application-major-and-requirements-apply", "_blank")}>Application Info</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate/honors-programs", "_blank")}>Honors</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/minor-computer-and-information-science", "_blank")}>CIS Minor</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/minor-computational-science-and-engineering", "_blank")}>Computational Science Minor</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown color="white" title="Courses & Specializations">
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate-research", "_blank")}>Undergraduate Research</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/sites/default/files/uploads/purple_bs_cse_requirements_and_sample_schedule_au18_3341_revision_rev_071720_purple.pdf", "_blank")}>BS CSE Requirements</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/sites/default/files/uploads/purple_bs_cis_requirements_and_sample_schedule_au18_3341_rev_rev_071720_purple.pdf", "_blank")}>BS CIS Requirements</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/sites/default/files/uploads/ba_cis_requirements_and_sample_schedule_rev_071720.pdf", "_blank")}>BA CIS Requirements</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/sites/default/files/uploads/purple_bs_cis_and_cse_specialization_options_au18_forward_rev_022219_purple.pdf", "_blank")}>CSE/CIS Specialiation Requirements</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown color="white" title="Research Focuses & Faculty">
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate-research", "_blank")}>Undergraduate Research</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/artificial-intelligence", "_blank")}>Artificial Intelligence</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/computer-graphics", "_blank")}>Computer Graphics</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/networking-distributed-computing", "_blank")}>Networking & Distributed Computing</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/software-engineering-programming-languages", "_blank")}>Software Engineering & Programming Languages</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/systems", "_blank")}>Systems</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/theory-algorithms", "_blank")}>Theory & Algorithms</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/directory", "_blank")}>Faculty Directory</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown color="white" title="Student Resources & Engagement">
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergrad/transfer-credit", "_blank")}>Transfer Credit</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate/scholarships", "_blank")}>Scholarships</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/computing-services/employment/student-opportunities", "_blank")}>Student Positions</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/student-resources", "_blank")}>Other Resources</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate/student-organizations", "_blank")}>Student Organizations</NavDropdown.Item>
              <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/current-students/undergraduate/it-entrepreneurship", "_blank")}>Enrichment Programs</NavDropdown.Item>
            </NavDropdown>

              <NavDropdown color="white" title="Relevant Majors & Programs">
                <NavDropdown.Item onClick={event => window.open("https://data-analytics.osu.edu/", "_blank")}>BS Data Analytics</NavDropdown.Item>
                <NavDropdown.Item onClick={event => window.open("https://cse.osu.edu/research/artificial-intelligence", "_blank")}>BS Electrical and Computer Engineering (Computer Engineering track)</NavDropdown.Item>
                <NavDropdown.Item onClick={event => window.open("https://physics.osu.edu/eng-concentration-requirements", "_blank")}>BS Engineering Physics (Computer Science specialization)</NavDropdown.Item>
                <NavDropdown.Item onClick={event => window.open("https://files.fisher.osu.edu/undergraduate/public/2019-09/Specialization%20Career%20Handout_Information%20Systems.pdf?fPU0v24nq9jP3ZohLbbNTl7PpPtAxxFp=", "_blank")}>BS Business Administration (Information Systems specialization)</NavDropdown.Item>
                <NavDropdown.Item onClick={event => window.open("https://ise.osu.edu/data-analytics-optimization", "_blank")}>BS Industrial and Systems Engineering (Data Analytics and Optimization track)</NavDropdown.Item>
              </NavDropdown>

                <Nav activeKey={this.props.pathname} className="ml-auto">
                    {window.localStorage.getItem('jwt') == null?
                      <Nav.Link href="/login">Log in</Nav.Link>
                    :
                      [
                      <Nav.Link onClick={this.logout}>Log out</Nav.Link>,
                      <Nav.Link href="/chat">Chat</Nav.Link>
                      ]
                    }
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default withRouter(Header);
