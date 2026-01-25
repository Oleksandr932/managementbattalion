import React from 'react'
import { moreBenefits } from '../../assets/assets'
import { motion } from 'motion/react'

const MoreBenefits = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col md:flex-row items-center lg:w-5xl justify-between mx-3 md:mx-auto overflow-hidden'>
            {/* list */}
            {
                moreBenefits.map((benefit, index) => (
                    <div key={index} className='px-6 py-4 text-sm text-white bg-linear-to-r from-army-900 to-army-800 rounded-2xl mb-2 max-sm:w-full md:mx-2 text-center'>
                        <p className='text-lg font-semibold text-white'>{benefit.description}</p>
                    </div>
                ))
            }
        </motion.div>
    )
}

export default MoreBenefits