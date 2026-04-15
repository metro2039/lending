import React, { Suspense } from 'react';
import { Box, Typography, Container, Link as MuiLink, Divider } from '@mui/material';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import NewsGrid from '@/components/news/NewsGrid';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

const translations = {
  ru: {
    heading: "Metro 2039",
    subheading: "— Фан-сообщество",
    status: "Связь установлена",
    description: "Добро пожаловать в столичную подземку. Следите за последними сводками из глубин метрополитена.",
    officialLink: "Официальный ресурс игры",
    telegramLink: "Присоединиться к Telegram",
    footer: "Из тени в свет.",
  },
  en: {
    heading: "Metro 2039",
    subheading: "— Fan Community",
    status: "Link established",
    description: "Welcome to the capital's metro system. Stay tuned for the latest reports from the depths of the underground.",
    officialLink: "Official Game Resource",
    telegramLink: "Join our Telegram",
    footer: "From shadow into light.",
  }
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.ru;

  return (
    <Box 
      component="main" 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'black', 
        color: 'white', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 8, md: 15 },
        pb: 6,
        px: 3,
        overflowX: 'hidden'
      }}
    >
      <LanguageSwitcher currentLocale={locale} />

      {/* Background Atmosphere */}
      <Box sx={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        pointerEvents: 'none',
        overflow: 'hidden' 
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: '-10%', 
          left: '-10%', 
          width: '50%', 
          height: '50%', 
          bgcolor: 'rgba(0, 255, 0, 0.03)', 
          filter: 'blur(120px)', 
          borderRadius: '50%' 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '-10%', 
          right: '-10%', 
          width: '40%', 
          height: '40%', 
          bgcolor: 'rgba(255, 69, 0, 0.03)', 
          filter: 'blur(100px)', 
          borderRadius: '50%' 
        }} />
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 10 }}>
        <Box sx={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 1.5, 
          borderRadius: '2px', 
          border: '1px solid rgba(255, 69, 0, 0.2)', 
          bgcolor: 'rgba(20, 20, 20, 0.5)', 
          px: 2, 
          py: 0.5, 
          mb: 4,
          boxShadow: '0 0 15px rgba(255, 69, 0, 0.05)'
        }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ff4500', animation: 'pulse 2s infinite' }} />
          <Typography variant="caption" sx={{ color: '#ff4500', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.625rem' }}>
            {t.status} <span style={{ opacity: 0.5, marginLeft: '8px' }}>// ID: M39RU</span>
          </Typography>
        </Box>

        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '6rem' }, fontWeight: 900, mb: { xs: 4, md: 6 }, lineHeight: 0.9 }}>
          {t.heading}
          <Typography component="span" sx={{ display: 'block', mt: 2, fontSize: { xs: '1.25rem', md: '1.75rem' }, color: 'rgba(255, 255, 255, 0.5)', fontWeight: 300, letterSpacing: '0.1em' }}>
            {t.subheading}
          </Typography>
        </Typography>

        {/* Watch Video Visual - Adapted for 700x700 Square Format */}
        <Box sx={{ 
          width: '100%', 
          maxWidth: { xs: '100%', md: 700 }, // Оптимальный размер для квадратного видео под заголовок
          aspectRatio: '1 / 1', // Сохраняем квадратные пропорции
          mx: 'auto', 
          mb: { xs: 0, md: 2 },
          mt: { xs: -4, md: -6 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 60px rgba(255, 69, 0, 0.2)) contrast(1.05)',
          // Радиальная маска теперь идеально подходит для квадратного видео
          maskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
          '& video': {
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Гарантируем, что всё устройство влезет
            display: 'block'
          }
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/metro2039.mov" type="video/mp4" />
          </video>
        </Box>

        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', mb: 8, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
          {t.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MuiLink
            href="https://t.me/+RPf6lTzBCZpkMTMy"
            target="_blank"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 4, md: 8 },
              py: 2.5,
              border: '1px solid #ff4500',
              bgcolor: 'rgba(255, 69, 0, 0.05)',
              color: '#ff4500',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 20px rgba(255, 69, 0, 0.1)',
              '&:hover': {
                bgcolor: '#ff4500',
                color: 'black',
                boxShadow: '0 0 30px rgba(255, 69, 0, 0.4)',
                transform: 'scale(1.02)'
              },
              '& .tg-icon-container': {
                width: 0,
                opacity: 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                marginRight: 0
              },
              '&:hover .tg-icon-container': {
                width: 24,
                opacity: 1,
                marginRight: 2 // 16px
              }
            }}
          >
            <Box className="tg-icon-container">
              <Image 
                src="/telegram.svg" 
                alt="TG" 
                width={24} 
                height={24} 
                style={{ filter: 'invert(1) brightness(0)', minWidth: 24 }} 
              />
            </Box>
            {t.telegramLink}
          </MuiLink>
        </Box>
      </Container>

      {/* News Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Suspense fallback={<Typography sx={{ color: 'rgba(255,255,255,0.1)', textAlign: 'center', py: 10, letterSpacing: '0.5em' }}>[ SCANNING FREQUENCIES... ]</Typography>}>
          <NewsGrid locale={locale} />
        </Suspense>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ width: '100%', mt: 'auto', py: 4, bgcolor: 'rgba(5, 5, 5, 0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: { xs: 2, md: 3 },
            opacity: 0.3,
            transition: 'opacity 0.3s',
            '&:hover': { opacity: 0.8 }
          }}>
            <Typography sx={{ fontSize: '0.625rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}>
              &copy; {new Date().getFullYear()} Metro 2039. {t.footer}
            </Typography>

            <Box sx={{ width: 1, height: 10, bgcolor: 'rgba(255,255,255,0.1)', display: { xs: 'none', md: 'block' } }} />

            <MuiLink
              href="https://www.deepsilver.com/games/metro2039"
              target="_blank"
              sx={{
                color: '#fff',
                fontSize: '0.625rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                '&:hover': { color: '#ff4500' }
              }}
            >
              {t.officialLink}
            </MuiLink>

            <Box sx={{ width: 1, height: 10, bgcolor: 'rgba(255,255,255,0.1)', display: { xs: 'none', md: 'block' } }} />

            <LegalDisclaimer lang={locale as 'ru' | 'en'} />
          </Box>
        </Container>
      </Box>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 10px #ff4500; }
          100% { opacity: 0.4; transform: scale(0.8); }
        }
        .tg-icon {
          transition: filter 0.4s;
        }
        a:hover .tg-icon {
          filter: invert(0) !important;
        }
      `}} />
    </Box>
  );
}
