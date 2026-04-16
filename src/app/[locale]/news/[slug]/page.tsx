import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/ghost';
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const { slug } = await params;
  const { lang: locale = 'ru' } = await searchParams;
  
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.published_at).toLocaleDateString(
    locale === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <Box component="article" sx={{ minHeight: '100vh', py: 8, color: '#ffffff' }}>
      {/* Background elements */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, bgcolor: '#000000' }} />
      
      <Container maxWidth="md">
        <Breadcrumbs 
          sx={{ 
            mb: 4, 
            '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.3)' } 
          }}
        >
          <MuiLink 
            component={Link} 
            href={`/news${locale !== 'ru' ? `?lang=${locale}` : ''}`}
            sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', '&:hover': { color: '#ff4500' } }}
          >
            {locale === 'ru' ? 'Все новости' : 'All News'}
          </MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {post.title}
          </Typography>
        </Breadcrumbs>

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            color: '#ff4500', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            mb: 2
          }}
        >
          {publishedDate}
        </Typography>

        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 900, 
            lineHeight: 1.1,
            mb: 6,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          {post.title}
        </Typography>

        {post.feature_image && (
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 450 }, mb: 8, borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        )}

        {/* Post Content */}
        <Box 
          sx={{ 
            '& p': { mb: 3, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' },
            '& h2': { mt: 6, mb: 3, fontWeight: 800, color: '#ffffff' },
            '& h3': { mt: 4, mb: 2, fontWeight: 700, color: '#ffffff' },
            '& img': { maxWidth: '100%', height: 'auto', borderRadius: '4px', my: 4 },
            '& blockquote': { borderLeft: '4px solid #ff4500', pl: 3, py: 1, my: 4, bgcolor: 'rgba(255,69,0,0.05)', fontStyle: 'italic' },
            '& a': { color: '#ff4500', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            '& ul, & ol': { mb: 3, pl: 4, color: 'rgba(255,255,255,0.8)' },
            '& li': { mb: 1 }
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        
        <Box sx={{ mt: 12, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <MuiLink 
            component={Link} 
            href={`/news${locale !== 'ru' ? `?lang=${locale}` : ''}`}
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: '#ff4500', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': { opacity: 0.8 }
            }}
          >
            ← {locale === 'ru' ? 'Вернуться к списку' : 'Back to list'}
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
