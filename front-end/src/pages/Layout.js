import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" id="logo" to="/">Rant Book</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/">Feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/rant">Rant</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
        </ul>
      </div>
    </nav>

    <Outlet />
    </>
)
};

export default Layout;