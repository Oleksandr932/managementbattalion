import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
    const { user, logoutUser } = useAppContext()

    return (
        <div className='flex items-center justify-between px-6 md:px-10 py-4 bg-primary
        text-white border-b border-borderColor relative transition-all'>
            {/* logo */}
            <Link to="/">
                <img src={assets.logo} alt="logo" className='h-8 bg-primary' />
            </Link>
            {/* profile */}
            <div className='flex items-center gap-3'>
                <p className='text-right'>Welcome, {user?.name || "Owner"}</p>
                <button className="px-3 py-1 rounded-xl bg-accent-yellow text-white hover:bg-accent-yellow/70 transition" onClick={logoutUser}>Logout</button>
            </div>
        </div>
    )
}

export default NavbarOwner

