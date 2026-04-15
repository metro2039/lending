'use client';

import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography, styled } from '@mui/material';
import { 
  Telegram as TelegramIcon, 
  ContentCopy as CopyIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Кастомная иконка VK
const VkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.073 2H8.937C3.333 2 2 3.333 2 8.937v6.126C2 20.667 3.333 22 8.937 22h6.126c5.604 0 6.937-1.333 6.937-6.937V8.937C22 3.333 20.667 2 15.073 2zM17.41 16.32c-.11.23-.39.42-.65.42h-1.57c-.45 0-.81-.13-1.07-.4-.26-.26-.49-.64-.69-1.12-.34-.84-.65-1.11-.94-1.11-.08 0-.15.02-.21.05-.28.14-.42.44-.42.9v1.28c0 .26-.08.4-.4.4h-1.05c-.6 0-1.14-.14-1.61-.41-.47-.27-.89-.66-1.25-1.17-.71-1.03-1.28-2.31-1.69-3.83-.05-.21-.02-.38.25-.38h1.61c.21 0 .34.07.4.26.28.94.66 1.76 1.13 2.45.19.28.37.42.54.42.11 0 .19-.05.24-.16.14-.32.21-.86.21-1.63v-1.1c-.02-.55-.23-.74-.82-.79-.17-.02-.12-.24.08-.24h2.51c.26 0 .34.1.34.4v2.54c0 .16.05.23.13.23.08 0 .16-.06.25-.19.46-.71.82-1.53 1.08-2.45.06-.19.16-.26.35-.26h1.63c.31 0 .37.13.29.35-.31.86-.79 1.63-1.42 2.31-.19.22-.22.31 0 .54.16.16.39.41.69.75.46.52.82 1.02 1.08 1.49z"/>
  </svg>
);

const ShareButton = styled(IconButton)<{ component?: React.ElementType; href?: string; target?: string }>(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ff4500',
    borderColor: '#ff4500',
    backgroundColor: 'rgba(255, 69, 0, 0.05)',
    transform: 'translateY(-2px)'
  }
}));

interface ShareButtonsProps {
  title: string;
  locale: string;
}

export default function ShareButtons({ title, locale }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    vk: `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
  };

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = locale === 'ru' ? 'Поделиться сводкой:' : 'Share report:';
  const copyText = locale === 'ru' ? (copied ? 'Скопировано!' : 'Копировать ссылку') : (copied ? 'Copied!' : 'Copy Link');

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', md: 'flex-start' } }}>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>
        {shareText}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Tooltip title="Telegram">
          <ShareButton component="a" href={shareLinks.telegram} target="_blank">
            <TelegramIcon fontSize="small" />
          </ShareButton>
        </Tooltip>

        <Tooltip title="VK">
          <ShareButton component="a" href={shareLinks.vk} target="_blank">
            <VkIcon />
          </ShareButton>
        </Tooltip>

        <Tooltip title={copyText}>
          <ShareButton onClick={handleCopy}>
            <CopyIcon fontSize="small" />
          </ShareButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
