// import { Link } from "react-router-dom";
import "./ServerError.css";
import "./Common.css";
import { GrRefresh } from "react-icons/gr";
import { useState } from "react";

const ServerError = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        window.location.reload();
    };

    return (
        <>
            <div className="error-page">
                <div className="content">
                    {isLoading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <>
                            <h2 className="server-header">Server Error</h2>
                            <h4>Oops! something went wrong</h4>
                            <p>Try to refresh the page</p>
                            <i className="refresh-icon" onClick={handleRefresh}><GrRefresh /></i>
                            {/* or feel free to contact us if the problem persists. */}
                            {/* <div className="btns">
                                <Link to={'/'}>return home</Link>
                                <Link to={'/contact'}>report problem</Link>
                            </div> */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default ServerError;