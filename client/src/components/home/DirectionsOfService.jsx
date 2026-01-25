import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { assets } from '../../assets/assets'
import DirectionCard from '../DirectionCard'
import { Title } from '../helpers/Title'
import { SubTitle } from '../helpers/SubTitle'
import { useAppContext } from '../../context/AppContext'

const DirectionsOfService = () => {
    const { axios } = useAppContext()
    const navigate = useNavigate()
    const [directions, setDirections] = useState([])

    const fetchСategory = async () => {
        try {
            const { data } = await axios.get('/api/category/all-category')

            if (data.success) {
                setDirections(data.reports)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchСategory();
    }, []);

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
                    text="Обери свій шлях в 162 ОМБр"
                    color="black"
                />
                <SubTitle
                    text="Оберіть спеціальність, що відповідає вашим навичкам. Кожен напрямок — важлива частина оборонної спроможності України."
                    color='primary'
                />
            </motion.div>
            {/* directions */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 items-stretch'>
                {
                    directions.slice(0, 6).map((direction, index) => (
                        <motion.div
                            key={direction._id}
                            className="h-full"
                            initial={{ opacity: 0, scale: 1 }}
                            whileInView={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}>
                            <DirectionCard direction={direction} />
                        </motion.div>
                    ))
                }
            </motion.div>
            {/* button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                onClick={() => { navigate("/positions"); scrollTo(0, 0) }}
                className='flex items-center justify-center gap-2 px-6 py-3 border border-borderColor mt-18 cursor-pointer rounded-xl bg-accent-yellow text-black font-semibold shadow-md hover:bg-accent-yellow/80'>
                Ще більше пропозицій <img src={assets.arrow_icon} alt="arrow" className='w-4' />
            </motion.button>
        </motion.div>
    )
}

export default DirectionsOfService