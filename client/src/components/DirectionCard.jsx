import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCategory } from '../store/categorySlice'

const DirectionCard = ({ direction }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div onClick={() => { 
            navigate('/positions'); 
            scrollTo(0, 0);
            dispatch(setCategory(direction._id)) 
        }}
            className=' overflow-hidden shadow-lg hover:-translate-y-1 min-h-82
            transition-all duration-500 cursor-pointer group rounded-xl'>
            {/* Direction image and text on image */}
            <div className='relative h-48 overflow-hidden'>
                <img src={direction.href} alt="Direction" className='w-full object-cover
                transition-transform duration-500 group-hover:scale-105 h-full' />

                {direction.isAvaliable && <p className='absolute top-4 left-4 bg-primary
                text-white text-xs px-2.5 py-1 rounded-full'>Наразі є місця</p>}
            </div>
            {/* direction details */}
            <div className='p-4 sm:p-5'>
                <div className='flex justify-between items-start mb-2'>
                    <div>
                        <h3 className='text-lg font-medium'>{direction.title}</h3>
                        <p className='text-muted-foreground text-sm'>{direction.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirectionCard