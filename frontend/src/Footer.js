import {Navbar, Nav} from 'react-bootstrap'

const Footer = props => {
    const { location } = props;
    return(
        <Navbar className="footer" bg="dark" variant="dark" expand="lg" sticky="bottom">
            <div className="empty-container"></div>
            <div className="container">
                      <Navbar.Text className='m-auto'>
                            "Design must reflect the practical and aesthetic in business but above all, good design must primarily serve people." - Thomas J. Watson
                            | <strong>©bin·dər™</strong>
                        </Navbar.Text>
            </div>
        </Navbar>
    )
}

export default Footer;
