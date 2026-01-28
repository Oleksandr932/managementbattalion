import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Title } from '../components/helpers/Title'
import { SubTitle } from '../components/helpers/SubTitle'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../store/categorySlice'
import { useAppContext } from '../context/AppContext'

const Positions = () => {
  const [bgColor, setBgColor] = useState()
  const { axios } = useAppContext()
  const [positionsJob, setPositionsJob] = useState([])
  const [categoryData, setСategoryData] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const categoryName = useSelector((state) => state.category.categoryName);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get('/api/job/all-job')

      if (data.success) {
        setPositionsJob(data.jobs)
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className='reletive w-full bg-sand-500/20'>

      <img src={assets.positions} alt="positions" className='w-full h-auto lg:h-screen object-cover' />

      <div className="pt-24"></div>

      <div className='bg-sand-500/20 px-6 md:px-16 lg:px-24 xl:px-32'>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}>
          <Title
            text="Актуальні вакансії для служби в Батальйоні управління 162 окремої механізованої бригади"
            color="black"
          />
          <SubTitle
            text="Обирайте напрямок, який відповідає вашим навичкам та мотивації. Офіційна інформація, прозорі умови та підтримка на кожному етапі оформлення."
            color='primary'
          />
        </motion.div>
      </div>

      {/* Positions */}
      {categoryName ? (
          positionsJob.filter(position => position.category === categoryName).map((position) => (
            <div key={position._id} className='bg-sand-500/20 px-6 md:px-16 lg:px-24 xl:px-32 mt-12 mb-24'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-xl shadow-md "
                onClick={() => { navigate(`/position/${position._id}`); scrollTo(0, 0) }}>

                <img src={position.image} alt="" className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                <div className="flex-1">
                  <SubTitle
                    text={position.name}
                    color='primary'
                  />
                  <p className='text-black mt-4 mb-6 cursor-pointer'>{position.description}</p>
                </div>
              </motion.div>
            </div>
          ))) : (
          positionsJob.map((position, index) => (
            <div key={position._id} className='bg-sand-500/20 px-6 md:px-16 lg:px-24 xl:px-32 mt-12 mb-24'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-xl shadow-md"
                onClick={() => { navigate(`/position/${position._id}`); scrollTo(0, 0) }}>

                <img src={position.image} alt="" className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                <div className="flex-1">
                  <SubTitle
                    text={position.name}
                    color='primary'
                  />
                  <p className='text-black mt-4 mb-6'>{position.description}</p>
                </div>
              </motion.div>
            </div>
          ))

        )
      }

    </motion.div >
  )
}

export default Positions