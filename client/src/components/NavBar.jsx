import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'
import { useDispatch } from 'react-redux'
import { setForm } from '../store/formSlice'

const NavBar = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { user } = useAppContext()
    const dispatch = useDispatch()

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center justify-between px-6 md:px-12 lg:px-6 py-4  lg:h-14 lg:w-5xl text-gray-200 border-borderColor absolute transition-all mx-auto lg:rounded-lg z-50 lg:top-9 right-0 left-0 bg-primary/60 gap-2`}>
            {/* logo */}
            <Link to="/" className='cursor-pointer flex gap-2 items-center'>
                <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="logo" className='h-6 ' />
                <motion.span className='font-semibold text-lg md:text-sm lg:text-lg md:text-center'>
                    162 ОМБp
                </motion.span>
            </Link>
            {/* navigation */}
            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t gap-4
            border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center sm:gap-8 text-center
            max-sm:p-4 transition-all duration-300 z-50 max-sm:bg-primary lg:justify-between lg:w-3/4
            ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                {/* menu links */}
                {menuLinks.map((link, index) => (
                    <Link key={index + "linkMenu"} to={link.path} onClick={() => setOpen(!open)}
                        className='relative px-2 py-1 font-oswald tracking-wide uppercase text-xs text-gray-100 transition-all duration-200 after:absolute after:left-0 after:bottom-0 after:h-0.5 hover:text-yellow-500 after:w-0 after:bg-[#F3F2E7]/70 after:transition-all after:duration-300 hover:after:w-full'>
                        {link.name}
                    </Link>
                ))}
                {/* buttons */}
                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    {user ? (
                        <button className='cursor-pointer px-6 py-2 max-sm:bg-accent-yellow hover:max-sm:bg-accent-yellow/80 bg-primary/50 md:text-white rounded-lg hover:bg-primary text-black'
                            onClick={() => navigate('/owner')}>
                            Адмін Панель
                        </button>
                    ) : (
                        <button className='cursor-pointer px-6 py-2 max-sm:bg-accent-yellow hover:max-sm:bg-accent-yellow/80 bg-primary/50 md:text-white rounded-lg hover:bg-primary text-black' onClick={() => { dispatch(setForm(true)) }}>
                            Подати заявку
                        </button>
                    )}
                </div>
            </div>
            {/* mobile button menu */}
            <button className='sm:hidden cursor-pointer ' onClick={() => setOpen(!open)} aria-label='Menu'>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="mobileMenu" className='text-gray-200' />
            </button>
        </motion.div>
    )
}

export default NavBar