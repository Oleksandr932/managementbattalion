import React from 'react'
import { motion } from 'motion/react'
import { assets, steps } from '../../assets/assets'
import StepCard from './StepCard'
import { HeroButtons } from '../helpers/HeroButtons'
import { Title } from '../helpers/Title'
import { SubTitle } from '../helpers/SubTitle'

const HowToApply = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32'>
            {/* title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}>
                <Title
                    text="Як подати заявку на службу"
                    color="black"
                />
                <SubTitle
                    text="Зрозумілий і впорядкований процес вступу до Батальйону управління — від першого звернення до зарахування в підрозділ."
                    color='primary'
                />
            </motion.div>
            {/* steps */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='grid grid-cols-1 gap-6 mt-8'>
                {
                    steps.map((step, index) => (
                        <motion.div key={step._id + index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}>
                            <StepCard step={step} />
                        </motion.div>
                    ))
                }
            </motion.div>
            {/* button */}
            <HeroButtons />
        </motion.div>
    )
}

export default HowToApply