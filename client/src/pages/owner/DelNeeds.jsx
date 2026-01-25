import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const DelNeeds = () => {
    const { axios } = useAppContext()
    const [needsData, setNeedsData] = useState([{
      category: '',
      items: []
    }]);

    const fetchNeed = async () => {
        try {
            const { data } = await axios.get('/api/needs/all-needs')

            if (data.success) {
                setNeedsData(data.needs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const deleteNeeds = async (id) => {
        try {
            const { data } = await axios.delete(`/api/needs/delete-needs/${id}`)
            if (data.success) {
                toast.success(data.message)
                fetchNeed()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchNeed();
    }, []);

    return (
        <div className='mt-8 mx-3 md:mx-2'>
            {/* Title */}
            <Title title='Видаліть перелік потреб' subtitle='Будь ласка, видаліть перелік потреб, який ви хочете.' />
            {/* Needs list */}
            <div className='mt-8 grid gap-6 max-w-4xl'>
                {needsData.map((need, index) => (
                    <div
                        key={index}
                        className='bg-white p-6 rounded-xl shadow-md border border-borderColor flex flex-col md:flex-row items-start md:items-center gap-6'>

                        <div className='flex-1'>
                            <p className='text-lg font-semibold text-primary'>{need.category}</p>
                            {need.items.map((item, index) => (
                                <p className='text-sm text-gray-600 mt-2' key={index + "item"}>- {item}</p>
                            ))}
                        </div>

                        <button
                            onClick={() => deleteNeeds(need._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all'>
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default DelNeeds