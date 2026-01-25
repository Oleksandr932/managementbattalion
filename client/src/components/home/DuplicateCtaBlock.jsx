import React from 'react'
import { HeroButtons } from '../helpers/HeroButtons'

const DuplicateCtaBlock = () => {
    return (
        <div className="
            shadow-xl  rounded-2xl  overflow-hidden  transition-all  duration-500  bg-primary   px-6 py-10  md:px-12 md:py-14 lg:px-16 lg:py-16 mx-6 md:mx-16 lg:mx-24 xl:mx-32 flex flex-col lg:flex-row  items-center lg:items-center  justify-between  gap-8 lg:gap-12">
            
            {/* title */}
            <h3 className=" text-white font-semibold  text-2xl leading-snug text-center  lg:text-left  max-w-2xl">
                Зроби свій крок сьогодні — приєднуйся до нашої команди 
                та стань частиною великої місії!
            </h3>

            {/* buttons */}
            <div className="flex justify-center lg:justify-end">
                <HeroButtons />
            </div>

        </div>
    )
}

export default DuplicateCtaBlock
