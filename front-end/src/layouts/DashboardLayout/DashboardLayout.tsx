import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
