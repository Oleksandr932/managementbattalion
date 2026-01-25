import React, { useState } from 'react'
import { Title } from '../components/helpers/Title'
import { SubTitle } from '../components/helpers/SubTitle'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react'

const Volunteers = () => {
  const { axios } = useAppContext()
  const [opened, setOpened] = useState(false);
  
  const [reportsData, setReportsData] = useState([{
    title: '',
    description: '',
    image: ''
  }]);
  const [needsData, setNeedsData] = useState([{
    category: '',
    items: [],
  }]);

  const fetchNeed = async () => {
    try {
      const { data } = await axios.get('/api/needs/all-needs')

      if (data.success) {
        setNeedsData(data.needs)
      } else {
        consol.error(data.message)
      }
    } catch (error) {
      consol.error(error.message)
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.get('/api/reports/all-reports')

      if (data.success) {
        setReportsData(data.reports)
      } else {
        consol.error(data.message)
      }
    } catch (error) {
      consol.error(error.message)
    }
  };

  useEffect(() => {
    fetchNeed();
    fetchReports();
  }, []);

  return (
    <div className='reletive w-full bg-sand-500/20'>

      <img src={assets.volunteers} alt="volonteers" className='w-full h-auto lg:h-screen object-cover' />

      <div className="pt-24"></div>

      <div className='bg-sand-500/20 px-6 md:px-16 lg:px-24 xl:px-32'>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}>
          <Title
            text="Підтримайте захисників — станьте частиною волонтерського руху"
            color="black"
          />
          <SubTitle
            text="Волонтери відіграють ключову роль у зміцненні обороноздатності та підтримці військових підрозділів. Долучайтеся до ініціатив, які допомагають забезпечувати бійців необхідним спорядженням, технікою та ресурсами — разом ми наближаємо перемогу."
            color='primary'
          />
        </motion.div>
        {/* button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='md:flex justify-center mt-8 gap-4 max-md:rounded-2xl max-md:overflow-hidden max-md:mx-3'>
          <button onClick={() => setOpened(false)}
            className='px-6 py-4 text-lg text-white bg-linear-to-r from-army-900 to-army-800 mb-2 max-sm:w-full md:mx-2 text-center max-md:rounded-2xl md:text-2xl md:rounded-md md:px-10 md:py-6 hover:scale-105 transition-all duration-300'>
            Потреби
          </button>
          <button onClick={() => setOpened(true)}
            className='px-6 py-4 text-lg text-white bg-linear-to-l from-army-900 to-army-800 mb-2 max-sm:w-full md:mx-2 text-center max-md:rounded-2xl md:text-2xl md:rounded-md md:px-10 md:py-6 hover:scale-105 transition-all duration-300'>
            Звітність
          </button>
        </motion.div>

        {/* Needs */}
        {!opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='mt-8 mx-3 md:mx-2'>
            {/* Title */}
            <SubTitle
              text="Поточні потреби"
              color="black"
            />
            {/* Description */}
            <p className='mt-4 text-center text-lg md:text-xl text-black'>
              Наші захисники потребують вашої допомоги у забезпеченні їх необхідним спорядженням та ресурсами. Ось деякі з найактуальніших потреб:
            </p>
            <div className='mt-4 grid gap-4 mx-4'>
              {needsData.map((need, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="flex flex-col items-start gap-6 bg-white p-6 rounded-xl shadow-md" key={index + "need"} >
                  <p className='text-lg font-semibold text-primary'>{need.category}</p>
                  {need.items.map((item, idx) => (
                    <div key={idx} className='flex flex-col gap-2 px-2 lg:px-6'>
                      <p className='text-sm text-black'>- {item}</p>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Reports */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='mt-8 mx-3 md:mx-2'>
            {/* Title */}
            <SubTitle
              text="Звітність волонтерських ініціатив"
              color="black"
            />
            {/* Description */}
            <p className='mt-4 text-center text-lg md:text-xl text-black'>
              Ми прагнемо бути прозорими у всьому, що робимо. Ось деякі з наших останніх звітів про волонтерські ініціативи:
            </p>
            <div className='mt-4 grid gap-4 mx-4'>
              {reportsData.map((report, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-xl shadow-md"
                  key={index + "report"} >
                  <div>
                    <img src={report.image} alt={report.title} className="min-w-70 max-w-70 h-auto object-cover rounded-lg shadow-sm" />
                  </div>
                  <div>
                    <p className='text-lg font-semibold text-primary'>{report.title}</p>
                    <p className='text-sm text-black pt-2'>{report.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Volunteers