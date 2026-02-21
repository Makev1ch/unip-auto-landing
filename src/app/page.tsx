'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Image from 'next/image'

// Colors
const colors = {
  background: '#2F2F2F',
  accent: '#4F735C',
  text: '#F2EDE7',
  dark: '#1a1a1a',
}

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

// SVG Icons
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" style={{ opacity: 0.15 }}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
)

// 2GIS Logo
const GISLogo = () => (
  <div className="bg-white rounded-xl p-2">
    <Image src="/2gis-seeklogo.png" alt="2ГИС" width={120} height={32} className="h-8 w-auto" />
  </div>
)

// Phone number
const PHONE_DISPLAY = '+7 (908) 658-56-85'
const PHONE_RAW = '+79086585685'

const ADDRESS_CITY = 'г. Иркутск'
const ADDRESS_STREET = '2-я Горьковская, 35'
const ADDRESS_FULL = `${ADDRESS_CITY}, ${ADDRESS_STREET}`

const TELEGRAM_URL = 'https://t.me/+79500787977#'

// Services
const services = [
  'Компьютерная диагностика',
  'Замена узлов и агрегатов',
  'Ремонт подвески',
  'Ремонт ДВС',
  'Шиномонтаж',
  'Сварочные работы',
  'Слесарные работы',
]

type Review = {
  text: string
  author: string
  avatar: string
  date?: string
}

const reviews: Review[] = [
  {
    text: 'Ребята молодцы, профессионалы своего дела!',
    author: 'Людмила О.',
    avatar: 'Л',
    date: '31 января 2026',
  },
  {
    text: 'Заехал чисто случайно. Перед развалом надо было заменить два сайлентблока. Зашёл, спросил — не отказали, сделали быстро и качественно. Жаль только, что у ребят нет развала. Там, где делал развал, спросил, как сделали — всё отлично. Советую.',
    author: 'Ден Лисичкин',
    avatar: 'Д',
    date: '22 января 2026',
  },
  {
    text: 'Добрый день всем, особенно команде автомехаников, работающих в автосервисе Unip Auto, за добросовестное, своевременное, бюджетное и не менее качественное обслуживание. Ребята работают профессионально, разъясняют все проблемы и нюансы по ремонту авто, мастера работают быстро и чётко со знанием своего дела. В целом очень доволен обслуживанием своего авто и желаю продолжать в том же духе.',
    author: 'Андрей Колмаков',
    avatar: 'А',
    date: '23 января 2026',
  },
  {
    text: 'Сервис отличный. Менял передний бампер. Работа была выполнена за время, оговорённое при приёмке машины в работу. Замена выполнена без нареканий и качественно. Ребята действительно знают своё дело — всё объяснили, показали, что и как делали. Цены адекватные, лишнего не навязывают. Большое спасибо мастерам за профессионализм и человеческое отношение. Однозначно рекомендую этот сервис всем знакомым.',
    author: 'Михаил П.',
    avatar: 'М',
  },
]

const useReviews = () => {
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({})

  const toggleReview = (index: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return { expandedReviews, toggleReview }
}

const advantages = [
  { title: "Точная диагностика", description: "Покажем, что именно нужно делать и почему. Никаких лишних работ и догадок." },
  { title: "Цена фиксируется до начала", description: "Никаких сюрпризов. Итог согласуем заранее — сумма не меняется в процессе ремонта." },
  { title: "Без навязывания", description: "Рекомендуем только то, что реально нужно для безопасности и ресурса автомобиля." },
  { title: "Удобная запись", description: "Запишем по телефону или в Telegram — как вам удобно." },
]

const FEATURED_PREVIEW_LIMIT = 260
const GRID_PREVIEW_LIMIT = 150

const getReviewPreview = (text: string, limit: number) => {
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trimEnd()}...`
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [copiedLocation, setCopiedLocation] = useState<string | null>(null)
  const { expandedReviews, toggleReview } = useReviews()
  
  const primaryReviews = reviews.slice(0, 3)
  const featuredReview = reviews[3] || reviews[0] || null

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      setTimeout(() => {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
    
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }, 300)
    }
  }

  const copyToClipboard = async (text: string, location: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLocation(location)
      setTimeout(() => setCopiedLocation(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}
        style={{ backgroundColor: isScrolled ? 'rgba(47, 47, 47, 0.98)' : 'rgba(47, 47, 47, 0.8)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 relative rounded-xl overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="UNIP AUTO логотип"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-wider" style={{ color: colors.text }}>UNIP AUTO</span>
                <span className="text-[10px] tracking-[0.2em]" style={{ color: colors.text, opacity: 0.7 }}>ИРКУТСК</span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Услуги', id: 'services' },
                { label: 'Преимущества', id: 'advantages' },
                { label: 'Контакты', id: 'contacts' },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm tracking-wider uppercase transition-colors group font-medium"
                  style={{ color: colors.text }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full" style={{ backgroundColor: colors.accent }} />
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(PHONE_RAW, 'nav')}
                className="px-6 py-3 font-bold text-sm tracking-wider uppercase rounded-xl"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                <span className="block min-w-[150px] text-center">
                  {copiedLocation === 'nav' ? 'Скопировано!' : 'Позвонить'}
                </span>
              </motion.button>
            </div>

            <button className="md:hidden p-2" style={{ color: colors.text }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ backgroundColor: colors.background }}
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { label: 'Услуги', id: 'services' },
                  { label: 'Преимущества', id: 'advantages' },
                  { label: 'Контакты', id: 'contacts' },
                ].map((item) => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left py-3 text-sm tracking-wider uppercase font-medium relative z-50 cursor-pointer" style={{ color: colors.text }}>
                    {item.label}
                  </button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    copyToClipboard(PHONE_RAW, 'nav-mobile')
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-center px-6 py-3 font-bold text-sm tracking-wider uppercase mt-4 rounded-xl"
                  style={{ backgroundColor: colors.accent, color: colors.text }}
                >
                  <span className="block min-w-[150px] mx-auto">
                    {copiedLocation === 'nav-mobile' ? 'Скопировано!' : 'Позвонить'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1659441912375-e7b78eecaabc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47, 47, 47, 0.95) 0%, rgba(47, 47, 47, 0.5) 50%, rgba(47, 47, 47, 0.3) 100%)' }} />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32">
          <div className="flex justify-end">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.div variants={fadeInUp} className="h-1 w-32 mb-6 rounded-full" style={{ backgroundColor: colors.accent }} />
              <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2" style={{ color: colors.text, opacity: 0.9 }}>
                Автосервис в Иркутске
              </motion.h2>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight mb-6" style={{ color: colors.text }}>
                Вернём вашу машину на дорогу быстро и надёжно
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg mb-8" style={{ color: colors.text, opacity: 0.8 }}>
                Ремонт ходовой и подвески. Честная диагностика. Цена фиксируется до начала работ.
              </motion.p>
              
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(79, 115, 92, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(PHONE_RAW, 'hero')}
                className="px-8 py-4 font-bold text-lg tracking-wider uppercase rounded-xl"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                <span className="block min-w-[170px] text-center">
                  {copiedLocation === 'hero' ? 'Скопировано!' : 'Позвонить'}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ПРОБЛЕМА → РЕШЕНИЕ */}
      <section id="problem" className="py-24" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="h-1 w-24 mb-6 rounded-full" style={{ backgroundColor: colors.accent }} />
              <motion.h3 variants={fadeInUp} className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colors.text, opacity: 0.8 }}>
                Знакомо?
              </motion.h3>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-8" style={{ color: colors.text }}>
                СТУЧИТ<br/>
                <span style={{ color: colors.accent }}>ПОДВЕСКА?</span>
              </motion.h2>
              
              <motion.div variants={staggerContainer} className="space-y-4 mb-8">
                {[
                  'Стук или скрип при езде по неровностям',
                  'Машина "ведёт" в сторону на прямой',
                  'Вибрация на руле при разгоне',
                  'Увеличился тормозной путь',
                ].map((problem, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.accent }} />
                    <p className="text-lg" style={{ color: colors.text, opacity: 0.9 }}>{problem}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="p-6 rounded-2xl" 
                style={{ backgroundColor: colors.dark, borderLeft: `4px solid ${colors.accent}` }}
              >
                <p className="font-bold text-lg mb-2" style={{ color: colors.accent }}>
                  Если не решить проблему вовремя:
                </p>
                <p style={{ color: colors.text, opacity: 0.8 }}>
                  Износ деталей ускоряется в 2-3 раза. То, что можно было починить за 5 000 ₽, превращается в ремонт за 30 000 ₽. А худший вариант — потеря управления на дороге.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1662663771048-9dd3bc0e5c71?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Автомобиль"
                width={1469}
                height={980}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>
          
          {/* Решение */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Мы найдём причину и устраним её без лишних ожиданий
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(PHONE_RAW, 'problem')}
              className="px-8 py-4 font-bold text-lg tracking-wider uppercase rounded-xl"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              <span className="block min-w-[170px] text-center">
                {copiedLocation === 'problem' ? 'Скопировано!' : 'Позвонить'}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="py-24" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="h-1 w-24 mb-6 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
            <motion.h3 variants={fadeInUp} className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colors.text, opacity: 0.8 }}>
              Что мы делаем
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black uppercase" style={{ color: colors.text }}>
              НАШИ УСЛУГИ
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {/* Первые 4 услуги */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.slice(0, 4).map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group relative p-6 rounded-2xl overflow-hidden"
                  style={{ backgroundColor: colors.background }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: colors.accent }} />
                  <h3 className="text-base font-semibold" style={{ color: colors.text }}>{service}</h3>
                </motion.div>
              ))}
            </div>
            
            {/* Нижние 3 услуги по центру */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
              {services.slice(4).map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group relative p-6 rounded-2xl overflow-hidden"
                  style={{ backgroundColor: colors.background }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: colors.accent }} />
                  <h3 className="text-base font-semibold" style={{ color: colors.text }}>{service}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="advantages" className="py-24" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="h-1 w-24 mb-6 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
            <motion.h3 variants={fadeInUp} className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colors.text, opacity: 0.8 }}>
              Почему выбирают нас
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black uppercase" style={{ color: colors.text }}>
              4 ПРИЧИНЫ
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-8 rounded-2xl cursor-pointer"
                style={{ backgroundColor: colors.dark }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mb-6" style={{ backgroundColor: colors.accent, color: colors.text }}>
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.text }}>{adv.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: colors.text, opacity: 0.7 }}>{adv.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(PHONE_RAW, 'advantages')}
              className="px-8 py-4 font-bold text-lg tracking-wider uppercase rounded-xl"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              <span className="block min-w-[170px] text-center">
                {copiedLocation === 'advantages' ? 'Скопировано!' : 'Позвонить'}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="py-24" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="h-1 w-24 mb-6 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
            <motion.h3 variants={fadeInUp} className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colors.text, opacity: 0.8 }}>
              Отзывы
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black uppercase leading-tight" style={{ color: colors.text }}>
              НАШИХ КЛИЕНТОВ
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mt-6">
              <GISLogo />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5" style={{ color: '#FFB800' }}>
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                  <span className="text-xl font-bold" style={{ color: colors.text }}>5.0</span>
                </div>
                <span className="text-sm" style={{ color: colors.text, opacity: 0.6 }}>Отзывы на 2ГИС</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            {primaryReviews.map((review, index) => {
              const isExpanded = !!expandedReviews[index]
              const showButton = review.text.length > GRID_PREVIEW_LIMIT
              const text = isExpanded ? review.text : getReviewPreview(review.text, GRID_PREVIEW_LIMIT)

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl relative overflow-hidden flex flex-col h-full"
                  style={{ backgroundColor: colors.background }}
                >
                  <div className="absolute top-4 right-4" style={{ color: colors.accent }}><QuoteIcon /></div>
                  <div className="flex gap-0.5 mb-5" style={{ color: '#FFB800' }}>
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                  <p className="mb-4 leading-relaxed text-lg flex-grow" style={{ color: colors.text }}>&quot;{text}&quot;</p>
                  
                  {showButton && (
                    <button
                      type="button"
                      onClick={() => toggleReview(index)}
                      className="text-sm font-semibold mb-6 text-left"
                      style={{ color: colors.accent }}
                    >
                      {isExpanded ? 'Свернуть' : 'Читать полностью'}
                    </button>
                  )}
                  
                  <div className={`flex items-center gap-3 ${!showButton ? 'mt-auto' : ''}`}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: colors.accent, color: colors.text }}>
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: colors.text }}>{review.author}</p>
                      {review.date ? (
                        <p className="text-xs" style={{ color: colors.text, opacity: 0.5 }}>{review.date}</p>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {featuredReview ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-10 rounded-2xl relative overflow-hidden max-w-4xl mx-auto"
              style={{ backgroundColor: colors.background, borderLeft: `4px solid ${colors.accent}` }}
            >
              <div className="absolute top-6 right-6" style={{ color: colors.accent }}><QuoteIcon /></div>
              <div className="flex gap-0.5 mb-5" style={{ color: '#FFB800' }}>
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p className="mb-8 leading-relaxed text-xl" style={{ color: colors.text }}>
                &quot;{featuredReview.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: colors.accent, color: colors.text }}>
                  {featuredReview.avatar}
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: colors.text }}>
                    {featuredReview.author}
                  </p>
                  {featuredReview.date ? (
                    <p className="text-sm" style={{ color: colors.text, opacity: 0.5 }}>
                      {featuredReview.date}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : null}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://2gis.ru/irkutsk/firm/70000001110382343/tab/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 font-bold text-sm tracking-wider uppercase rounded-xl"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              Все отзывы на 2ГИС
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="py-24" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black uppercase leading-tight mb-6" 
            style={{ color: colors.text }}
          >
            Готовы вернуть машину на дорогу?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg mb-8" 
            style={{ color: colors.text, opacity: 0.9 }}
          >
          Нажмите на номер, чтобы скопировать, или напишите нам в Telegram.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(PHONE_RAW, 'cta')}
              className="px-8 py-4 font-bold text-lg tracking-wider uppercase rounded-xl min-w-[280px]"
              style={{ backgroundColor: colors.text, color: colors.dark }}
            >
              <span className="block w-full">
                {copiedLocation === 'cta' ? 'Скопировано!' : PHONE_DISPLAY}
              </span>
            </motion.button>
            {TELEGRAM_URL ? (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-bold text-lg tracking-wider uppercase rounded-xl border-2"
                style={{ borderColor: colors.text, color: colors.text }}
              >
                Telegram
              </motion.a>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="h-1 w-24 mb-6 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight" style={{ color: colors.text }}>
              КОНТАКТЫ
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Адрес */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-2xl flex flex-col items-center text-center"
              style={{ backgroundColor: colors.background }}
            >
              <div className="mb-4" style={{ color: colors.accent }}><LocationIcon /></div>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: colors.text, opacity: 0.5 }}>Адрес</h3>
              <p className="text-base" style={{ color: colors.text, opacity: 0.8 }}>{ADDRESS_CITY}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(ADDRESS_FULL, 'address')}
                className="text-xl font-bold mt-1"
                style={{ color: colors.text }}
              >
                <span className="inline-block min-w-[200px] text-center">
                  {copiedLocation === 'address' ? 'Скопировано!' : ADDRESS_STREET}
                </span>
              </motion.button>
            </motion.div>

            {/* График работы */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer"
              style={{ backgroundColor: colors.background }}
            >
              <div className="mb-4" style={{ color: colors.accent }}><ClockIcon /></div>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: colors.text, opacity: 0.5 }}>Режим работы</h3>
              <p className="text-xl font-bold" style={{ color: colors.text }}>Пн — Сб</p>
              <p className="text-2xl font-black mt-1" style={{ color: colors.accent }}>9:00 — 19:00</p>
              <p className="text-xs mt-3" style={{ color: colors.text, opacity: 0.4 }}>Воскресенье — выходной</p>
            </motion.div>

            {/* Телефон */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer"
              style={{ backgroundColor: colors.background }}
            >
              <div className="mb-4" style={{ color: colors.accent }}><PhoneIcon /></div>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: colors.text, opacity: 0.5 }}>Телефон</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(PHONE_RAW, 'contacts')}
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                <span className="inline-block min-w-[200px] text-center">
                  {copiedLocation === 'contacts' ? 'Скопировано!' : PHONE_DISPLAY}
                </span>
              </motion.button>
              <div className="flex gap-4 mt-4">
                {TELEGRAM_URL ? (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc' }}
                    title="Написать в Telegram"
                  >
                    <TelegramIcon />
                  </motion.a>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center gap-3 justify-self-center md:justify-self-start">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="UNIP AUTO логотип"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold tracking-wider" style={{ color: colors.text }}>UNIP AUTO</span>
            </div>
            <p className="text-sm text-center justify-self-center" style={{ color: colors.text, opacity: 0.5 }}>
              Ремонт ходовой и подвески в Иркутске
            </p>
            <div className="justify-self-end flex flex-col items-end gap-2 w-full md:w-auto">
              <div className="flex items-center gap-4">
                {TELEGRAM_URL ? (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc' }}
                  >
                    <TelegramIcon />
                  </motion.a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-4 right-4 z-50 text-xs sm:text-sm tracking-wider uppercase"
        style={{ color: colors.text, opacity: 0.6 }}
      >
        by Makevich
      </div>
    </div>
  )
}
