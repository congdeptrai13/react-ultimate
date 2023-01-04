import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { logout } from '../../services/apiServices';
import Language from './Language';
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    //clear data redux
    navigate("/login")
  }
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const dispatch = useDispatch();

  console.log(account);
  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate('/login');
    } else {
      toast.error(res.EM);
    }
    console.log("res", res)
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="">Công đẹp trai</Navbar.Brand> */}
        <NavLink to="/" className='navbar-brand'>Công đẹp trai</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="users" className='nav-link'>Users</NavLink>
            <NavLink to="admins" className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                <button className='btn-signup' onClick={() => navigate("/register")}>Sign up</button>
              </>
              :
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
              </NavDropdown>
            }
            <Language />

            {/* <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
            <button className='btn-signup' onClick={() => navigate("/register")}>Sign up</button>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>
                Log out
              </NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;