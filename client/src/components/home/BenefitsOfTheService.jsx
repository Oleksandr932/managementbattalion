import React from 'react'
import { benefits } from '../../assets/assets'
import { motion } from 'motion/react'
import { MoreButton } from '../helpers/MoreButton'

const BenefitsOfTheService = () => {
  return (
    <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col md:flex-row items-center md:items-start justify-between px-8 rounded-2xl 
            md:pl-14 bg-linear-to-r from-army-900 to-army-700 max-w-[610px] mx-3 md:mx-auto overflow-hidden'>
            {/* info and button */}
            <div className='text-white'>
                {/* title */}
                <h2 className='max-sm:text-center max-sm:text-2xl md:text-3xl font-semibold mt-2'>Переваги служби в 162-ОМБр</h2>
                <p className='max-w-130'>Служба — це не лише обов’язок, а й реальні вигоди: стабільний дохід, підтримка родини, професійне зростання та захист.</p>
                {/* list */}
                {
                    benefits.map((benefit, index) => (
                        <div key={index} className='flex items-center gap-6 mt-6'>
                            <img src={benefit.iconUrl} alt={benefit.name} className='w-10 h-10 shrink-0 invert' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-semibold text-lg'>{benefit.name}</h3>
                                <p className='text-sm'>{benefit.description}</p>
                            </div>
                        </div>
                    ))
                }
                {/* button */}
                <div className='mb-8 flex justify-center'>
                    <MoreButton />
                </div>
            </div>
    </motion.div>
  )
}

export default BenefitsOfTheService