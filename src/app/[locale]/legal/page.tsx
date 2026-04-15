import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface LegalPageProps {
  params: Promise<{ locale: string }>;
}

const content = {
  ru: {
    title: "Юридический дисклеймер",
    sections: [
      {
        text: "Содержимое репозиториев данной организации и сайта metro2039.ru создано исключительно в ознакомительных и развлекательных целях. Данный проект не является официальным продуктом и не аффилирован с компаниями-разработчиками или издателями."
      },
      {
        label: "Торговые марки",
        text: "Все названия, логотипы и бренды (Metro 2033, Metro Last Light, Metro Exodus, Metro 2039) являются собственностью их соответствующих владельцев (4A Games / Deep Silver)."
      },
      {
        label: "Авторские права",
        text: "Интеллектуальная собственность на литературную вселенную принадлежит Дмитрию Глуховскому***."
      },
      {
        label: "ПО",
        text: "Код, размещенный в данной организации, распространяется «как есть» (as is) под лицензией MIT, если не указано иное."
      }
    ],
    footerNote: "*** — Признан иностранным агентом на территории Российской Федерации",
    backLink: "Вернуться на главную"
  },
  en: {
    title: "Legal Disclaimer",
    sections: [
      {
        text: "The content of this organization's repositories and the metro2039.ru website is created solely for informational and entertainment purposes. This project is not an official product and is not affiliated with the developers or publishers."
      },
      {
        label: "Trademarks",
        text: "All names, logos, and brands (Metro 2033, Metro Last Light, Metro Exodus, Metro 2039) are the property of their respective owners (4A Games / Deep Silver)."
      },
      {
        label: "Copyrights",
        text: "Intellectual property rights to the literary universe belong to Dmitry Glukhovsky***."
      },
      {
        label: "Software",
        text: "Code hosted within this organization is distributed \"as is\" under the MIT License, unless otherwise specified."
      }
    ],
    footerNote: "*** — Recognized as a foreign agent in the Russian Federation.",
    backLink: "Back to Home"
  }
};

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale } = await params;
  const t = content[locale as keyof typeof content] || content.ru;

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: 8, color: '#ffffff', bgcolor: 'black' }}>
      <LanguageSwitcher currentLocale={locale} />
      
      <Container maxWidth="md">
        <Breadcrumbs 
          sx={{ 
            mb: 6, 
            '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.2)' } 
          }}
        >
          <Link href={`/${locale}`} passHref style={{ textDecoration: 'none' }}>
            <MuiLink 
              component="span"
              sx={{ 
                color: 'rgba(255,255,255,0.4)', 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                cursor: 'pointer',
                '&:hover': { color: '#ff4500' } 
              }}
            >
              {locale === 'ru' ? 'Главная' : 'Home'}
            </MuiLink>
          </Link>
          <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {t.title}
          </Typography>
        </Breadcrumbs>

        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            fontWeight: 900, 
            mb: 8, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            borderLeft: '4px solid #ff4500',
            pl: 3
          }}
        >
          {t.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {t.sections.map((section, index) => (
            <Box key={index}>
              {section.label && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    color: '#ff4500', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.2em',
                    mb: 1
                  }}
                >
                  {section.label}
                </Typography>
              )}
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  lineHeight: 1.8,
                  fontSize: '1rem'
                }}
              >
                {section.text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            fontStyle: 'italic', 
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6
          }}
        >
          {t.footerNote}
        </Typography>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Link href={`/${locale}`} passHref style={{ textDecoration: 'none' }}>
            <MuiLink 
              component="span"
              sx={{ 
                color: 'rgba(255,255,255,0.4)', 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'color 0.3s',
                '&:hover': { color: '#ff4500' }
              }}
            >
              ← {t.backLink}
            </MuiLink>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
