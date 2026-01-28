import React from 'react'
import { TrustMarquee } from './TrustMarquee'
import { assets } from '../../assets/assets'
import { Title } from '../helpers/Title'
import { SubTitle } from '../helpers/SubTitle'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'


const Heared = () => {
    const navigate = useNavigate();


    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='reletive w-full'>

            <img src={assets.hero} alt="heared" className='w-full h-auto lg:h-screen object-cover' />

            {/* Dark overlay for lg+ */}
            <div className="hidden lg:block absolute inset-0 bg-black/50"></div>

            {/* Content Container */}
            <div className="flex flex-col items-center gap-4 px-4 lg:absolute lg:top-38 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-3xl lg:z-50 max-lg:mt-6 ">
                {/* Title */}
                <Title
                    text="Батальйон управління 162 окремої механізованої бригади"
                    color="white"
                />

                {/* Subtitle */}
                <SubTitle
                    text="Забезпечує керованість, зв’язок і координацію підрозділів 162 ОМБр.
                            Служба там, де приймаються рішення і тримається цілісність бойових дій."
                    color="white"
                />
                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center md:justify-between my-8">
                    {/* Position Button */}
                    <button className='w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-lg lg:text-3xl text-black bg-accent-yellow backdrop-blur-sm hover:bg-accent-yellow/70
                    active:bg-accent-yellow/70 transition'
                        onClick={() => navigate('/positions')}>
                        Обрати посаду
                    </button>
                    {/* ChatBot Button */}
                    <button className='w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-lg lg:text-3xl text-borderColor bg-primary/80 backdrop-blur-sm hover:bg-primary active:bg-primary
                    transition border border-borderColor '
                        onClick={() => window.open('https://t.me/military_law_help', '_blank')}>
                        Консультація
                    </button>
                </div>
                {/* TrustMarquee */}
                <TrustMarquee />
            </div>
        </motion.div>
    )
}

export default Heared