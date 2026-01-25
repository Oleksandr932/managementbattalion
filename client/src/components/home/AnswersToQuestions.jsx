import React from 'react'
import { faqData } from '../../assets/assets'
import { motion } from 'motion/react'
import { MoreButton } from '../helpers/MoreButton'
import QuestionsCard from './QuestionsCard'
import { Title } from '../helpers/Title'
import { SubTitle } from '../helpers/SubTitle'

const AnswersToQuestions = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32'>
            {/* title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}>
                <Title
                    text="Відповіді на поширені запитання"
                    color="black"
                />
                <SubTitle
                    text="Ми зібрали найпоширеніші запитання, щоб допомогти вам зрозуміти процес служби та подачі заявки."
                    color='primary'
                />
            </motion.div>
            {/* steps */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='grid grid-cols-1 gap-6 mt-8'>
                {
                    faqData.map((data, index) => (
                        <motion.div key={data._id + index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}>
                            <QuestionsCard data={data} />
                        </motion.div>
                    ))
                }
            </motion.div>
            {/* button */}
            <MoreButton />
        </motion.div>
    )
}

export default AnswersToQuestions