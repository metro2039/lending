'use client';

import React from 'react';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';

interface LegalDisclaimerProps {
  lang: 'ru' | 'en';
}

const translations = {
  ru: "Правовая информация",
  en: "Legal Info"
};

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ lang }) => {
  const text = translations[lang];

  return (
    <Link href={`/${lang}/legal`} passHref style={{ textDecoration: 'none' }}>
      <MuiLink 
        component="span"
        sx={{ 
          fontSize: '0.625rem', 
          color: 'rgba(255, 255, 255, 0.2)', 
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': { 
            color: '#ff4500',
          } 
        }}
      >
        {text}
      </MuiLink>
    </Link>
  );
};

export default LegalDisclaimer;
