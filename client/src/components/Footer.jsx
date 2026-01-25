import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-army-900 text-gray-300 py-12 border-t border-army-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакти</h3>
            <p className="text-sm mb-2">Рекрутинговий центр 162 ОМБр</p>
            <p className="text-sm mb-2">Телефон: <span className="text-white">+380 68 732 37 36</span></p>
            <p className="text-sm mb-2">Email: <span className="text-white">recruiterombr@gmail.com</span></p>
            <p className="text-sm">Графік роботи: Пн–Пт, 09:00–18:00</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Навігація</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/positions'); scrollTo(0, 0) }}>
                  Вакансії
                </button>
              </li>
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/volunteers'); scrollTo(0, 0) }}>
                  Волонтерам
                </button>
              </li>
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/forFamilies'); scrollTo(0, 0) }}>
                  Для сімей
                </button>
              </li>
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/faq'); scrollTo(0, 0) }}>
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Соціальні мережі</h3>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/AFUkraine/" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <img src={assets.facebook} alt="facebook" className='w-10 h-10 invert' />
              </a>

              <a href="https://www.instagram.com/uaf_general_staff/" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <img src={assets.instagram} alt="instagram" className='w-10 h-10 invert' />
              </a>

              <a href="https://t.me/zsuwar" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <img src={assets.telegram} alt="telegram" className='w-10 h-10 invert' />
              </a>

            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Юридична інформація</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/privacyPolicy'); scrollTo(0, 0) }}>
                  Політика конфіденційності
                </button>
              </li>
              <li>
                <button className="hover:text-white transition" onClick={() => { navigate('/processingData'); scrollTo(0, 0) }}>
                  Обробка персональних даних
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} 162 Окрема Механізована Бригада. Всі права захищено.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
