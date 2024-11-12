import './Navbar.css';
import { Link, useLocation } from '@tanstack/react-router';

const Navbar = () => {
  const location = useLocation();

  return (
  <nav className="navbar">
    <div className="navbar-logo"><Link to='/' style={{all: "unset"}}>LOGO</Link></div>
    <ul className="navbar-menu">
      <li>Pólizas</li>
      <li className={location.href.startsWith('/crm') ? 'active' : ''}> <Link to='/crm' style={{all: "unset", padding: "5px 10px"}}>CRM</Link> </li>
      <li>Archivos</li>
      <li>Cartera</li>
    </ul>
    <div className="navbar-profile">
      <i className="bell-icon">🔔</i>
      <div className="profile-pic">👤</div>
    </div>
  </nav>
)};

export default Navbar;