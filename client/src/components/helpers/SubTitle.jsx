import React from 'react'

const colorMap = {
  'red': 'lg:text-red-500',
  'blue': 'lg:text-blue-500',
  'green': 'lg:text-green-500',
  'white': 'lg:text-white',
  'black': 'lg:text-black',
  // Додайте сюди будь-які інші кольори з вашої палітри Tailwind
  'primary': 'lg:text-primary',
  'primery-dull': 'lg:text-primery-dull',
  'light': 'lg:text-light',
  'borderColor': 'lg:text-borderColor',
  'army-900': 'lg:text-army-900',
  'army-800': 'lg:text-army-800',
  'army-700': 'lg:text-army-700',
  'sand-500': 'lg:text-sand-500',
  'accent-yellow': 'lg:text-accent-yellow',
  'muted-foreground': 'lg:text-muted-foreground',
  'charcoal': 'lg:text-charcoal'
};

export const SubTitle = ({ text, color }) => {
  const lgColorClass = colorMap[color] || colorMap['white'];
  
  return (
    <div
      className={`mt-4 text-lg md:text-2xl font-extrabold leading-tight text-black text-center
      ${lgColorClass}`}>
      {text}
    </div>
  )
}
