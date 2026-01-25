import React from 'react'
import Heared from '../components/home/Header'
import DirectionsOfService from '../components/home/DirectionsOfService'
import BenefitsOfTheService from '../components/home/BenefitsOfTheService'
import HowToApply from '../components/home/HowToApply'
import AnswersToQuestions from '../components/home/AnswersToQuestions'
import DuplicateCtaBlock from '../components/home/DuplicateCtaBlock'
import MoreBenefits from '../components/home/MoreBenefits'

const Home = () => {
  return (
    <div className='bg-sand-500/20'>
        <Heared />
        <div className="pt-12"></div>
        <MoreBenefits />
        <div className="pt-12"></div>
        <DirectionsOfService />
        <div className="pt-24"></div>
        <HowToApply />
        <div className="pt-24"></div>
        <BenefitsOfTheService />
        <div className="pt-24"></div>
        <AnswersToQuestions />
        <div className="pt-24"></div>
        <DuplicateCtaBlock />
    </div>
  )
}

export default Home