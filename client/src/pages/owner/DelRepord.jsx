import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const DelRepord = () => {
    const { axios } = useAppContext()
    const [reportsData, setReportsData] = useState([]);

    const fetchReports = async () => {
        try {
            const { data } = await axios.get('/api/reports/all-reports')

            if (data.success) {
                setReportsData(data.reports)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const deleteReport = async (id) => {
        try {
            const { data } = await axios.delete(`/api/reports/delete-reports/${id}`)
            if (data.success) {
                toast.success(data.message)
                fetchReports()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            {/* Title */}
            <Title title='Видаліть звіт' subtitle='Будь ласка, видаліть звіт, який ви хочете.' />

            {/* Reports list */}
            <div className='mt-8 grid gap-6 max-w-4xl'>
                {reportsData.map((report) => (
                    <div
                        key={report._id}
                        className='flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-xl shadow-md w-full overflow-hidden'>
                        <img
                            src={report.image}
                            alt={report.title}
                            className='min-w-40 max-w-40 h-40 object-cover rounded-lg shadow-sm border border-borderColor'
                        />

                        <div className='flex-1'>
                            <p className='text-lg font-semibold text-primary'>{report.title}</p>
                            <p className='text-sm text-gray-600 mt-2'>{report.description}</p>
                        </div>

                        <button
                            onClick={() => deleteReport(report._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all'>
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DelRepord
