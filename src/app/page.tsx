'use client';

import React, { useState } from 'react';
import LegalDisclaimer from '@/components/LegalDisclaimer';

const translations = {
  ru: {
    heading: "Metro 2039",
    subheading: "— Фан-сообщество",
    status: "Подключение активно",
    description: "Добро пожаловать в столичную подземку.",
    devStatus: "Сайт находится в разработке.",
    officialLink: "Официальный сайт игры Metro 2039",
    telegramLink: "Наш Telegram-канал",
    legalLink: "Юридическая информация",
    footer: "Из тени в свет.",
  },
  en: {
    heading: "Metro 2039",
    subheading: "— Fan Community",
    status: "Connection active",
    description: "Welcome to the capital's metro system.",
    devStatus: "Website is under development.",
    officialLink: "Official website of the game Metro 2039",
    telegramLink: "Telegram Channel (fan)",
    legalLink: "Legal Information",
    footer: "From shadow into light.",
  }
};

export default function Home() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const t = translations[lang];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 text-foreground selection:bg-metro-orange/30 font-unbounded transition-colors duration-500">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-metro-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-metro-orange/5 blur-[100px] rounded-full" />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-8 right-8 flex gap-4">
        <button 
          onClick={() => setLang('ru')}
          className={`text-xs font-bold tracking-tighter transition-all hover:text-metro-orange ${lang === 'ru' ? 'text-metro-orange' : 'text-gray-600'}`}
        >
          RU
        </button>
        <button 
          onClick={() => setLang('en')}
          className={`text-xs font-bold tracking-tighter transition-all hover:text-metro-orange ${lang === 'en' ? 'text-metro-orange' : 'text-gray-600'}`}
        >
          EN
        </button>
      </div>

      <main className="flex w-full max-w-4xl flex-col items-center text-center">
        {/* Nixie-style status indicator */}
        <div className="mb-8 flex items-center gap-2 rounded border border-metro-green/20 bg-metro-dark-gray px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-metro-orange nixie-glow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-metro-orange opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-metro-orange"></span>
          </span>
          {t.status}
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
          {t.heading}
          <span className="block text-xl font-light text-metro-green sm:inline sm:ml-4 sm:text-2xl mt-2 sm:mt-0">
            {t.subheading}
          </span>
        </h1>

        <div className="mb-12 space-y-2">
          <p className="text-lg text-gray-400">
            {t.description}
          </p>
          <p className="text-sm font-bold text-metro-orange tracking-widest uppercase">
            {t.devStatus}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <a
            href="https://www.deepsilver.com/games/metro2039"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded border border-metro-orange/50 bg-transparent px-8 py-3 text-sm font-bold text-metro-orange transition-all hover:bg-metro-orange hover:text-black active:scale-95"
          >
            <span className="absolute inset-0 translate-y-full bg-metro-orange transition-transform group-hover:translate-y-0" />
            <span className="relative z-10">{t.officialLink}</span>
          </a>

          <a
            href="https://t.me/+RPf6lTzBCZpkMTMy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-metro-orange"
          >
            <img 
              src="/telegram.svg" 
              alt="Telegram" 
              className="h-5 w-5 invert opacity-50 transition-opacity group-hover:opacity-100" 
            />
            <span>{t.telegramLink}</span>
          </a>
        </div>

        <LegalDisclaimer lang={lang} />
      </main>

      <footer className="mt-auto pt-16 text-[10px] font-bold uppercase tracking-widest text-gray-700">
        &copy; {new Date().getFullYear()} Metro 2039. {t.footer}
      </footer>
    </div>
  );
}
