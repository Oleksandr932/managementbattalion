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

  const fetchСategory = async () => {
    try {
      const { data } = await axios.get('/api/category/all-category')

      if (data.success) {
        setСategoryData(data.reports)
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  useEffect(() => {
    fetchJob();
    fetchСategory();
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
            text="Актуальні вакансії для служби в Збройних Силах - в 162 ОМБр"
            color="black"
          />
          <SubTitle
            text="Обирайте напрямок, який відповідає вашим навичкам та мотивації. Офіційна інформація, прозорі умови та підтримка на кожному етапі оформлення."
            color='primary'
          />
        </motion.div>

        {/* Categories lg */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-18 items-stretch'>
          {
            categoryData.map((direction, index) => (
              <motion.div
                key={direction._id}
                className="h-full"
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}>
                <div onClick={() => { dispatch(setCategory(direction._id)); setBgColor(index) }}
                  className={`overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer group rounded-xl ${bgColor === index ? 'bg-army-700' : ''}`}>
                  {/* Direction image and text on image */}
                  <div className='relative h-48 overflow-hidden'>
                    <img src={direction.href} alt="Direction" className='w-full object-cover transition-transform duration-500 group-hover:scale-105 h-full' />

                    {direction.isAvaliable && <p className='absolute top-4 left-4 bg-primary
                  text-white text-xs px-2.5 py-1 rounded-full'>Наразі є місця</p>}
                  </div>
                  {/* direction details */}
                  <div className='p-4 sm:p-5'>
                    <h3 className='text-lg font-medium'>{direction.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </motion.div>

        {/* Categories sm */}
        <div className="relative md:hidden mt-8">
          <select value={categoryName || ""}
            onChange={(e) => dispatch(setCategory(e.target.value === "" ? null : e.target.value))}
            className=" w-full bg-white border border-borderColor text-gray-800 py-3 px-4 rounded-xl shadow-md  focus:outline-none focus:ring-2 focus:ring-primary transition-all">
            <option value="">Усі вакансії</option>

            {categoryData.map((direction) => (
              <option key={direction._id} value={direction._id}> {direction.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* button */}
      <div className='hidden md:flex justify-center'>
        <button
          className="px-6 md:px-16 lg:px-24 xl:px-32 py-3 font-semibold  text-white  rounded-xl  bg-linear-to-r from-army-900 to-army-800 shadow-lg transition-all  duration-300 hover:brightness-110  active:scale-[0.98] mt-6 mb-12" onClick={() => { dispatch(setCategory(null)); setBgColor(null) }}>
          Усі вакансії
        </button>
      </div>

      {/* Positions */}
      {
        categoryName ? (
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
          ))

        ) : (
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