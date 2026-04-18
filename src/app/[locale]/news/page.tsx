import React, { Suspense } from 'react';
import NewsGrid from '@/components/news/NewsGrid';
import { Box, Container, Typography, Skeleton, Grid } from '@mui/material';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Скелетон для загрузки новостей
function NewsSkeleton() {
  return (
    <Box sx={{ mt: 8 }}>
      <Skeleton variant="text" width={200} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />
      <Grid container spacing={4}>
        {[1, 2, 3].map((i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Skeleton variant="rectangular" height={200} sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />
            <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default async function NewsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: 12, px: 3, position: 'relative' }}>
      <LanguageSwitcher currentLocale={locale} />
      {/* Background atmosphere elements mirroring Home page */}
      <Box sx={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        overflow: 'hidden',
        pointerEvents: 'none' 
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: '-10%', 
          left: '-10%', 
          width: '40%', 
          height: '40%', 
          bgcolor: 'rgba(0, 255, 0, 0.05)', 
          filter: 'blur(120px)', 
          borderRadius: '50%' 
        }} />
      </Box>

      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            color: '#ffffff', 
            fontWeight: 900, 
            textAlign: 'center',
            letterSpacing: '-0.02em',
            mb: 2
          }}
        >
          METRO <span style={{ color: '#ff4500' }}>2039</span>
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.4)', 
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            mb: 8
          }}
        >
          {locale === 'ru' ? 'Архив оперативных сводок' : 'Operations Archives'}
        </Typography>

        <Suspense fallback={<NewsSkeleton />}>
          <NewsGrid locale={locale} />
        </Suspense>
      </Container>
    </Box>
  );
}
