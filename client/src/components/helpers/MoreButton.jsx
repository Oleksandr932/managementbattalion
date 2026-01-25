import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

export const MoreButton = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            {/* Другорядна кнопка */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}

                onClick={() => { navigate('/faq'); scrollTo(0, 0) }}
                className="w-full md:w-auto px-8 py-3 rounded-xl font-medium border border-gray-700 text-gray-800 bg-white/80 backdrop-blur-sm hover:bg-gray-100 active:bg-gray-200 transition">
                Дізнатися більше
            </motion.button>
        </div>
    )
}
