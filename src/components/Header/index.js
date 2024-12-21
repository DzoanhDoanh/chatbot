import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';

const expand = false;
function Header() {
    return (
        <>
            <Navbar key={'sm'} expand={expand} className="navbar-expand-lg py-3 navbar">
                <Container fluid>
                    <Navbar.Brand href="#" className="me-auto nav-brand fw-semibold">
                        <img src={Logo} alt="logo" className="nav-logo"></img>
                    </Navbar.Brand>

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Chatbot</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3">
                                <NavLink to={'/'} className="mx-lg-2 fw-semibold nav-link">
                                    Trang chủ
                                </NavLink>
                                <NavLink to={'/chat'} className="mx-lg-2 fw-semibold nav-link">
                                    Trò chuyện
                                </NavLink>
                                <NavLink to={'/faqs'} className="mx-lg-2 fw-semibold nav-link">
                                    FAQs
                                </NavLink>
                                <NavLink to={'/issue'} className="mx-lg-2 fw-semibold nav-link">
                                    Báo lỗi góp ý
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    {/* <a href="#action2" className="login-button">
                        Login
                    </a> */}
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
