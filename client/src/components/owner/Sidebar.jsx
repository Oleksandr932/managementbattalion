import React from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'


const Sidebar = () => {
    const { user, axios, fetchUser } = useAppContext()
    const location = useLocation()

    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8
        max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
            {/* user image */}
            <div className='group relative'>
                <label htmlFor="image">
                    <img alt="" className='mx-auto w-10 h-10 max-md:mt-3 mb-1 md:w-20 md:h-20 object-contain cursor-pointer'
                        src={assets.hevron} />
                </label>
            </div>
            {/* user name */}
            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>
            {/* sidebar links menu */}
            <div className='w-full'>
                {ownerMenuLinks.map((link, index) => (
                    <NavLink key={index + "linkMenu"} to={link.path} className={`relative flex items-center gap-2 w-full
                    py-3 first-mt-6 ${link.path === location.pathname ? "bg-primary/10" : "text-gray-600"}`}>
                        <span className='max-md:hidden pl-4'>{link.name}</span>
                        <span className='pl-3 hidden max-sm:block items-center text-start bg-primary/10'>{link.nameSm}</span>
                        <div className={`${link.path === location.pathname && "bg-primary"}
                        w-1.5 h-8 rounded-l right-0 absolute`}></div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar