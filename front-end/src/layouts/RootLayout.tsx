import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <Header />
            <Outlet />
        </div>
    );
};

export default RootLayout;
