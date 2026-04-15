'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, Button } from '@mui/material';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    // Заменяем первый сегмент пути (локаль) на новый
    const pathParts = pathname.split('/');
    pathParts[1] = newLocale;
    const newPath = pathParts.join('/');
    
    router.push(newPath);
  };

  return (
    <Box sx={{ position: 'absolute', top: 32, right: 32, display: 'flex', gap: 2, zIndex: 10 }}>
      <Button 
        onClick={() => handleLocaleChange('ru')}
        sx={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          minWidth: 'auto',
          p: 0,
          color: currentLocale === 'ru' ? '#ff4500' : 'rgba(255,255,255,0.4)',
          '&:hover': { color: '#ff4500', bgcolor: 'transparent' }
        }}
      >
        RU
      </Button>
      <Button 
        onClick={() => handleLocaleChange('en')}
        sx={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          minWidth: 'auto',
          p: 0,
          color: currentLocale === 'en' ? '#ff4500' : 'rgba(255,255,255,0.4)',
          '&:hover': { color: '#ff4500', bgcolor: 'transparent' }
        }}
      >
        EN
      </Button>
    </Box>
  );
}
