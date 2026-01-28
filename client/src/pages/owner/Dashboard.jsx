import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { axios } = useAppContext()
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalNeeds, setTotalNeeds] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  const dashbordCards = [
    { title: "Розміщено вакансіій", value: totalJobs },
    { title: "Розміщено потреб", value: totalNeeds },
    { title: "Розміщено звітів", value: totalReports },
  ]

  const fetchJob = async () => {
    try {
      const { data } = await axios.get('/api/job/all-job')

      if (data.success) {
        setTotalJobs(data.jobs.length)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const fetchNeed = async () => {
    try {
      const { data } = await axios.get('/api/needs/all-needs')

      if (data.success) {
        setTotalNeeds(data.needs.length)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.get('/api/reports/all-reports')

      if (data.success) {
        setTotalReports(data.reports.length)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchJob()
    fetchNeed()
    fetchСategory()
    fetchReports()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      {/* title */}
      <Title title='Admin Dashboard' subtitle='Відстежуйте загальну статистику' />
      {/* cards */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 max-w-3xl'>
        {dashbordCards.map((card, index) => (
          <div key={index + 'cardDashboard'} className='flex gap-2 items-center
                    justify-between rounded-md border border-borderColor p-4'>
            <div>
              <h1 className='text-sm text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard