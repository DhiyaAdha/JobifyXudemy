import React from 'react'
import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import { useState } from 'react';

function LogoutContainer() {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    return (
        <Wrapper>
            <button type='button' className='btn logout-btn'
                onClick={() => setShowLogout(!showLogout)}
            >
                <FaUserCircle />
                {user.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn'
                    onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    );
}

export default LogoutContainer