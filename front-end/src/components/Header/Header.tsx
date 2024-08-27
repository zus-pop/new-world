import { faHouse, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content">
                <Link to="/" className="logo">
                    <FontAwesomeIcon className="home-icon" icon={faHouse} />
                </Link>
                <div className="search-bar">
                    <input placeholder="Search for products" type="search" />
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                </div>
                <nav className="nav-bar">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/products">Products</NavLink>
                </nav>
                <div className="user-section">
                    <div className="guest">
                        <button className="guest-btn sign-in-btn">
                            Sign-in
                        </button>
                        <button className="guest-btn sign-up-btn">
                            Sign-up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
