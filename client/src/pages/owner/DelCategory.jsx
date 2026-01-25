import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const DelCategory = () => {
    const { axios } = useAppContext()
    const [categoryData, setСategoryData] = useState([]);

    const fetchСategory = async () => {
        try {
            const { data } = await axios.get('/api/category/all-category')

            if (data.success) {
                setСategoryData(data.reports)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const deleteСategory = async (id) => {
        try {
            const { data } = await axios.delete(`/api/category/delete-category/${id}`)
            if (data.success) {
                toast.success(data.message)
                fetchСategory()
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
        <div className='px-4 py-10 md:px-10 flex-1'>
            {/* Title */}
            <Title title='Видаліть категорію' subtitle='Будь ласка, видаліть категорію, яку ви хочете.' />

            {/* Сategory list */}
            <div className='mt-8 grid gap-6 max-w-4xl'>
                {categoryData.map((сategory) => (
                    <div
                        key={сategory._id}
                        className='bg-white p-6 rounded-xl shadow-md border border-borderColor flex flex-col md:flex-row items-start md:items-center gap-6'>
                        <img
                            src={сategory.href}
                            alt={сategory.title}
                            className='min-w-40 max-w-40 h-40 object-cover rounded-lg shadow-sm border border-borderColor'
                        />

                        <div className='flex-1'>
                            <p className='text-lg font-semibold text-primary'>{сategory.title}</p>
                            <p className='text-sm text-gray-600 mt-2'>{сategory.description}</p>
                        </div>

                        <button
                            onClick={() => deleteСategory(сategory._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all'>
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DelCategory
