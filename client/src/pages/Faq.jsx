import React from 'react'
import { assets, faq } from '../assets/assets'
import { Title } from '../components/helpers/Title';
import { SubTitle } from '../components/helpers/SubTitle';
import { ChevronDown } from "lucide-react";
import { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section id="faq" className="reletive w-full bg-sand-500/20">
      <img src={assets.FaqHero} alt="faq" className="w-full h-auto lg:h-screen object-cover mx-auto" />

      {/* Dark overlay for lg+ */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-screen bg-black/50"></div>

      {/* Marquee Container */}
      <div className="pt-24"></div>

      {/* Content Container */}
      <Title
        text="Часті запитання"
        color="black"
      />
      <SubTitle
        text="Ми зібрали найпоширеніші питання, щоб допомогти вам швидко зорієнтуватися
        у процесі подачі заявки та проходження служби."
        color="black"
      />

      <div className="space-y-4 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        {faq.map((int, index) => (
          <div key={index} className="border-b border-gray-300 pb-4 space-y-4">
            <SubTitle
              text={int.title}
              color="primary"
            />

            <div>
              {int.data.map((item, i) => (
                <div
                  key={i}
                  className="border border-borderColor rounded-xl bg-white shadow-sm transition mb-2">
                  <button className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => toggle(index, i)}>
                    <span className="font-medium text-gray-800 text-lg">
                      {item.questions}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === `${index}-${i}` ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === `${index}-${i}` ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-5 pb-4 text-primary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ))}
      </div>
    </section>
  );
}

export default Faq