import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getPosts } from '@/lib/ghost';
import NewsCard from './NewsCard';

interface NewsGridProps {
  locale: string;
}

export default async function NewsGrid({ locale }: NewsGridProps) {
  const posts = await getPosts(locale);

  if (posts.length === 0) {
    const noNewsText = locale === 'ru' 
      ? 'Новостей пока нет. Возвращайтесь позже, сталкер.' 
      : 'No news yet. Come back later, stalker.';

    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255,255,255,0.4)', 
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}
        >
          {noNewsText}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 8, mb: 12 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          color: '#ffffff', 
          fontWeight: 900, 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          mb: 6,
          textAlign: 'left',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 40,
            height: 2,
            backgroundColor: '#ff4500'
          }
        }}
      >
        {locale === 'ru' ? 'Свежие сводки' : 'Latest Reports'}
      </Typography>

      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <NewsCard post={post} locale={locale} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
