import React, { useState } from 'react'
import { Title } from '../components/helpers/Title'
import { SubTitle } from '../components/helpers/SubTitle'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const ForFamilies = () => {
  const [open, setOpen] = useState(false);
  const [facebook, setFacebook] = useState(false);
  return (
    <div className='reletive w-full bg-sand-500/20'>

      <img src={assets.family} alt="volonteers" className='w-full h-auto lg:h-screen object-cover' />

      <div className="pt-24"></div>

      <div className='bg-sand-500/20 px-6 md:px-16 lg:px-24 xl:px-32'>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}>
          <Title
            text="Підтримка для сімей військових"
            color="black"
          />
          <SubTitle
            text="Сім’ї захисників — це надійний тил нашої армії. Ми зібрали корисні матеріали, контакти служб підтримки та роз’яснення ключових процедур, щоб допомогти вам отримати необхідну інформацію та підтримку в будь-якій життєвій ситуації."
            color='primary'
          />
        </motion.div>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='md:flex md:flex-row-reverse justify-center mt-8 gap-4 max-md:rounded-2xl max-md:overflow-hidden max-md:mx-3'>
          <button className='mt-8 px-6 py-4 text-lg text-white bg-primary/80 hover:bg-primary mb-2 max-sm:w-full md:mx-2 text-center max-md:rounded-2xl md:text-2xl md:rounded-md md:px-10 md:py-6 hover:scale-105 transition-all duration-300' onClick={() => setFacebook(!open)}>
            Чат родин
          </button>
          <button className='mt-8 px-6 py-4 text-lg text-white bg-primary/80 hover:bg-primary mb-2 max-sm:w-full md:mx-2 text-center max-md:rounded-2xl md:text-2xl md:rounded-md md:px-10 md:py-6 hover:scale-105 transition-all duration-300'
            onClick={() => setOpen(!open)}>
            Отримати консультацію
          </button>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="border border-borderColor rounded-xl bg-white shadow-sm transition mt-4">
          <div className='px-2 py-2'>
            <p className='font-semibold'>Підтримка та допомога для родин захисників</p>
            <br />
            <p>Служба у війську — це не лише відповідальність військовослужбовця, але й щоденні виклики для його родини. Наш портал створено для того, щоб допомогти сім’ям отримувати своєчасну і достовірну інформацію, знаходити підтримку та швидко вирішувати питання, які можуть виникати під час служби близької людини.</p>
            <br />
            <p>На цій сторінці ми зібрали найбільш корисні матеріали та контакти, які можуть знадобитися кожній родині військовослужбовця — як мобілізованого, так і контрактника.</p>
            <br />
            <div className='w-full py-[0.5px] bg-primary'></div>
            <br />
            <p className='font-semibold'>Що ви знайдете на цій сторінці</p>
            <br />
            <p>1. Канали оперативного зв’язку</p>
            <p>Якщо вам необхідна консультація або індивідуальна відповідь — наші фахівці готові допомогти.
              Ви можете:</p>
            <p>- написати в Facebook-спільноту для родин;</p>
            <p>- перейти на Telegram-чат для отримання оновлень;</p>
            <p>- швидко зателефонувати за номером підтримки.</p>
            <p>Ми працюємо для того, щоб кожна сім’я мала можливість отримати реальну допомогу, а не залишатися наодинці зі своїми питаннями.</p>
            <br />
            <div className='w-full py-[0.5px] bg-primary'></div>
            <br />
            <p>2. Права та соціальні гарантії родин військових</p>
            <p>Ми регулярно оновлюємо інформацію про:</p>
            <p>- державні виплати та компенсації;</p>
            <p>- соціальні гарантії для членів сімей;</p>
            <p>- медичне забезпечення та реабілітаційні програми;</p>
            <p>- права дружин, чоловіків та дітей військовослужбовців;</p>
            <p>- допомогу у випадках поранення чи загибелі захисника.</p>
            <p>Усі матеріали — офіційні, перевірені та адаптовані зрозумілою мовою.</p>
            <br />
            <div className='w-full py-[0.5px] bg-primary'></div>
            <br />
            <p>3. Поради для родин під час служби близької людини</p>
            <p>Ми підготували практичні рекомендації, які допоможуть:</p>
            <p>- підтримувати зв’язок із військовослужбовцем;</p>
            <p>- правильно передавати речі, листи та посилки;</p>
            <p>- взаємодіяти з підрозділом та відповідальними особами;</p>
            <p>- легше адаптуватися до змін у побуті та сімейному житті.</p>
            <p>Ці матеріали створені на основі досвіду родин, які вже мають шлях служби за плечима.</p>
            <br />
            <div className='w-full py-[0.5px] bg-primary'></div>
            <br />
            <p>4. Допомога у кризових ситуаціях</p>
            <p>Якщо ви зіткнулися зі складністю — втратою зв’язку, непорозуміннями або стресовими станами — ви не самі.</p>
            <p>На сайті, Facebook та Telegram зібрано контакти:</p>
            <p>- служб психологічної підтримки;</p>
            <p>- гарячих ліній Міноборони та ТЦК;</p>
            <p>- незалежних волонтерських організацій, які працюють із родинами військових.</p>
            <br />
            <div className='w-full py-[0.5px] bg-primary'></div>
            <br />
            <p className='font-semibold'>Ми поруч. Завжди.</p>
            <br />
            <p>«Сайт 162-ОМБр» створено для того, щоб кожна родина військовослужбовця почувалася захищеною та проінформованою.</p>
            <p>Ваші питання — важливі. Ваш голос — почутий.</p>
            <p>Ми працюємо, щоб надати вам підтримку на кожному етапі служби вашого близького.</p>
            <br />
          </div>
        </motion.div>
      </div>

      {/* Coll and Telegram */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 
        opacity-100 animate-fadeIn">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100 animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">
                Швидкий звʼязок
              </h3>

              <button className="text-xl font-semibold text-center mb-4 text-gray-900 hover:text-gray-600 cursor-pointer"
                onClick={() => setOpen(!open)}>X</button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Telegram button */}
              <a href="https://t.me/zsuwar" target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white  transition-all duration-300 shadow-md hover:shadow-lg">
                Перейти в Telegram
              </a>

              {/* Call button */}
              <a href="tel:+3380687323736"
                className="w-full text-center py-3 rounded-xl font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Подзвонити
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Facebook */}
      {facebook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 
        opacity-100 animate-fadeIn">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100 animate-scaleIn">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">
                Наш Facebook
              </h3>

              <button className="text-xl font-semibold text-center mb-4 text-gray-900 hover:text-gray-600 cursor-pointer"
                onClick={() => setFacebook(!facebook)}>X</button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Facebook button */}
              <a href="https://www.facebook.com/AFUkraine/" target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white  transition-all duration-300 shadow-md hover:shadow-lg">
                Перейти в Facebook
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ForFamilies