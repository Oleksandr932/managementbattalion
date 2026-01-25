import React from 'react'

const StepCard = ({ step }) => {
    return (
        <div className=' overflow-hidden shadow-lg hover:-translate-y-1
            transition-all duration-500 cursor-pointer group rounded-xl'>
            {/* direction details */}
            <div className='p-4 sm:p-5'>
                <div className='flex max-sm:gap-2 gap-6 items-сenter mb-2'>
                    <img src={step.iconUrl} alt="Step" className=' w-10 h-10 transition-transform duration-500 group-hover:scale-105' />
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-md font-medium text-primary'>
                            {step.title}
                        </h3>
                        <p className='max-sm:text-xs text-sm block break-all whitespace-normal text-gray-600 px-1'>
                            {step.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepCard