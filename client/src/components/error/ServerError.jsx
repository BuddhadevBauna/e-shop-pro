import { Link } from "react-router-dom";
import "./ServerError.css";
import "./Common.css";

const ServerError = () => {
    return (
        <>
            <div className="error-page">
                <div className="content">
                    <h2 className="server-header">Server Error</h2>
                    <h4>Oops! something went wrong</h4>
                    <p>Try to refresh the page or feel free to contact us if the problem persists.</p>
                    <div className="btns">
                        <Link to={'/'}>return home</Link>
                        {/* <Link to={'/contact'}>report problem</Link> */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ServerError;