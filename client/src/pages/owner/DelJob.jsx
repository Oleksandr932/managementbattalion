import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DelJob = () => {
    const { axios } = useAppContext()
    const [jobData, setJobData] = useState([]);
    const navigate = useNavigate();

    const fetchJob = async () => {
        try {
            const { data } = await axios.get('/api/job/all-job')

            if (data.success) {
                setJobData(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const deleteReport = async (id) => {
        try {
            const { data } = await axios.delete(`/api/job/delete-job/${id}`)
            if (data.success) {
                toast.success(data.message)
                fetchJob()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            {/* Title */}
            <Title title='Видаліть вакансію' subtitle='Будь ласка, видаліть вакансію, який ви хочете.' />

            {/* Reports list */}
            <div className='mt-8 grid gap-6 max-w-4xl'>
                {jobData.map((job) => (
                    <div
                        key={job._id}
                        className='bg-white p-6 rounded-xl shadow-md border border-borderColor flex flex-col md:flex-row items-start md:items-center gap-6'>
                        <img
                            src={job.image}
                            alt={job.name}
                            className='min-w-40 max-w-40 h-40 object-cover rounded-lg shadow-sm border border-borderColor'
                        />

                        <div className='flex-1'>
                            <p className='text-lg font-semibold text-primary'>{job.name}</p>
                            <p className='text-sm text-gray-600 mt-2'>{job.description}</p>
                        </div>

                        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-3'>
                            <button
                                onClick={() => navigate(`/owner/updateJob/${job._id}`)}
                                className='bg-primary/60 hover:bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all'>
                                Змінити
                            </button>
                            <button
                                onClick={() => deleteReport(job._id)}
                                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all'>
                                Видалити
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DelJob
