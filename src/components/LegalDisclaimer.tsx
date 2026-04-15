import React from 'react';

interface LegalDisclaimerProps {
  lang: 'ru' | 'en';
}

const translations = {
  ru: {
    title: "Юридическая информация",
    linkText: "Ознакомиться с правовой информацией на GitHub",
  },
  en: {
    title: "Legal Information",
    linkText: "Read legal information on GitHub",
  }
};

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div id="legal" className="mt-16 w-full max-w-2xl border-t border-metro-green/30 pt-8 text-center">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-metro-green">
        {t.title}
      </h2>
      <a 
        href="https://github.com/metro2039/.github/blob/main/profile/README.md"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 underline decoration-metro-green/30 underline-offset-4 hover:text-metro-orange hover:decoration-metro-orange transition-all"
      >
        {t.linkText}
      </a>
    </div>
  );
};

export default LegalDisclaimer;
