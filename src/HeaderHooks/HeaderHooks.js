import TokenService from '../services/token-service';
import { Link, NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import IdleService from '../services/idle-service';
function HeaderHooks() {
    const handleLogoutClick = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <NavLink to="/exercise" className="nav-link" activeClassName="active">Exercises</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/create" className="nav-link" activeClassName="active">Create Exercise Log</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/user" className="nav-link" activeClassName="active">Create User</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink to="/person" className="nav-link" activeClassName="active"> Person </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/license" className="nav-link" activeClassName="active"> License </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sale" className="nav-link" activeClassName="active"> Sales </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/log" className="nav-link" activeClassName="active"> Log </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/adminResetPW" className="nav-link" activeClassName="active"> Reset Admin Password </NavLink>
                    </li> */}
                </ul>
                {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">ExcerTracker</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Exercises</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Exercise Log</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>
                        </ul>
                    </div>
                </nav> */}
                {TokenService.hasAuthToken() && <Link onClick={handleLogoutClick} to="/">Log out</Link>}
            </div>
        </nav>
    )
}

export default HeaderHooks;