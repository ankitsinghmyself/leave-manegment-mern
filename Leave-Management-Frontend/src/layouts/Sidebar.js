import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [userData] = useState(JSON.parse(localStorage.getItem("user")));
    const [show, setShow] = useState(false);

    return (
        <main className={show ? 'space-toggle z-20' : ""}>
            <header className={`header z-20 ${show ? 'space-toggle' : ""}`}>
                <div className='header-toggle' onClick={() => setShow(!show)}>
                    <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : ""}`}></i>
                    <span className='ml-2'>Leave Management</span>
                </div>
            </header>

            <aside className={`sidebar z-20 ${show ? 'show' : ""}`}>
                <nav className='nav bg-white shadow-md'>
                    <div>
                        <div className='nav-logo'>
                            <i className={`fas fa-home-alt nav-logo-icon`}></i>
                            <span className='nav-logo-name'></span>
                        </div>

                        <div className='nav-list'>
                            <Link to={userData.is_admin ? "/admindashboard" : "/userdashboard"} className='nav-link active'>
                                <div className='flex items-center'>
                                    <i className='fas fa-tachometer-alt text-xl nav-link-icon mr-6'></i>
                                    <span className='nav-link-name'>Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <Link to='/' className='nav-link' onClick={() => {
                        localStorage.clear()
                    }}>
                        <div className='flex items-center'>
                            <i className='fas fa-sign-out text-xl nav-link-icon mr-6'></i>
                            <span className='nav-link-name'>Logout</span>
                        </div>
                    </Link>
                </nav>
            </aside>
        </main>
    );
};

export default Sidebar;