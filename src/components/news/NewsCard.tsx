'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  styled 
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { GhostPost } from '@/types/ghost';

const StyledCard = styled(Card)(() => ({
  backgroundColor: 'rgba(20, 20, 20, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  color: '#ffffff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#ff4500', // Metro Orange
    transform: 'translateY(-4px)',
    boxShadow: '0 0 20px rgba(255, 69, 0, 0.2)',
  },
}));

const ActionButton = styled(Box)(() => ({
  marginTop: 'auto',
  paddingTop: '16px',
  fontSize: '10px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: '#ff4500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&::after': {
    content: '""',
    height: '1px',
    flex: 1,
    backgroundColor: 'rgba(255, 69, 0, 0.3)',
  }
}));

interface NewsCardProps {
  post: GhostPost;
  locale: string;
}

export default function NewsCard({ post, locale }: NewsCardProps) {
  const publishedDate = new Date(post.published_at).toLocaleDateString(
    locale === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  const readMoreText = locale === 'ru' ? 'Читать далее' : 'Read more';

  return (
    <Link href={`/${locale}/${post.slug}`} style={{ textDecoration: 'none' }}>
      <StyledCard elevation={0}>
        {post.feature_image && (
          <Box sx={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ 
                objectFit: 'cover',
                filter: 'grayscale(0.4) contrast(1.1)',
              }}
              priority={false}
            />
            {/* Overlay gradient */}
            <Box 
              sx={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' 
              }} 
            />
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.5)', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              mb: 1
            }}
          >
            {publishedDate}
          </Typography>

          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              lineHeight: 1.2, 
              mb: 2,
              fontFamily: 'inherit',
              color: '#ffffff'
            }}
          >
            {post.title}
          </Typography>

          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)', 
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </Typography>

          <ActionButton>
            {readMoreText}
          </ActionButton>
        </CardContent>
      </StyledCard>
    </Link>
  );
}
