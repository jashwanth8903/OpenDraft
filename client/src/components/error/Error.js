import { LuFileSearch } from "react-icons/lu";
import './Error.css';

function Error() {
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <div className='error-container'>
            <div className='error-content'>
                <h1>404</h1>
                <h2><LuFileSearch /> Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist. It might have been moved or deleted.</p>
                <button className="error-link" onClick={handleRefresh}>Refresh Page</button>
            </div>
        </div>
    );
}

export default Error;
