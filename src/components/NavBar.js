import {Container, Navbar, NavItem, NavLink} from "react-bootstrap";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();
  const auth_token = localStorage.getItem('auth_token');
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/authenticate');
  }
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="/" >
          Money Tracker
        </Navbar.Brand>
        {auth_token && (
          <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="logout" type="button" onClick={() => handleLogout()}>Log out</Navbar.Text>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
    );
}

export default NavBar;