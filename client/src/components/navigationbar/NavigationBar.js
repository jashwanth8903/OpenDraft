import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resetState } from '../../redux/slices/userAuthorSlice';
import './NavigationBar.css';




function NavigationBar() {
    let { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
    let dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    function logout() {
        //remove item from local storage
        localStorage.removeItem('token')
        dispatch(resetState())
    }

    function handleToggle() {
        setMenuOpen((prev) => !prev);
    }

    function handleMenuClose() {
        setMenuOpen(false);
    }

    return (
        <div>
            <nav>
                <div className='navigation-bar'>
                    <div className='logo-toggle-container'>
                        <span className='logo-text'>Open<span className='draft'>Draft</span></span>
                        <button className={`navbar-toggle${menuOpen ? ' open' : ''}`} onClick={handleToggle} aria-label="Toggle navigation">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            {menuOpen && <span className="close-x">&#10005;</span>}
                        </button>
                    </div>
                    <div className={`containerr${menuOpen ? ' show' : ''}`}>
                        <ul className="navbar">
                            {loginUserStatus === false ? <>
                                <li className="nav-item ">
                                    <NavLink className="nav-link" to="" onClick={handleMenuClose}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="login" onClick={handleMenuClose}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="register" onClick={handleMenuClose}>Register</NavLink>
                                </li></> : <>
                                <div className='user-profile-details'>
                                    <div className='user-profile-name'><FaUserCircle /> <b>{currentUser.username}</b>  ({currentUser.usertype}) </div>
                                    <li className="nav-item user-item">
                                        <NavLink className="nav-link " to="login" onClick={() => { logout(); handleMenuClose(); }}><TbLogout /> Logout</NavLink>
                                    </li>
                                </div>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBar