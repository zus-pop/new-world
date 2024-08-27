import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="error">
            <h1>404</h1>
            <Link to=".">Go back to Home page</Link>
        </div>
    );
};

export default Error;
