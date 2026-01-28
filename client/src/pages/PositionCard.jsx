import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { HeroButtons } from '../components/helpers/HeroButtons'
import { useAppContext } from '../context/AppContext'

const PositionCard = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { axios } = useAppContext()
    const [jobData, setJobData] = useState({
        name: "",
        description: "",

        responsibilities: [],
        requirements: [],
        terms: [],
    });

    const fetchJob = async () => {
        try {
            const { data } = await axios.get(`/api/job/job/${id}`)

            if (data.success) {
                setJobData(data.job)
            }
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        if (!id) {
            navigate("/positions")
        }
        fetchJob()
    }, [id])

    return (
        <div className='bg-sand-500/20 cursor-pointer'>
            <div className='w-full py-8 md:py-12 bg-primary'></div>
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-6'>
                {/* button back */}
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-primery cursor-pointer'>
                    <img src={assets.arrow_icon} alt="arrow" className='rotate-180 opacity-65' />
                    Back
                </button>
                {/* Job details and form */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
                    {/* Left: Job details and image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='lg:col-span-2'>
                        <motion.img
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            src={jobData?.image} alt="jobImage"
                            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='space-y-6'>
                            <div>
                                <h1 className='text-3xl font-bold'>{jobData?.name}</h1>
                                {/* <p className='text-gray-500 text-lg'></p> */}
                            </div>
                            <hr className='border-borderColor my-6' />
                            {/* Description */}
                            <div>
                                <h1 className='text-xl font-semibold mb-3 text-primary'>Огляд</h1>
                                <p className='text-gray-500'>{jobData?.description}</p>
                            </div>
                            {/* Responsibilities */}
                            <div>
                                <h1 className='text-xl font-semibold mb-3 text-primary'>Обов'язки</h1>
                                {jobData?.responsibilities.map((resp, index) => (
                                    <p key={index + "resp"} className='text-gray-500 mb-2'>- {resp}</p>
                                ))}
                            </div>
                            {/* Requirements */}
                            <div>
                                <h1 className='text-xl font-semibold mb-3 text-primary'>Вимоги</h1>
                                {jobData?.requirements.map((req, index) => (
                                    <p key={index + "req"} className='text-gray-500 mb-2'>- {req}</p>
                                ))}
                            </div>
                            {/* Terms */}
                            <div>
                                <h1 className='text-xl font-semibold mb-3 text-primary'>Умови</h1>
                                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                    {jobData?.terms.map((term, index) => (<li key={index + "features"} className='flex items-center text-gray-500 gap-2'>
                                        <img src={assets.check_icon} alt="check" className='h-5' /> <p>{term}</p></li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Job form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>

                        <div className='flex flex-col items-center'>
                            <img src={assets.hevron} alt="hevron" />
                            <HeroButtons />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default PositionCard