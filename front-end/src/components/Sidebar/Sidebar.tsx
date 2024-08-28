import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { faDashboard, faMedal } from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-title nav-section">
                <FontAwesomeIcon icon={faDashboard} />
                <h4 className="title">Dashboard</h4>
            </div>
            <div className="sidebar-nav">
                <h4 className="nav-label">Manages</h4>
                <div className="nav-list">
                    <NavLink to="product" className="nav-section">
                        <FontAwesomeIcon icon={faProductHunt} />
                        <h4 className="section-title">Product</h4>
                    </NavLink>

                    <NavLink to="category" className="nav-section">
                        <FontAwesomeIcon icon={faMedal} />
                        <h4 className="section-title">Category</h4>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
