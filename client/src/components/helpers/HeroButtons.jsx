import React from 'react'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { setForm } from '../../store/formSlice'

export const HeroButtons = () => {
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            {/* Основна кнопка */}
            <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}

                onClick={() => { dispatch(setForm(true)) }}
                className="px-8 py-3 rounded-xl bg-accent-yellow text-black font-semibold text-lg shadow-md hover:bg-accent-yellow/70 transition">
                Подати заявку
            </motion.button>
        </div>
    );
}
