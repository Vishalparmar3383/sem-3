import { Link, Outlet } from "react-router-dom";
import logo from './logo.png'

function Layout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                    <img alt="logo" src={logo} style={{height:50,width:50}}/>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">
                                    Admin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders" className="nav-link">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
